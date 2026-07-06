export interface SourceColumnMap {
  id: string;
  title: string;
  filePath: string;
  fileUrl: string;
  filename: string;
  bucket: string;
  subject: string;
  grade: string;
  type: string;
  topic: string;
  pages: string;
  difficulty: string;
  checksum: string;
}

export interface SourceMigrationConfig {
  provider: 'client_supabase';
  mode: 'storage' | 'table';
  projectRef: string;
  table: string;
  defaultBucket?: string;
  columns: SourceColumnMap;
}

export function getSourceMigrationConfig(): SourceMigrationConfig {
  const sourceUrl = process.env.CLIENT_SUPABASE_URL;
  if (!sourceUrl) throw new Error('CLIENT_SUPABASE_URL is required for source migration.');

  const explicitMode = process.env.CLIENT_SUPABASE_SOURCE_MODE;
  const mode: SourceMigrationConfig['mode'] = explicitMode === 'table' || process.env.CLIENT_SUPABASE_RESOURCE_TABLE ? 'table' : 'storage';

  return {
    provider: 'client_supabase',
    mode,
    projectRef: projectRefFromUrl(sourceUrl),
    table: mode === 'table' ? process.env.CLIENT_SUPABASE_RESOURCE_TABLE! : 'storage.objects',
    defaultBucket: process.env.CLIENT_SUPABASE_STORAGE_BUCKET,
    columns: {
      id: process.env.CLIENT_SUPABASE_ID_COLUMN || 'id',
      title: process.env.CLIENT_SUPABASE_TITLE_COLUMN || 'title',
      filePath: process.env.CLIENT_SUPABASE_FILE_PATH_COLUMN || 'file_path',
      fileUrl: process.env.CLIENT_SUPABASE_FILE_URL_COLUMN || 'file_url',
      filename: process.env.CLIENT_SUPABASE_FILENAME_COLUMN || 'filename',
      bucket: process.env.CLIENT_SUPABASE_BUCKET_COLUMN || 'bucket',
      subject: process.env.CLIENT_SUPABASE_SUBJECT_COLUMN || 'subject',
      grade: process.env.CLIENT_SUPABASE_GRADE_COLUMN || 'grade',
      type: process.env.CLIENT_SUPABASE_TYPE_COLUMN || 'type',
      topic: process.env.CLIENT_SUPABASE_TOPIC_COLUMN || 'topic',
      pages: process.env.CLIENT_SUPABASE_PAGES_COLUMN || 'pages',
      difficulty: process.env.CLIENT_SUPABASE_DIFFICULTY_COLUMN || 'difficulty',
      checksum: process.env.CLIENT_SUPABASE_CHECKSUM_COLUMN || 'checksum',
    },
  };
}

function projectRefFromUrl(raw: string): string {
  try {
    const host = new URL(raw).hostname;
    return host.split('.')[0] || 'unknown';
  } catch {
    return 'unknown';
  }
}
