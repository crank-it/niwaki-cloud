export type Season = 'winter' | 'spring' | 'summer' | 'autumn';
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type TechniqueCategory = 'pine-specific' | 'deciduous' | 'evergreen' | 'structural' | 'maintenance';

export interface ProcessStep {
  step: number;
  description: string;
}

export interface PhilosophyPrinciple {
  japanese: string;
  romanji: string;
  principle: string;
  meaning: string;
}

export interface NiwakiStyle {
  id: string;
  name: string;
  japaneseName: string;
  japaneseCharacters: string;
  difficulty: Difficulty;
  description: string;
  characteristics: string[];
  bestSpecies: string[];
  imagePlaceholder?: string;
}

export interface PruningTechnique {
  id: string;
  name: string;
  japaneseName?: string;
  japaneseCharacters?: string;
  purpose: string;
  difficulty: Difficulty;
  timing: string[];
  seasons: Season[];
  categories: TechniqueCategory[];
  process: ProcessStep[];
  warnings?: string[];
  bestFor: string[];
  tips?: string[];
  science?: string;
  criticalWindow?: string | null;
  goalVisual?: string;
}

export interface TrainingMethod {
  id: string;
  name: string;
  japaneseName?: string;
  description: string;
  whenToUse: string;
  materials: string[];
  process: ProcessStep[];
  duration: string;
  warnings?: string[];
  tips?: string[];
}

export interface WireType {
  type: string;
  bestFor: string;
  gauge: string;
  notes: string;
}

export interface Species {
  id: string;
  name: string;
  scientificName?: string;
  difficulty: Difficulty;
  maintenanceFrequency: string;
  bestTechniques: string[];
  notes: string;
  isTraditional: boolean;
}

export interface Tool {
  id: string;
  name: string;
  japaneseEquivalent?: string;
  purpose: string;
  priceRange?: string;
  recommended?: string;
  category: 'cutting' | 'maintenance' | 'training';
}

export interface SeasonalTask {
  month: number;
  season: Season;
  tasks: string[];
  criticalTasks?: string[];
  avoid?: string[];
}

export interface CommonMistake {
  id: string;
  mistake: string;
  consequence: string;
  solution: string;
  category: 'critical' | 'timing' | 'style' | 'maintenance';
}

export interface YearOnePlan {
  phase: string;
  months: string;
  tasks: string[];
}

export interface Resources {
  books: { title: string; author: string }[];
  suppliers: { name: string; url?: string }[];
  gardens: string[];
}

export interface FilterState {
  category: TechniqueCategory | 'all';
  season: Season | null;
  difficulty: Difficulty | null;
}
