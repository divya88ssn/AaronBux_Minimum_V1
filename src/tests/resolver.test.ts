import { describe, expect, it, vi } from 'vitest';
import { archetypeToBlueprint } from '../config/catalogs';
import { quizQuestions } from '../config/quiz';
import type { QuizAnswers } from '../domain/types';
import { resolveAssessment, validateAnswers } from '../engine/resolver';

vi.stubGlobal('crypto', { randomUUID: () => 'test-assessment-id' });

function firstValidAnswers(): QuizAnswers {
  return Object.fromEntries(quizQuestions.map((question) => [question.id, [question.options[0].id]]));
}

describe('resolver', () => {
  it('rejects missing required answers', () => {
    expect(validateAnswers({}).length).toBe(quizQuestions.length);
  });

  it('is deterministic apart from timestamps', () => {
    const answers = firstValidAnswers();
    const first = resolveAssessment(answers);
    const second = resolveAssessment(answers);
    expect({ ...first, createdAt: '' }).toEqual({ ...second, createdAt: '' });
  });

  it('maps every archetype to a blueprint', () => {
    expect(Object.keys(archetypeToBlueprint)).toHaveLength(5);
    expect(archetypeToBlueprint.growth_diversifier).toBe('growth_core');
    expect(archetypeToBlueprint.tactical_opportunist).toBe('core_satellite');
  });

  it('does not pair Guided Autopilot with Tactical Opportunist', () => {
    const result = resolveAssessment(firstValidAnswers());
    expect(
      result.investmentStyleId === 'guided_autopilot' &&
      result.portfolioArchetypeId === 'tactical_opportunist'
    ).toBe(false);
  });

  it('returns confidence within 0 to 100', () => {
    const result = resolveAssessment(firstValidAnswers());
    expect(result.confidence.score).toBeGreaterThanOrEqual(0);
    expect(result.confidence.score).toBeLessThanOrEqual(100);
  });
});
