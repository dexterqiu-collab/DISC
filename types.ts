
export enum DISCDimension {
  D = 'D', // Dominance
  I = 'I', // Influence
  S = 'S', // Steadiness
  C = 'C', // Compliance
}

export interface Question {
  id: number;
  text: string;
  dimension: DISCDimension;
}

export interface PersonalityAnalysis {
  type: string;
  animal: string;
  title: string;
  color: string;
  gradient: string;
  keywords: string[];
  description: string;
  workStyle: string;
  jobs: string[];
}

export interface TestResults {
  scores: Record<DISCDimension, number>;
  percentages: Record<DISCDimension, number>;
  dominantType: DISCDimension | 'Chameleon';
}
