// Logical schema description for CY‑HI (used with Supabase tables)

/*
Table: users
- id (uuid, pk)
- email (text, unique)
- name (text)
- role (text: 'student' | 'lecturer' | 'admin')
- created_at (timestamp)

Table: missions
- id (uuid, pk)
- title (text)
- description (text)
- difficulty (text)
- xp (int)
- steps (json)
- created_by (uuid, fk -> users.id)
- created_at (timestamp)

Table: submissions
- id (uuid, pk)
- mission_id (uuid, fk -> missions.id)
- student_id (uuid, fk -> users.id)
- answer (text)
- status (text: 'submitted' | 'graded')
- score (int, nullable)
- feedback (text, nullable)
- created_at (timestamp)

Table: classes
- id (uuid, pk)
- name (text)
- lecturer_id (uuid, fk -> users.id)
- created_at (timestamp)

Table: institutions
- id (uuid, pk)
- name (text)
- branding_color (text)
- theme_default (text)
- created_at (timestamp)
*/

// Optional TypeScript types for convenience:

export type UserRole = "student" | "lecturer" | "admin";

export type Mission = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  steps: string[];
  created_by?: string;
  created_at?: string;
};

export type Submission = {
  id: string;
  mission_id: string;
  student_id: string;
  answer: string;
  status: "submitted" | "graded";
  score?: number | null;
  feedback?: string | null;
  created_at?: string;
};
