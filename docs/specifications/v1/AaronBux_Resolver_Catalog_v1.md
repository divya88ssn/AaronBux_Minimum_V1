# AaronBux Resolver Catalog v1

## Purpose

The Resolver Engine converts onboarding quiz responses into a complete investor
profile. It is the orchestration layer that determines:

Investor Stage
→ Behavioral Modifier
→ Investment Style
→ Portfolio Archetype
→ Portfolio Blueprint
→ Operating Rules

It does **not** recommend specific securities.

---

# Resolver Pipeline

1. Validate quiz completion
2. Normalize answers
3. Apply answer weights
4. Calculate score totals
5. Resolve Investor Stage
6. Resolve Behavioral Modifier(s)
7. Resolve Investment Style
8. Resolve Portfolio Archetype
9. Select Portfolio Blueprint
10. Attach Operating Rules
11. Generate Explanation Object
12. Calculate Confidence Score
13. Produce Final Assessment

---

# Resolver Inputs

- Existing portfolio
- Investment goals
- Investment beliefs
- Desired effort
- Stress response
- Time horizon
- Portfolio job

---

# Resolver Outputs

## Required

- Investor Stage
- Primary Behavioral Modifier
- Investment Style
- Portfolio Archetype
- Portfolio Blueprint
- Operating Rules

## Optional

- Secondary Modifier
- Secondary Archetype Influence
- Confidence Score
- Learning Path

---

# Resolution Rules

## Stage

Determined first.

Independent of portfolio recommendation.

---

## Behavioral Modifier

Determined from:
- beliefs
- stress
- motivations

---

## Investment Style

Determined from:
- effort
- stage
- modifier

---

## Portfolio Archetype

Determined from:
- goals
- portfolio job
- beliefs
- effort
- time horizon

---

## Portfolio Blueprint

One default blueprint per archetype.

---

## Operating Rules

One default operating profile per blueprint.

---

# Tie-break Rules

Priority order

1. Portfolio Job
2. Time Horizon
3. Goals
4. Effort
5. Stress
6. Existing Portfolio

---

# Confidence Calculation

Increase confidence when:
- Strong score separation
- Consistent answers

Reduce confidence when:
- Contradictory answers
- Multiple tied archetypes

---

# Error Handling

Missing required answers
→ Request completion

Invalid values
→ Reject input

Contradictory profile
→ Lower confidence, continue

---

# Final Assessment Object

- Investor Stage
- Behavioral Modifier(s)
- Investment Style
- Portfolio Archetype
- Portfolio Blueprint
- Operating Rules
- Confidence
- Explanation Object

---

## Acceptance Criteria

- Deterministic output.
- Same inputs always produce same result.
- No circular dependencies.
- Portfolio recommendation independent of coaching layer.
