import { archetypeToBlueprint, blueprintToRules } from '../config/catalogs';
import { quizQuestions } from '../config/quiz';
import type {
  BehavioralModifierId,
  InvestmentStyleId,
  InvestorAssessment,
  InvestorStageId,
  PortfolioArchetypeId,
  QuizAnswers,
  ScoreCode
} from '../domain/types';

const scoreCodes: ScoreCode[] = ['BFO', 'GD', 'FT', 'GA', 'TO', 'IP', 'ES', 'VS'];

const zeroRawScores = (): Record<ScoreCode, number> => ({
  BFO: 0,
  GD: 0,
  FT: 0,
  GA: 0,
  TO: 0,
  IP: 0,
  ES: 0,
  VS: 0
});

const zeroArchetypeScores = (): Record<PortfolioArchetypeId, number> => ({
  balanced_family_office: 0,
  growth_diversifier: 0,
  focused_compounder: 0,
  tactical_opportunist: 0,
  income_preserver: 0
});

export function validateAnswers(answers: QuizAnswers): string[] {
  const errors: string[] = [];
  for (const question of quizQuestions) {
    const selected = answers[question.id] ?? [];
    if (selected.length < question.minimumSelections) {
      errors.push(`${question.id}: select at least ${question.minimumSelections}`);
    }
    if (selected.length > question.maximumSelections) {
      errors.push(`${question.id}: select no more than ${question.maximumSelections}`);
    }
    const valid = new Set(question.options.map((option) => option.id));
    for (const optionId of selected) {
      if (!valid.has(optionId)) errors.push(`${question.id}: invalid option ${optionId}`);
    }
  }
  return errors;
}

function calculateRawScores(answers: QuizAnswers) {
  const rawScores = zeroRawScores();
  const selectedSignals: string[] = [];

  for (const question of quizQuestions) {
    const selections = answers[question.id] ?? [];
    selections.forEach((optionId, index) => {
      const option = question.options.find((candidate) => candidate.id === optionId);
      if (!option) return;
      const orderWeight = index === 0 ? 1 : 0.75;
      for (const code of scoreCodes) {
        rawScores[code] += (option.scores[code] ?? 0) * orderWeight;
      }
      selectedSignals.push(...(option.signals ?? []));
    });
  }

  return { rawScores, selectedSignals };
}

function mapArchetypeScores(raw: Record<ScoreCode, number>) {
  const mapped = zeroArchetypeScores();
  mapped.balanced_family_office = raw.BFO + raw.IP * 0.35;
  mapped.growth_diversifier = raw.GD + raw.BFO * 0.15;
  mapped.focused_compounder = raw.FT + raw.GA * 0.35;
  mapped.tactical_opportunist = raw.TO + raw.GA * 0.5;
  mapped.income_preserver = raw.IP + raw.BFO * 0.25;
  return mapped;
}

function pickTop<T extends string>(scores: Record<T, number>): { first: T; second: T; margin: number } {
  const ranked = (Object.entries(scores) as [T, number][]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return { first: ranked[0][0], second: ranked[1][0], margin: ranked[0][1] - ranked[1][1] };
}

function resolveStage(raw: Record<ScoreCode, number>, signals: string[]): InvestorStageId {
  const maturity = raw.ES + raw.FT + raw.TO;
  if (signals.includes('starter_state') || maturity < 3) return 'foundation_builder';
  if (signals.includes('portfolio_fragmentation') || raw.ES >= 4) return 'portfolio_organizer';
  if (signals.includes('systematic_optimization') || raw.FT >= 5) return 'system_builder';
  if (raw.TO >= 6 || raw.GA >= 7) return 'intentional_optimizer';
  return 'adaptive_investor';
}

function resolveModifier(raw: Record<ScoreCode, number>, signals: string[]): BehavioralModifierId {
  if (raw.VS >= 4 || signals.includes('confidence_gap')) return 'validation_seeker';
  if (raw.TO >= 5 || signals.includes('active_opportunity_interest')) return 'opportunity_chaser';
  if (signals.includes('starter_state') || signals.includes('instruction_need')) return 'instruction_seeker';
  if (raw.FT >= 5 || signals.includes('systematic_optimization')) return 'optimization_mindset';
  return 'confidence_builder';
}

function resolveStyle(raw: Record<ScoreCode, number>, signals: string[]): InvestmentStyleId {
  if (raw.TO >= 6) return 'active_navigator';
  if (raw.GA >= 5 || signals.includes('opportunity_sleeve')) return 'bounded_explorer';
  if (raw.FT >= 4 || signals.includes('active_review')) return 'systematic_improver';
  if (raw.BFO + raw.GD >= 8) return 'steady_steward';
  return 'guided_autopilot';
}

function applyCompatibility(
  style: InvestmentStyleId,
  scores: Record<PortfolioArchetypeId, number>,
  warnings: string[]
) {
  const adjusted = { ...scores };
  if (style === 'guided_autopilot') {
    adjusted.tactical_opportunist = Number.NEGATIVE_INFINITY;
    warnings.push('Removed Tactical Opportunist because Guided Autopilot requires lower ongoing effort.');
  }
  if (style === 'bounded_explorer') adjusted.tactical_opportunist += 2;
  if (style === 'systematic_improver') {
    adjusted.growth_diversifier += 1;
    adjusted.focused_compounder += 1;
  }
  if (style === 'active_navigator') {
    adjusted.tactical_opportunist += 2;
    adjusted.focused_compounder += 1;
  }
  return adjusted;
}

function calculateConfidence(margin: number, warnings: string[]) {
  let score = 55;
  const reasons: string[] = [];
  if (margin >= 5) {
    score += 25;
    reasons.push('clear_score_separation');
  } else if (margin >= 2) {
    score += 12;
    reasons.push('moderate_score_separation');
  } else {
    score -= 10;
    reasons.push('close_result');
  }
  if (warnings.length === 0) {
    score += 5;
    reasons.push('no_compatibility_conflicts');
  } else {
    score -= 5;
    reasons.push('compatibility_adjustment_applied');
  }
  score = Math.max(0, Math.min(100, score));
  return {
    score,
    band: score >= 75 ? 'high' as const : score >= 50 ? 'medium' as const : 'low' as const,
    reasons
  };
}

export function resolveAssessment(answers: QuizAnswers): InvestorAssessment {
  const errors = validateAnswers(answers);
  if (errors.length) throw new Error(errors.join('; '));

  const { rawScores, selectedSignals } = calculateRawScores(answers);
  const mappedScores = mapArchetypeScores(rawScores);
  const warnings: string[] = [];
  const stage = resolveStage(rawScores, selectedSignals);
  const modifier = resolveModifier(rawScores, selectedSignals);
  const style = resolveStyle(rawScores, selectedSignals);
  const compatibleScores = applyCompatibility(style, mappedScores, warnings);
  const ranked = pickTop(compatibleScores);
  const blueprint = archetypeToBlueprint[ranked.first];

  return {
    id: crypto.randomUUID(),
    investorStageId: stage,
    primaryModifierId: modifier,
    investmentStyleId: style,
    portfolioArchetypeId: ranked.first,
    portfolioBlueprintId: blueprint,
    operatingRulesProfileId: blueprintToRules[blueprint],
    confidence: calculateConfidence(ranked.margin, warnings),
    trace: { rawScores, mappedScores: compatibleScores, selectedSignals, warnings },
    specificationVersion: '2.0.0',
    quizVersion: '1.0.0',
    resolverVersion: '0.1.0',
    createdAt: new Date().toISOString()
  };
}
