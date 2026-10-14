export type Theme = 'light' | 'dark';

export interface DocSection {
  id: string;
  title: string;
  category: 'Getting Started' | 'Language Fundamentals' | 'Compiler & Tooling' | 'Reference';
  summary: string;
  content: string;
  subsections?: { id: string; title: string; content: string }[];
  relatedLinks?: { title: string; href: string }[];
}

export interface SyntaxTopic {
  id: string;
  category: 'Functions' | 'Variables & Mutability' | 'Scalar Types' | 'Control Flow' | 'Operators' | 'Standard Output' | 'Error Prevention';
  title: string;
  summary: string;
  code: string;
  explanation: string;
  restrictions?: string[];
  correctExample?: { code: string; explanation: string };
  incorrectExample?: { code: string; error: string; explanation: string };
  docLink?: string;
}

export interface TutorialStep {
  step: number;
  id: string;
  title: string;
  objective: string;
  prerequisites: string[];
  explanation: string;
  code: string;
  outputDescription?: string;
  verifiedOutput?: string;
  verifiedExitCode?: number;
  commonMistakes: string[];
  nextStepTitle?: string;
  nextStepId?: string;
  referenceLink?: string;
}

export interface ExampleProgram {
  id: string;
  name: string;
  filename: string;
  category: 'Basics' | 'Functions' | 'Loops & State' | 'Algorithms';
  description: string;
  code: string;
  verifiedOutput?: string;
  verifiedExitCode?: number;
  githubUrl: string;
  highlights: string[];
}

export interface ReleaseAsset {
  name: string;
  filename: string;
  size: string;
  sha256: string;
  downloadUrl: string;
  platform: string;
  description: string;
  isPrimary?: boolean;
}

export interface ReleaseInfo {
  version: string;
  tag: string;
  channel: 'Developer Preview' | 'Alpha' | 'Beta' | 'Stable';
  releaseDate: string;
  githubReleaseUrl: string;
  summary: string;
  highlights: string[];
  assets: ReleaseAsset[];
  knownLimitations: string[];
}

export interface SearchItem {
  id: string;
  title: string;
  category: string;
  snippet: string;
  href: string;
  keywords: string[];
}
