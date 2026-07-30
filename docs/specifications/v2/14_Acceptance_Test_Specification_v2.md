# AaronBux Acceptance-Test Specification v2

## Purpose

This specification proves that implementation behavior matches the V1 catalogs and V2 contracts.

## Test Layers

1. Schema validation
2. Catalog integrity
3. Resolver unit tests
4. Compatibility tests
5. Scenario tests
6. API contract tests
7. UI contract tests
8. Versioning and reproducibility tests
9. AI explanation guardrail tests

## Catalog Integrity Tests

- Every stable ID is unique.
- Every archetype has one default blueprint.
- Every blueprint has one default operating-rules profile.
- All referenced IDs exist.
- No prohibited style-archetype combination appears in fixtures.
- Every result entity has explanation content.

## Resolver Unit Tests

### Determinism

```ts
it("returns identical output for identical input and version", () => {
  const first = resolveAssessment(fixture, versions);
  const second = resolveAssessment(fixture, versions);
  expect(second).toEqual(first);
});
```

### Guided Autopilot prohibition

```ts
it("never pairs Guided Autopilot with Tactical Opportunist", () => {
  const result = resolveAssessment(highOpportunityLowEffortFixture);
  expect([
    result.investmentStyleId,
    result.portfolioArchetypeId
  ]).not.toEqual([
    "guided_autopilot",
    "tactical_opportunist"
  ]);
});
```

### Blueprint mapping

```ts
it.each([
  ["balanced_family_office", "balanced_core"],
  ["growth_diversifier", "growth_core"],
  ["focused_compounder", "focused_growth"],
  ["tactical_opportunist", "core_satellite"],
  ["income_preserver", "income_core"]
])("maps %s to %s", (archetype, blueprint) => {
  expect(archetypeToBlueprint[archetype]).toBe(blueprint);
});
```

## Canonical Scenario Fixtures

### Scenario A — Guided Long-Term Builder

Inputs:
- early investing capability
- long time horizon
- low desired effort
- low research tolerance
- moderate stress sensitivity
- primary goal: long-term wealth

Expected:
- stage: foundation_builder or portfolio_organizer
- style: guided_autopilot
- archetype: balanced_family_office or growth_diversifier
- prohibited: tactical_opportunist
- confidence: medium or high

### Scenario B — Systematic Growth Investor

Inputs:
- established portfolio
- long horizon
- medium effort
- high process preference
- moderate research tolerance
- primary goal: long-term growth

Expected:
- stage: system_builder
- modifier: optimization_mindset or validation_seeker
- style: systematic_improver
- archetype: growth_diversifier
- blueprint: growth_core

### Scenario C — Bounded Opportunity Seeker

Inputs:
- established core portfolio
- medium effort
- high opportunity interest
- explicit desire to protect the core
- long horizon

Expected:
- style: bounded_explorer
- archetype: tactical_opportunist
- blueprint: core_satellite
- monthly opportunity review
- quarterly portfolio review

### Scenario D — Income-Focused Investor

Inputs:
- income is the primary portfolio job
- near or medium time horizon
- low to medium effort
- low tolerance for large drawdowns

Expected:
- archetype: income_preserver
- blueprint: income_core
- style: guided_autopilot or steady_steward
- opportunity sleeve absent by default

### Scenario E — Focused Active Investor

Inputs:
- advanced capability
- high research tolerance
- high decision autonomy
- high conviction preference
- long horizon

Expected:
- stage: intentional_optimizer or adaptive_investor
- style: active_navigator
- archetype: focused_compounder
- blueprint: focused_growth

## Confidence Tests

- Clear score separation produces high confidence.
- Tie before tie-break reduces confidence.
- Restricted compatibility reduces confidence.
- Missing optional answers do not block completion.
- Missing required answers block completion.
- Confidence always stays between 0 and 100.

## API Tests

- Session creation returns active quiz version.
- Invalid answer returns INVALID_QUIZ_ANSWER.
- Completing a session twice is idempotent.
- Completed session cannot be edited.
- Assessment response includes all required version fields.
- Historical assessment retrieval preserves original output.

## UI Tests

- Every question renders from configuration.
- Required validation prevents progression.
- Back navigation preserves answers.
- Result page renders from ResultViewModel.
- No component imports scoring or resolver modules.
- Keyboard users can complete the full flow.
- Confidence includes visible text.

## AI Explanation Guardrails

- AI cannot change resolved entity IDs.
- AI cannot recommend a specific security.
- AI cannot guarantee returns.
- AI must acknowledge low confidence when supplied.
- AI output failure falls back to deterministic catalog copy.

## Definition of Done

The onboarding system is implementation-complete when:

- all catalog integrity tests pass
- all canonical scenarios pass
- API and UI contracts pass
- resolver coverage exceeds 90%
- historical reproduction tests pass
- AI guardrail tests pass
- no product behavior is defined only inside a UI component or prompt
