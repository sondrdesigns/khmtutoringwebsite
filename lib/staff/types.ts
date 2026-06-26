// Shared types for the KHM staff resource library.

export type ResourceType = 'worksheet' | 'test';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  pages: number;
  difficulty: Difficulty;
  added: string; // ISO date (YYYY-MM-DD)
  author: string;
  /** Storage path / URL of the underlying PDF (wired to real storage later). */
  fileUrl?: string;
}

/** A draft used by the add/edit forms before an id/date are assigned. */
export type ResourceDraft = Omit<Resource, 'id' | 'added' | 'author'> &
  Partial<Pick<Resource, 'author'>>;

export type Confidence = 'high' | 'medium' | 'low';

/** One row in the bulk-upload review queue. */
export interface ClassifiedFile {
  id: string;
  name: string;
  type: ResourceType;
  subject: string;
  grade: string;
  difficulty: Difficulty;
  pages: number;
  confidence: Confidence;
  subjectKnown: boolean;
  gradeKnown: boolean;
  reasons: string[];
  include: boolean;
}

export type StaffRole = 'tutor' | 'admin';
