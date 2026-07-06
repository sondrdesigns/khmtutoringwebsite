/* One-off local Google Drive export -> Vercel Blob + Sondr Supabase migration. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const ROOT_ARG = process.argv.find((arg) => arg.startsWith('--root='));
const LIMIT_ARG = process.argv.find((arg) => arg.startsWith('--limit='));
const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(ROOT_ARG ? ROOT_ARG.slice('--root='.length) : 'KHM Resources-20260705T233110Z-3-001');
const LIMIT = LIMIT_ARG ? Math.max(1, Number(LIMIT_ARG.slice('--limit='.length)) || 1) : Infinity;
const SOURCE_PROVIDER = 'google_drive';
const SOURCE_PROJECT_REF = path.basename(ROOT);
const SOURCE_TABLE = 'local_drive_export';

loadEnv('.env.local');

const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
if (!DRY_RUN) required.push('BLOB_READ_WRITE_TOKEN');
for (const key of required) {
  if (!process.env[key]) throw new Error(`${key} is required`);
}

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  if (!fs.existsSync(ROOT)) throw new Error(`Migration root not found: ${ROOT}`);
  const files = walk(ROOT).filter((file) => file.toLowerCase().endsWith('.pdf')).slice(0, LIMIT);
  console.log(`ROOT=${ROOT}`);
  console.log(`PDF_COUNT=${files.length}`);
  console.log(`DRY_RUN=${DRY_RUN}`);

  const { put } = DRY_RUN ? { put: null } : await import('@vercel/blob');
  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const relative = toPosix(path.relative(ROOT, file));
    const stat = fs.statSync(file);
    const contentChecksum = fileHash(file);
    const existing = await existingResource(relative, contentChecksum);
    if (existing) {
      skipped += 1;
      logProgress(i + 1, files.length, 'skip', relative);
      continue;
    }

    const classification = classify(relative);
    if (DRY_RUN) {
      uploaded += 1;
      logProgress(i + 1, files.length, 'ready', `${relative} -> ${classification.subject}, ${classification.grade}, ${classification.type}`);
      continue;
    }

    try {
      const blobPath = `staff-library/google-drive/${hash(relative).slice(0, 12)}/${sanitizeFilename(path.basename(file))}`;
      const blob = await put(blobPath, fs.createReadStream(file), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/pdf',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      const now = new Date().toISOString();
      const insert = {
        type: classification.type,
        title: classification.title,
        subject: classification.subject,
        grade: classification.grade,
        topic: classification.topic,
        pages: 1,
        difficulty: classification.difficulty,
        added: now.slice(0, 10),
        author: 'Kody Kim',
        file_url: blob.url,
        storage_provider: 'vercel_blob',
        storage_key: blob.pathname,
        original_filename: path.basename(file),
        mime_type: 'application/pdf',
        file_size: stat.size,
        classification_confidence: classification.confidence,
        source_provider: SOURCE_PROVIDER,
        source_project_ref: SOURCE_PROJECT_REF,
        source_table: SOURCE_TABLE,
        source_id: relative,
        source_bucket: 'google_drive_zip',
        source_path: relative,
        source_checksum: contentChecksum,
        migrated_at: now,
      };

      const { error } = await db.from('resources').insert(insert);
      if (error) throw error;
      uploaded += 1;
      logProgress(i + 1, files.length, 'uploaded', relative);
    } catch (err) {
      errors += 1;
      console.error(`ERROR ${relative}: ${err.message}`);
    }
  }

  console.log(`SUMMARY uploaded_or_ready=${uploaded} skipped=${skipped} errors=${errors}`);
  if (errors > 0) process.exitCode = 1;
}

async function existingResource(relative, contentChecksum) {
  const { data: checksumMatch, error: checksumError } = await db
    .from('resources')
    .select('id')
    .eq('source_checksum', contentChecksum)
    .maybeSingle();
  if (checksumError) throw checksumError;
  if (checksumMatch?.id) return checksumMatch.id;

  const { data, error } = await db
    .from('resources')
    .select('id')
    .eq('source_provider', SOURCE_PROVIDER)
    .eq('source_project_ref', SOURCE_PROJECT_REF)
    .eq('source_table', SOURCE_TABLE)
    .eq('source_id', relative)
    .maybeSingle();
  if (error) throw error;
  return data?.id || null;
}

function classify(relative) {
  const lower = relative.toLowerCase();
  const filename = path.basename(relative).replace(/\.pdf$/i, '');
  const folders = relative.split('/').slice(0, -1);
  const folderText = folders.join(' ');
  const text = `${lower} ${folderText.toLowerCase()}`;

  const type = /(test|exam|quiz|assessment|diagnostic|practice test|midterm|final)/i.test(text) ? 'test' : 'worksheet';
  const grade = findGrade(text);
  const subject = findSubject(text);
  const difficulty = grade && ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].includes(grade)
    ? 'Beginner'
    : grade && ['11th', '12th', 'College'].includes(grade)
      ? 'Advanced'
      : 'Intermediate';

  const topicFolder = folders.filter((folder) => !/^khm resources$/i.test(folder)).slice(-1)[0];
  const topic = cleanTitle(topicFolder || filename);
  const title = cleanTitle(filename);
  const confidence = subject && grade ? 'high' : subject || grade ? 'medium' : 'low';

  return {
    type,
    title,
    subject: subject || 'Pre-Algebra',
    grade: grade || '9th',
    topic,
    difficulty,
    confidence,
  };
}

function findGrade(text) {
  const patterns = [
    [/\bgrade\s*1\b|\bg1\b|\b1st\b/, '1st'],
    [/\bgrade\s*2\b|\bg2\b|\b2nd\b/, '2nd'],
    [/\bgrade\s*3\b|\bg3\b|\b3rd\b/, '3rd'],
    [/\bgrade\s*4\b|\bg4\b|\b4th\b/, '4th'],
    [/\bgrade\s*5\b|\bg5\b|\b5th\b/, '5th'],
    [/\bgrade\s*6\b|\bg6\b|\b6th\b/, '6th'],
    [/\bgrade\s*7\b|\bg7\b|\b7th\b/, '7th'],
    [/\bgrade\s*8\b|\bg8\b|\b8th\b/, '8th'],
    [/\bgrade\s*9\b|\bg9\b|\b9th\b/, '9th'],
    [/\bgrade\s*10\b|\bg10\b|\b10th\b/, '10th'],
    [/\bgrade\s*11\b|\bg11\b|\b11th\b/, '11th'],
    [/\bgrade\s*12\b|\bg12\b|\b12th\b/, '12th'],
    [/\bcollege\b|\bap\b/, 'College'],
  ];
  return patterns.find(([regex]) => regex.test(text))?.[1];
}

function findSubject(text) {
  const checks = [
    ['SAT Reading & Writing', /sat.*(reading|writing|verbal|grammar|language)|reading.*sat|writing.*sat/],
    ['SAT Math', /sat|college panda|princeton review/],
    ['SSAT', /ssat/],
    ['Pre-Calculus', /pre[- ]?calc|precalculus|apch|trig|trigonometry|unit circle/],
    ['Algebra 2', /algebra\s*2|alg\s*2|alg2|quadratic|logarithm|polynomial/],
    ['Algebra 1', /algebra\s*1|alg\s*1|algebra bcp|linear|slope|equation/],
    ['Geometry', /geometry|geom|triangle|circle|proof/],
    ['Physics', /physics|mechanics|kinematics|force|energy/],
    ['Chemistry', /chemistry|chem|stoich/],
    ['Biology', /biology|bio|genetics|cell/],
    ['English', /english|reading|writing|essay|grammar|comprehension/],
    ['Pre-Algebra', /pre[- ]?algebra|grade\s*[1-8]|arithmetic|fractions|decimals|integers|math/],
  ];
  return checks.find(([, regex]) => regex.test(text))?.[0];
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

function cleanTitle(value) {
  return value
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Untitled PDF';
}

function sanitizeFilename(value) {
  const clean = value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return clean.toLowerCase().endsWith('.pdf') ? clean : `${clean || 'resource'}.pdf`;
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function fileHash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function logProgress(done, total, action, message) {
  if (done <= 10 || done % 25 === 0 || done === total || action === 'skip') {
    console.log(`[${done}/${total}] ${action} ${message}`);
  }
}

main().catch((err) => {
  console.error(`FATAL ${err.message}`);
  process.exit(1);
});
