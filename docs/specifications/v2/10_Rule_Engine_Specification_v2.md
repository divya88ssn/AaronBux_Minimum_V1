# AaronBux Rule Engine Specification v2

## Purpose

This specification converts the V1 Resolver Catalog into deterministic, executable logic.

## Processing Stages

1. Validate
2. Normalize
3. Score independent dimensions
4. Resolve Investor Stage
5. Resolve Behavioral Modifier
6. Resolve Investment Style
7. Resolve Portfolio Archetype
8. Apply compatibility rules
9. Map Blueprint
10. Map Operating Rules
11. Calculate confidence
12. Produce explanation inputs

## Required Quiz Dimensions

- existing_portfolio_maturity
- portfolio_job
- primary_goal
- time_horizon
- desired_effort
- research_tolerance
- stress_response
- decision_preference
- opportunity_interest
- income_need

## Score Model

Each option contributes integer scores from -3 to +4.

```ts
type ScoreMap<T extends string> = Partial<Record<T, number>>;

interface AnswerEffect {
  stage?: ScoreMap<InvestorStageId>;
  modifier?: ScoreMap<BehavioralModifierId>;
  style?: ScoreMap<InvestmentStyleId>;
  archetype?: ScoreMap<PortfolioArchetypeId>;
}
```

## Resolver Order

### Investor Stage

Primary inputs:
- existing portfolio maturity
- prior investing experience
- ability to explain current holdings
- consistency of investing process

Stage resolution must not use portfolio archetype scores.

### Behavioral Modifier

Primary inputs:
- stress response
- decision preference
- confidence pattern
- opportunity attraction
- desire for optimization

Return:
- highest score as primary
- second-highest as secondary only when within 20% of the primary score and not identical in behavior

### Investment Style

Primary inputs:
- desired effort
- research tolerance
- monitoring preference
- decision autonomy

Compatibility examples:
- guided_autopilot cannot pair with tactical_opportunist
- active_navigator cannot pair with income_preserver unless income need is secondary
- bounded_explorer is preferred when opportunity interest is high but desired effort is medium or lower

### Portfolio Archetype

Priority dimensions:
1. portfolio_job
2. time_horizon
3. primary_goal
4. income_need
5. opportunity_interest
6. desired_effort
7. stress_response
8. existing_portfolio_maturity

## Tie-Break Rules

When top two candidates are tied:

1. Apply portfolio_job score.
2. Apply time_horizon score.
3. Apply primary_goal score.
4. Apply compatibility with resolved Investment Style.
5. Select the less behaviorally demanding candidate.
6. If still tied, return the lexicographically first stable ID and lower confidence.

The final fallback exists only to preserve determinism.

## Compatibility Matrix

| Style | BFO | GD | FT | TO | IP |
|---|---:|---:|---:|---:|---:|
| Guided Autopilot | preferred | allowed | restricted | prohibited | preferred |
| Steady Steward | preferred | preferred | allowed | restricted | preferred |
| Systematic Improver | allowed | preferred | preferred | allowed | allowed |
| Bounded Explorer | allowed | preferred | allowed | preferred | restricted |
| Active Navigator | restricted | allowed | preferred | preferred | restricted |

Definitions:
- preferred: +2 compatibility score
- allowed: 0
- restricted: -2
- prohibited: candidate is removed

## Confidence Formula

Start at 50.

Add:
- +20 when primary score leads second place by at least 30%
- +10 when all high-priority dimensions agree
- +10 when style and archetype compatibility is preferred
- +5 when no required answer is imputed

Subtract:
- -15 when top candidates are tied before tie-breaks
- -10 for each contradictory high-priority answer pair, capped at -20
- -10 when compatibility is restricted
- -10 when required data is imputed

Clamp to 0–100.

Bands:
- 75–100: high
- 50–74: medium
- 0–49: low

## Missing Data

- Required unanswered question: assessment cannot complete.
- Optional unanswered question: use neutral score of zero.
- Unknown enum value: reject request.
- Contradictory answers: continue, record contradiction reason, lower confidence.

## Pseudocode

```ts
export function resolveAssessment(input: QuizAnswers): InvestorAssessment {
  const normalized = normalizeAndValidate(input);

  const stage = resolveStage(normalized);
  const modifiers = resolveModifiers(normalized);
  const style = resolveStyle(normalized, stage, modifiers);

  const rawArchetypes = scoreArchetypes(normalized);
  const compatibleArchetypes = applyCompatibility(rawArchetypes, style);
  const archetype = resolveWithTieBreaks(compatibleArchetypes, normalized);

  const blueprint = archetypeToBlueprint[archetype.primaryId];
  const operatingRules = blueprintToOperatingRules[blueprint];

  const confidence = calculateConfidence({
    normalized,
    stage,
    modifiers,
    style,
    archetype
  });

  return buildAssessment({
    stage,
    modifiers,
    style,
    archetype,
    blueprint,
    operatingRules,
    confidence
  });
}
```

## Acceptance Criteria

- Same normalized input and version always produce the same output.
- Prohibited combinations cannot be returned.
- Ties always resolve deterministically.
- Confidence includes machine-readable reasons.
- No LLM participates in scoring or resolution.
