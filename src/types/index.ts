// Core types for PromQL Froggy

export interface Metric {
  __name__: string;
  value: number;
  timestamp?: number;
  [label: string]: string | number | undefined;
}

export interface QueryResult {
  success: boolean;
  data?: Metric[];
  error?: string;
  type?: 'instant_vector' | 'range_vector' | 'scalar' | 'string';
}

export interface Level {
  id: number;
  title: string;
  concept: string;
  description: string;
  hint?: string;
  sampleMetrics: Metric[];
  solutionQuery: string;
  validationPattern?: RegExp;
  alertContext?: string;
  initialQuery?: string;
}

export interface Progress {
  [levelId: number]: {
    completed: boolean;
    attempts: number;
    lastAttempt?: string;
  };
}

export type LevelStatus = 'locked' | 'available' | 'completed';
