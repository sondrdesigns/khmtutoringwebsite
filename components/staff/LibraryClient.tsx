'use client';

import { useMemo, useState } from 'react';
import {
  ChevronDown, FileText, ClipboardCheck, FolderSearch, Layers, Search, SlidersHorizontal, X,
} from 'lucide-react';
import type { Resource, ResourceType } from '@/lib/staff/types';
import type { StaffSession } from '@/lib/staff/auth';
import { GRADES, SUBJECTS } from '@/lib/staff/resources';
import { PortalChrome } from './PortalChrome';
import { FileCard } from './FileCard';
import { FilePreviewModal } from './FilePreviewModal';
import { ExportModal } from './ExportModal';
import { Toast } from './Toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type SortKey = 'newest' | 'az' | 'pages';

export function LibraryClient({
  initialResources,
  session,
}: {
  initialResources: Resource[];
  session: StaffSession;
}) {
  const [type, setType] = useState<ResourceType>('worksheet');
  const [query, setQuery] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('newest');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [preview, setPreview] = useState<Resource | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const toggleSelect = (id: string) =>
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const typeFiltered = initialResources.filter((f) => f.type === type);
  const results = useMemo(() => {
    return typeFiltered
      .filter((f) => {
        if (subjects.length && !subjects.includes(f.subject)) return false;
        if (grades.length && !grades.includes(f.grade)) return false;
        if (difficulties.length && !difficulties.includes(f.difficulty)) return false;
        if (query) {
          const q = query.toLowerCase();
          if (!`${f.title} ${f.topic} ${f.subject} ${f.originalFilename ?? ''}`.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sort === 'newest') return b.added.localeCompare(a.added);
        if (sort === 'az') return a.title.localeCompare(b.title);
        return b.pages - a.pages;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, query, subjects, grades, difficulties, sort, initialResources]);

  const selectedFiles = selectedIds
    .map((id) => initialResources.find((f) => f.id === id))
    .filter(Boolean) as Resource[];
  const activeFilterCount = subjects.length + grades.length + difficulties.length;
  const clearFilters = () => { setSubjects([]); setGrades([]); setDifficulties([]); setQuery(''); };

  const reorder = (i: number, dir: -1 | 1) =>
    setSelectedIds((s) => {
      const n = [...s];
      const j = i + dir;
      if (j < 0 || j >= n.length) return s;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  function doExport() {
    const pages = selectedFiles.reduce((s, f) => s + f.pages, 0) + 1;
    setExportOpen(false);
    setToast(`Packet exported ??? ${selectedFiles.length} files, ${pages} pages`);
    setTimeout(() => setToast(null), 3600);
  }

  const counts = {
    worksheet: initialResources.filter((f) => f.type === 'worksheet').length,
    test: initialResources.filter((f) => f.type === 'test').length,
  };

  return (
    <div className="min-h-[70vh] bg-background">
      <PortalChrome session={session} crumbs={[{ label: 'Resource Library' }]} showAdminLink />

      <div className="mx-auto max-w-[1280px] px-6 pb-32 pt-8">
        <div className="mb-6">
          <h1 className="mb-1.5 font-heading text-4xl font-bold">Resource Library</h1>
          <p className="text-base text-muted-foreground">Browse, preview, and assemble worksheets &amp; tests for your students.</p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <SegToggle value={type} onChange={setType} counts={counts} />
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${type === 'worksheet' ? 'worksheets' : 'tests'} by title, topic, or subject...`}
              className="h-11 pl-[42px]"
            />
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <div className="grid grid-cols-[248px_1fr] items-start gap-7">
          {/* Filters */}
          <FilterPanel
            typeFiles={typeFiltered}
            subjects={subjects}
            grades={grades}
            difficulties={difficulties}
            onToggleSubject={(v) => toggle(subjects, setSubjects, v)}
            onToggleGrade={(v) => toggle(grades, setGrades, v)}
            onToggleDifficulty={(v) => toggle(difficulties, setDifficulties, v)}
            activeFilterCount={activeFilterCount}
            onClear={clearFilters}
          />

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {results.length} {type === 'worksheet' ? 'worksheet' : 'test'}{results.length === 1 ? '' : 's'}
                {activeFilterCount ? ' ?? filtered' : ''}
              </span>
              {selectedIds.length > 0 && (
                <button onClick={() => setSelectedIds([])} className="text-sm font-semibold text-primary">
                  Clear selection
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <FolderSearch className="mx-auto size-10 text-border" />
                <p className="mt-3">No files match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {results.map((f) => (
                  <FileCard
                    key={f.id}
                    file={f}
                    selected={selectedIds.includes(f.id)}
                    onOpen={() => setPreview(f)}
                    onToggleSelect={() => toggleSelect(f.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <SelectionTray
          files={selectedFiles}
          onClear={() => setSelectedIds([])}
          onRemove={(id) => toggleSelect(id)}
          onExport={() => setExportOpen(true)}
        />
      )}

      {preview && (
        <FilePreviewModal
          file={preview}
          selected={selectedIds.includes(preview.id)}
          onToggleSelect={toggleSelect}
          onClose={() => setPreview(null)}
        />
      )}
      {exportOpen && (
        <ExportModal
          files={selectedFiles}
          onReorder={reorder}
          onRemove={(id) => toggleSelect(id)}
          onClose={() => setExportOpen(false)}
          onExport={doExport}
        />
      )}
      {toast && <Toast message={toast} />}
    </div>
  );
}

function SegToggle({
  value, onChange, counts,
}: {
  value: ResourceType;
  onChange: (v: ResourceType) => void;
  counts: { worksheet: number; test: number };
}) {
  const opts: { id: ResourceType; label: string; Icon: typeof FileText }[] = [
    { id: 'worksheet', label: 'Worksheets', Icon: FileText },
    { id: 'test', label: 'Tests', Icon: ClipboardCheck },
  ];
  return (
    <div className="inline-flex gap-1 rounded-full border border-border bg-card p-1">
      {opts.map(({ id, label, Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-[18px] py-2 text-sm font-semibold transition-colors',
              active ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-4" />
            {label}
            <span className={cn('rounded-full px-[7px] py-px text-[11px]', active ? 'bg-white/20 text-white' : 'bg-border text-muted-foreground')}>
              {counts[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-11 cursor-pointer appearance-none rounded-md border border-input bg-card pl-4 pr-9 text-sm font-medium text-foreground outline-none"
      >
        <option value="newest">Newest first</option>
        <option value="az">Title A???Z</option>
        <option value="pages">Most pages</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function FilterPanel({
  typeFiles, subjects, grades, difficulties,
  onToggleSubject, onToggleGrade, onToggleDifficulty, activeFilterCount, onClear,
}: {
  typeFiles: Resource[];
  subjects: string[];
  grades: string[];
  difficulties: string[];
  onToggleSubject: (v: string) => void;
  onToggleGrade: (v: string) => void;
  onToggleDifficulty: (v: string) => void;
  activeFilterCount: number;
  onClear: () => void;
}) {
  const subjCount = (s: string) => typeFiles.filter((f) => f.subject === s).length;
  const usedSubjects = SUBJECTS.filter((s) => subjCount(s) > 0);
  const usedGrades = GRADES.filter((g) => typeFiles.some((f) => f.grade === g));
  return (
    <div className="sticky top-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-[18px] py-4">
        <span className="flex items-center gap-2 text-base font-bold">
          <SlidersHorizontal className="size-4 text-primary" />Filters
        </span>
        {activeFilterCount > 0 && (
          <button onClick={onClear} className="text-xs font-semibold text-primary">Clear ({activeFilterCount})</button>
        )}
      </div>
      <div className="flex flex-col gap-5 px-[18px] py-4">
        <FilterGroup title="Subject">
          <div className="flex flex-col gap-0.5">
            {usedSubjects.map((s) => (
              <CheckRow key={s} checked={subjects.includes(s)} onChange={() => onToggleSubject(s)} label={s} count={subjCount(s)} />
            ))}
          </div>
        </FilterGroup>
        <FilterGroup title="Grade Level">
          <div className="flex flex-wrap gap-1.5">
            {usedGrades.map((g) => <Chip key={g} active={grades.includes(g)} onClick={() => onToggleGrade(g)}>{g}</Chip>)}
          </div>
        </FilterGroup>
        <FilterGroup title="Difficulty">
          <div className="flex flex-wrap gap-1.5">
            {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
              <Chip key={d} active={difficulties.includes(d)} onClick={() => onToggleDifficulty(d)}>{d}</Chip>
            ))}
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}

function CheckRow({
  checked, onChange, label, count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <button onClick={onChange} className={cn('flex items-center gap-2.5 rounded-md px-1.5 py-[5px] text-left', checked && 'bg-primary/[0.06]')}>
      <span className={cn('flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px]', checked ? 'border-primary bg-primary' : 'border-border bg-card')}>
        {checked && <CheckMark />}
      </span>
      <span className="flex-1 text-[13.5px]">{label}</span>
      <span className="text-[11px] text-muted-foreground">{count}</span>
    </button>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors',
        active ? 'border-primary bg-primary text-white' : 'border-border bg-card text-foreground',
      )}
    >
      {children}
    </button>
  );
}

function SelectionTray({
  files, onClear, onRemove, onExport,
}: {
  files: Resource[];
  onClear: () => void;
  onRemove: (id: string) => void;
  onExport: () => void;
}) {
  const totalPages = files.reduce((s, f) => s + f.pages, 0);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-6 pb-6">
      <div className="pointer-events-auto flex w-full max-w-[920px] items-center gap-4 rounded-2xl border border-border bg-card p-[14px_18px] shadow-2xl">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary font-bold text-white">{files.length}</div>
          <div>
            <div className="text-sm font-bold">{files.length} file{files.length === 1 ? '' : 's'} selected</div>
            <div className="text-xs text-muted-foreground">~{totalPages + 1} pages incl. cover</div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
          {files.map((f) => (
            <span key={f.id} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary/40 py-[5px] pl-2.5 pr-2 text-xs font-medium">
              {f.title.length > 22 ? `${f.title.slice(0, 22)}???` : f.title}
              <button onClick={() => onRemove(f.id)} aria-label="Remove" className="flex text-muted-foreground">
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={onClear} className="inline-flex h-8 items-center rounded-md px-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10">
            Clear
          </button>
          <button onClick={onExport} className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Layers className="size-4" />Combine &amp; Export
          </button>
        </div>
      </div>
    </div>
  );
}
