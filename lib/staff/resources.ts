import type { Resource } from './types';

export const GRADES = ['6th', '7th', '8th', '9th', '10th', '11th', '12th', 'College'];

export const SUBJECTS = [
  'Pre-Algebra', 'Algebra 1', 'Algebra 2', 'Geometry', 'Pre-Calculus',
  'SAT Math', 'SAT Reading & Writing', 'SSAT', 'English', 'Biology', 'Chemistry',
];

export const SUBJECT_FILTERS = ['All', 'Math', 'English', 'Test Prep', 'Biology', 'College Counseling'];

/** Broad area for a subject — drives the accent color in the UI. */
export type SubjectArea = 'math' | 'testprep' | 'english' | 'science';

export function subjectArea(subject: string): SubjectArea {
  if (['Pre-Algebra', 'Algebra 1', 'Algebra 2', 'Geometry', 'Pre-Calculus'].includes(subject)) return 'math';
  if (['SAT Math', 'SAT Reading & Writing', 'SSAT'].includes(subject)) return 'testprep';
  if (subject === 'English') return 'english';
  return 'science';
}

export const AREA_LABEL: Record<SubjectArea, string> = {
  math: 'Math', testprep: 'Test Prep', english: 'English', science: 'Science',
};

/**
 * Seed data. In production this is replaced by a DB query — see
 * `app/api/staff/resources/route.ts`. Kept here so the UI renders offline.
 */
export const SEED_RESOURCES: Resource[] = [
  { id: 'w01', type: 'worksheet', title: 'Integer Operations', subject: 'Pre-Algebra', grade: '7th', topic: 'Adding & subtracting integers', pages: 2, difficulty: 'Beginner', added: '2026-05-28', author: 'Kody Kim' },
  { id: 'w02', type: 'worksheet', title: 'Ratios & Proportions', subject: 'Pre-Algebra', grade: '7th', topic: 'Setting up proportions', pages: 2, difficulty: 'Beginner', added: '2026-05-12', author: 'Blythe Yangson' },
  { id: 't01', type: 'test', title: 'Pre-Algebra Diagnostic', subject: 'Pre-Algebra', grade: '6th', topic: 'Placement assessment', pages: 4, difficulty: 'Beginner', added: '2026-04-30', author: 'Kody Kim' },
  { id: 'w03', type: 'worksheet', title: 'Solving Two-Step Equations', subject: 'Algebra 1', grade: '8th', topic: 'Linear equations', pages: 2, difficulty: 'Beginner', added: '2026-06-02', author: 'Blythe Yangson' },
  { id: 'w04', type: 'worksheet', title: 'Linear Functions & Slope', subject: 'Algebra 1', grade: '9th', topic: 'Slope-intercept form', pages: 3, difficulty: 'Intermediate', added: '2026-06-09', author: 'Kody Kim' },
  { id: 't02', type: 'test', title: 'Quadratic Equations Unit Test', subject: 'Algebra 1', grade: '9th', topic: 'Factoring & the quadratic formula', pages: 5, difficulty: 'Intermediate', added: '2026-06-11', author: 'Blythe Yangson' },
  { id: 'w05', type: 'worksheet', title: 'Factoring Polynomials', subject: 'Algebra 2', grade: '10th', topic: 'GCF, grouping, trinomials', pages: 3, difficulty: 'Intermediate', added: '2026-05-20', author: 'Kody Kim' },
  { id: 'w06', type: 'worksheet', title: 'Logarithms & Exponents', subject: 'Algebra 2', grade: '11th', topic: 'Log rules & solving', pages: 3, difficulty: 'Advanced', added: '2026-05-05', author: 'Andrew Holzman' },
  { id: 't03', type: 'test', title: 'Algebra 2 Midterm', subject: 'Algebra 2', grade: '11th', topic: 'Units 1-4', pages: 6, difficulty: 'Advanced', added: '2026-04-22', author: 'Andrew Holzman' },
  { id: 'w07', type: 'worksheet', title: 'Triangle Congruence Proofs', subject: 'Geometry', grade: '10th', topic: 'SSS, SAS, ASA', pages: 3, difficulty: 'Intermediate', added: '2026-06-04', author: 'Blythe Yangson' },
  { id: 'w08', type: 'worksheet', title: 'Circles & Arc Length', subject: 'Geometry', grade: '10th', topic: 'Arc length & sector area', pages: 2, difficulty: 'Intermediate', added: '2026-05-18', author: 'Kody Kim' },
  { id: 't04', type: 'test', title: 'Geometry Chapter 5 Test', subject: 'Geometry', grade: '10th', topic: 'Triangles & congruence', pages: 5, difficulty: 'Intermediate', added: '2026-05-25', author: 'Blythe Yangson' },
  { id: 'w09', type: 'worksheet', title: 'Unit Circle & Radians', subject: 'Pre-Calculus', grade: '12th', topic: 'Radian measure', pages: 2, difficulty: 'Advanced', added: '2026-05-30', author: 'Andrew Holzman' },
  { id: 'w10', type: 'worksheet', title: 'Trig Identities Practice', subject: 'Pre-Calculus', grade: '12th', topic: 'Verifying identities', pages: 3, difficulty: 'Advanced', added: '2026-05-15', author: 'Peter Greenhill' },
  { id: 'w11', type: 'worksheet', title: 'SAT Math: Heart of Algebra', subject: 'SAT Math', grade: '11th', topic: 'Linear equations & systems', pages: 4, difficulty: 'Intermediate', added: '2026-06-10', author: 'Andrew Holzman' },
  { id: 't05', type: 'test', title: 'SAT Math Practice Section 3', subject: 'SAT Math', grade: '11th', topic: 'No-calculator section', pages: 6, difficulty: 'Advanced', added: '2026-06-07', author: 'Andrew Holzman' },
  { id: 'w12', type: 'worksheet', title: 'SAT Reading: Evidence Pairs', subject: 'SAT Reading & Writing', grade: '11th', topic: 'Command of evidence', pages: 4, difficulty: 'Intermediate', added: '2026-05-22', author: 'Peter Greenhill' },
  { id: 't06', type: 'test', title: 'Full-Length SAT Practice #4', subject: 'SAT Reading & Writing', grade: '12th', topic: 'Reading, Writing & Language', pages: 8, difficulty: 'Advanced', added: '2026-04-18', author: 'Peter Greenhill' },
  { id: 'w13', type: 'worksheet', title: 'SSAT Verbal: Analogies', subject: 'SSAT', grade: '8th', topic: 'Word relationships', pages: 2, difficulty: 'Intermediate', added: '2026-05-08', author: 'Kody Kim' },
  { id: 't07', type: 'test', title: 'SSAT Quantitative Practice', subject: 'SSAT', grade: '8th', topic: 'Quantitative reasoning', pages: 4, difficulty: 'Intermediate', added: '2026-05-02', author: 'Kody Kim' },
  { id: 'w14', type: 'worksheet', title: 'Reading Comprehension: Inference', subject: 'English', grade: '9th', topic: 'Drawing inferences', pages: 3, difficulty: 'Beginner', added: '2026-06-01', author: 'Peter Greenhill' },
  { id: 'w15', type: 'worksheet', title: 'Persuasive Essay Structure', subject: 'English', grade: '10th', topic: 'Thesis & evidence', pages: 2, difficulty: 'Intermediate', added: '2026-05-14', author: 'Andrew Holzman' },
  { id: 'w16', type: 'worksheet', title: 'Cell Biology Review', subject: 'Biology', grade: '10th', topic: 'Organelles & functions', pages: 3, difficulty: 'Intermediate', added: '2026-05-27', author: 'Shwe Win' },
  { id: 't08', type: 'test', title: 'Genetics Unit Test', subject: 'Biology', grade: '11th', topic: 'Mendelian inheritance', pages: 5, difficulty: 'Advanced', added: '2026-05-09', author: 'Sheany Chung' },
  { id: 'w17', type: 'worksheet', title: 'Stoichiometry Practice', subject: 'Chemistry', grade: '11th', topic: 'Mole ratios & conversions', pages: 3, difficulty: 'Advanced', added: '2026-05-19', author: 'Shwe Win' },
];

export function fmtDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Maps the broad subject filter chips to the concrete subjects they include. */
export function matchesSubjectFilter(filter: string, r: Resource): boolean {
  if (filter === 'All') return true;
  const map: Record<string, string[]> = {
    Math: ['Pre-Algebra', 'Algebra 1', 'Algebra 2', 'Geometry', 'Pre-Calculus'],
    English: ['English'],
    'Test Prep': ['SAT Math', 'SAT Reading & Writing', 'SSAT'],
    Biology: ['Biology', 'Chemistry'],
    'College Counseling': ['SAT Math', 'SAT Reading & Writing'],
  };
  return (map[filter] || []).includes(r.subject);
}
