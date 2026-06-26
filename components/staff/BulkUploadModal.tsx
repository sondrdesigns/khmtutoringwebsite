'use client';

import { useState } from 'react';
import {
  Check, CircleCheckBig, FileText, Folder, FolderUp, HelpCircle, Loader, Sparkles,
  TriangleAlert, UploadCloud,
} from 'lucide-react';
import { GRADES, SUBJECTS } from '@/lib/staff/resources';
import { classifyFilename } from '@/lib/staff/classify';
import type { ClassifiedFile, ResourceDraft } from '@/lib/staff/types';
import { Modal, ModalCloseButton } from './Modal';
import { StaffSelect } from './StaffSelect';
import { CONFIDENCE_META } from './badges';
import { cn } from '@/lib/utils';

// Sample batch used by the demo (real picker reads dropped File names).
const SAMPLE_NAMES = [
  'Algebra1_Two-Step-Equations_Grade8.pdf',
  'Algebra2 Logarithms Practice (11th).pdf',
  'Geometry_Triangle_Congruence_Proofs.pdf',
  'SAT_Math_PracticeTest_NoCalc.pdf',
  'PreCalc - Unit Circle & Radians.pdf',
  'SSAT Verbal Analogies Worksheet.pdf',
  'Biology_Cell_Review_G10.pdf',
  'reading_inference_practice.pdf',
  'chem stoichiometry set 3.pdf',
  'Quiz_2026_final_v2.pdf',
  'scan_0427.pdf',
  'Pre-Algebra Integers Test 6th grade.pdf',
];

type Stage = 'drop' | 'scanning' | 'review';

export function BulkUploadModal({
  onClose,
  onImport,
}: {
  onClose: () => void;
  onImport: (drafts: ResourceDraft[]) => void;
}) {
  const [stage, setStage] = useState<Stage>('drop');
  const [rows, setRows] = useState<ClassifiedFile[]>([]);
  const [progress, setProgress] = useState(0);

  function startScan(names: string[]) {
    setStage('scanning');
    setProgress(0);
    const classified = names.map((name, i) => classifyFilename(name, `u_${i}_${Date.now()}`));
    setRows(classified);
    requestAnimationFrame(() => requestAnimationFrame(() => setProgress(100)));
    setTimeout(() => setStage('review'), 1400);
  }

  const update = (id: string, patch: Partial<ClassifiedFile>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const included = rows.filter((r) => r.include);
  const needsReview = included.filter((r) => r.confidence !== 'high').length;

  function doImport() {
    const drafts: ResourceDraft[] = included.map((r) => ({
      title: r.name.replace(/\.pdf$/i, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim(),
      type: r.type,
      subject: r.subject,
      grade: r.grade,
      topic: 'Imported',
      pages: r.pages,
      difficulty: r.difficulty,
    }));
    onImport(drafts);
  }

  return (
    <Modal onClose={onClose} className={cn('flex flex-col transition-[max-width]', stage === 'review' ? 'max-w-[880px]' : 'max-w-[560px]')}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-primary text-primary-foreground">
            <FolderUp className="size-[18px]" />
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold">Bulk Upload &amp; Auto-Sort</h3>
            <p className="text-[12.5px] text-muted-foreground">Drop a batch — files are sorted into the library automatically.</p>
          </div>
        </div>
        <ModalCloseButton onClose={onClose} />
      </div>

      {stage === 'drop' && <DropStage onStart={() => startScan(SAMPLE_NAMES)} />}
      {stage === 'scanning' && <ScanStage progress={progress} />}
      {stage === 'review' && <ReviewStage rows={rows} update={update} />}

      {stage === 'review' && (
        <div className="flex items-center gap-4 border-t border-border px-6 py-4">
          <div className="text-[13px] text-muted-foreground">
            <strong className="text-foreground">{included.length}</strong> of {rows.length} selected
            {needsReview > 0 && (
              <span className="ml-2.5 text-[hsl(38_70%_38%)]">
                <TriangleAlert className="mr-1 inline size-3.5 align-[-2px]" />
                {needsReview} need review
              </span>
            )}
          </div>
          <div className="flex-1" />
          <button onClick={onClose} className="inline-flex h-9 items-center rounded-md px-4 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10">
            Cancel
          </button>
          <button
            onClick={doImport}
            disabled={!included.length}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            <Check className="size-4" />Import {included.length} Files
          </button>
        </div>
      )}
    </Modal>
  );
}

function DropStage({ onStart }: { onStart: () => void }) {
  const [over, setOver] = useState(false);
  return (
    <div className="p-6">
      <div
        onClick={onStart}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); onStart(); }}
        className={cn(
          'cursor-pointer rounded-xl border-2 border-dashed px-6 py-11 text-center transition-colors',
          over ? 'border-primary bg-primary/[0.06]' : 'border-border bg-secondary/30',
        )}
      >
        <span className="mb-3.5 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="size-7" />
        </span>
        <div className="mb-1 text-lg font-bold">Drop a folder of PDFs here</div>
        <div className="mb-[18px] text-sm text-muted-foreground">or click to browse — multiple files at once</div>
        <span className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground">
          <Folder className="size-4" />Select Files
        </span>
      </div>
      <div className="mt-[18px] flex items-start gap-3 rounded-md border border-border bg-[hsl(210_40%_92%/0.5)] px-3.5 py-3">
        <Sparkles className="mt-px size-[18px] shrink-0 text-primary" />
        <div className="text-[12.5px] leading-relaxed text-[hsl(215_45%_20%/0.85)]">
          Files are sorted by reading their <strong>names and contents</strong> — matching subject, grade, and type
          automatically. Anything unclear is flagged for a quick review before it&rsquo;s saved.{' '}
          <span className="text-muted-foreground">(Demo uses a sample batch.)</span>
        </div>
      </div>
    </div>
  );
}

function ScanStage({ progress }: { progress: number }) {
  return (
    <div className="px-8 py-14 text-center">
      <span className="mb-[18px] inline-flex size-14 animate-spin items-center justify-center rounded-full bg-primary/10 text-primary">
        <Loader className="size-[26px]" />
      </span>
      <div className="mb-1.5 text-lg font-bold">Sorting files…</div>
      <div className="mb-5 text-sm text-muted-foreground">Reading names &amp; matching subject, grade, and type</div>
      <div className="mx-auto h-2 max-w-[320px] overflow-hidden rounded-full bg-secondary/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-[1200ms] ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ReviewStage({
  rows, update,
}: {
  rows: ClassifiedFile[];
  update: (id: string, patch: Partial<ClassifiedFile>) => void;
}) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 pb-1 pt-3.5 text-xs text-muted-foreground">
        Review the auto-sorted results. Adjust any field inline; uncheck to skip.
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-[0.05em] text-muted-foreground">
            <th className="py-2.5 pl-6 pr-3" />
            <th className="px-3 py-2.5">File</th>
            <th className="px-3 py-2.5">Type</th>
            <th className="px-3 py-2.5">Subject</th>
            <th className="px-3 py-2.5">Grade</th>
            <th className="py-2.5 pl-3 pr-6">Match</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const conf = CONFIDENCE_META[r.confidence];
            const ConfIcon = conf.icon === 'circle-check-big' ? CircleCheckBig : conf.icon === 'help-circle' ? HelpCircle : TriangleAlert;
            return (
              <tr key={r.id} className={cn('border-t border-border/50', !r.include && 'opacity-50')}>
                <td className="py-2.5 pl-6 pr-3">
                  <button
                    onClick={() => update(r.id, { include: !r.include })}
                    aria-label="Toggle"
                    className={cn(
                      'flex size-5 items-center justify-center rounded-[5px] border-[1.5px]',
                      r.include ? 'border-primary bg-primary' : 'border-border bg-card',
                    )}
                  >
                    {r.include && <Check className="size-3 text-white" />}
                  </button>
                </td>
                <td className="max-w-[180px] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="size-[15px] shrink-0 text-[hsl(0_70%_45%)]" />
                    <span className="truncate text-[12.5px]" title={r.name}>{r.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <StaffSelect
                    value={r.type}
                    onChange={(v) => update(r.id, { type: v as ClassifiedFile['type'] })}
                    options={[{ value: 'worksheet', label: 'Worksheet' }, { value: 'test', label: 'Test' }]}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <StaffSelect value={r.subject} onChange={(v) => update(r.id, { subject: v, subjectKnown: true })} options={SUBJECTS} flag={!r.subjectKnown} />
                </td>
                <td className="px-3 py-2.5">
                  <StaffSelect value={r.grade} onChange={(v) => update(r.id, { grade: v, gradeKnown: true })} options={GRADES} flag={!r.gradeKnown} />
                </td>
                <td className="py-2.5 pl-3 pr-6">
                  <span className={cn('inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2.5 py-[3px] text-[11px] font-semibold', conf.chip)} title={r.reasons.join(' · ')}>
                    <ConfIcon className="size-3" />{conf.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
