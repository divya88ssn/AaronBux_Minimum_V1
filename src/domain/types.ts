export type InvestorStageId =
  | 'foundation_builder'
  | 'portfolio_organizer'
  | 'system_builder'
  | 'intentional_optimizer'
  | 'adaptive_investor';

export type BehavioralModifierId =
  | 'validation_seeker'
  | 'opportunity_chaser'
  | 'instruction_seeker'
  | 'confidence_builder'
  | 'optimization_mindset';

export type InvestmentStyleId =
  | 'guided_autopilot'
  | 'steady_steward'
  | 'systematic_improver'
  | 'bounded_explorer'
  | 'active_navigator';

export type PortfolioArchetypeId =
  | 'balanced_family_office'
  | 'growth_diversifier'
  | 'focused_compounder'
  | 'tactical_opportunist'
  | 'income_preserver';

export type PortfolioBlueprintId =
  | 'balanced_core'
  | 'growth_core'
  | 'focused_growth'
  | 'core_satellite'
  | 'income_core';

export type ScoreCode = 'BFO' | 'GD' | 'FT' | 'GA' | 'TO' | 'IP' | 'ES' | 'VS';

export interface QuizOption {
  id: string;
  label: string;
  scores: Partial<Record<ScoreCode, number>>;
  signals?: string[];
}

export interface QuizQuestion {
  id: string;
  step: number;
  title: string;
  question: string;
  helperText?: string;
  selectionMode: 'single' | 'ordered_multi';
  minimumSelections: number;
  maximumSelections: number;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string[]>;

export interface ConfidenceResult {
  score: number;
  band: 'low' | 'medium' | 'high';
  reasons: string[];
}

export interface ResolutionTrace {
  rawScores: Record<ScoreCode, number>;
  mappedScores: Record<PortfolioArchetypeId, number>;
  selectedSignals: string[];
  warnings: string[];
}

export interface InvestorAssessment {
  id: string;
  investorStageId: InvestorStageId;
  primaryModifierId: BehavioralModifierId;
  investmentStyleId: InvestmentStyleId;
  portfolioArchetypeId: PortfolioArchetypeId;
  portfolioBlueprintId: PortfolioBlueprintId;
  operatingRulesProfileId: string;
  confidence: ConfidenceResult;
  trace: ResolutionTrace;
  specificationVersion: '2.0.0';
  quizVersion: '1.0.0';
  resolverVersion: '0.1.0';
  createdAt: string;
}

export interface ResultSection {
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
}

export interface ResultViewModel {
  headline: string;
  summary: string;
  confidenceMessage: string;
  stage: ResultSection;
  modifier: ResultSection;
  style: ResultSection;
  archetype: ResultSection;
  blueprint: {
    title: string;
    summary: string;
    components: string[];
  };
  operatingRules: string[];
  nextStep: string;
}
