# AaronBux Canonical Domain Model v2

## Purpose

This specification defines the canonical entities, stable identifiers, relationships, and invariants used across the AaronBux onboarding system.

The V1 catalogs remain the business source of truth. This V2 model converts them into implementation contracts.

## Domain Flow

QuizSession
→ QuizResponse[]
→ InvestorAssessment
→ InvestorStage
→ BehavioralModifier[]
→ InvestmentStyle
→ PortfolioArchetype
→ PortfolioBlueprint
→ OperatingRulesProfile
→ ExplanationResult

## Canonical Entity IDs

### Investor Stage
- foundation_builder
- portfolio_organizer
- system_builder
- intentional_optimizer
- adaptive_investor

### Behavioral Modifier
- validation_seeker
- opportunity_chaser
- instruction_seeker
- confidence_builder
- optimization_mindset

### Investment Style
- guided_autopilot
- steady_steward
- systematic_improver
- bounded_explorer
- active_navigator

### Portfolio Archetype
- balanced_family_office
- growth_diversifier
- focused_compounder
- tactical_opportunist
- income_preserver

### Portfolio Blueprint
- balanced_core
- growth_core
- focused_growth
- core_satellite
- income_core

### Operating Rules Profile
- balanced_family_office_default
- growth_diversifier_default
- focused_compounder_default
- tactical_opportunist_default
- income_preserver_default

## Core TypeScript Contracts

```ts
export type InvestorStageId =
  | "foundation_builder"
  | "portfolio_organizer"
  | "system_builder"
  | "intentional_optimizer"
  | "adaptive_investor";

export type BehavioralModifierId =
  | "validation_seeker"
  | "opportunity_chaser"
  | "instruction_seeker"
  | "confidence_builder"
  | "optimization_mindset";

export type InvestmentStyleId =
  | "guided_autopilot"
  | "steady_steward"
  | "systematic_improver"
  | "bounded_explorer"
  | "active_navigator";

export type PortfolioArchetypeId =
  | "balanced_family_office"
  | "growth_diversifier"
  | "focused_compounder"
  | "tactical_opportunist"
  | "income_preserver";

export type PortfolioBlueprintId =
  | "balanced_core"
  | "growth_core"
  | "focused_growth"
  | "core_satellite"
  | "income_core";

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  answeredAt: string;
}

export interface QuizSession {
  id: string;
  quizVersion: string;
  status: "in_progress" | "completed" | "abandoned";
  answers: QuizAnswer[];
  startedAt: string;
  completedAt?: string;
}

export interface ConfidenceResult {
  score: number;
  band: "low" | "medium" | "high";
  reasons: string[];
}

export interface InvestorAssessment {
  id: string;
  quizSessionId: string;
  investorStageId: InvestorStageId;
  primaryModifierId: BehavioralModifierId;
  secondaryModifierId?: BehavioralModifierId;
  investmentStyleId: InvestmentStyleId;
  portfolioArchetypeId: PortfolioArchetypeId;
  secondaryArchetypeId?: PortfolioArchetypeId;
  portfolioBlueprintId: PortfolioBlueprintId;
  operatingRulesProfileId: string;
  confidence: ConfidenceResult;
  specificationVersion: string;
  resolverVersion: string;
  createdAt: string;
}
```

## Relationships

- One completed QuizSession produces one primary InvestorAssessment.
- One InvestorAssessment has exactly one Investor Stage.
- One InvestorAssessment has exactly one primary Behavioral Modifier.
- One InvestorAssessment may have one secondary Behavioral Modifier.
- One InvestorAssessment has exactly one Investment Style.
- One InvestorAssessment has exactly one Portfolio Archetype.
- One InvestorAssessment may have one secondary Portfolio Archetype influence.
- One Portfolio Archetype maps to one default Portfolio Blueprint.
- One Portfolio Blueprint maps to one default Operating Rules Profile.
- One InvestorAssessment produces one Explanation Result.

## Invariants

1. IDs are stable and never reused for a different meaning.
2. Display names may change without changing IDs.
3. Investment Style must be compatible with Portfolio Archetype.
4. Portfolio Blueprint must match the selected Portfolio Archetype.
5. Operating Rules Profile must match the selected Blueprint.
6. Resolver output must be deterministic for the same normalized input and version.
7. An assessment must store the exact specification and resolver versions used.
8. AI-generated explanations cannot alter resolved IDs.
9. V1 catalog content may enrich descriptions but cannot silently change executable rules.
10. Deprecated entities remain readable for historical assessments.

## Versioning

Use semantic versioning:

- Major: breaking domain or resolver changes
- Minor: additive entities, rules, or fields
- Patch: copy, metadata, or non-behavioral corrections

Required stored versions:

```json
{
  "specificationVersion": "2.0.0",
  "quizVersion": "2.0.0",
  "resolverVersion": "2.0.0",
  "explanationVersion": "2.0.0"
}
```

## Acceptance Criteria

- Every canonical entity has one stable ID.
- All IDs are represented in shared types.
- Invalid relationships fail validation.
- Historical assessments remain reproducible by version.
- Frontend, backend, tests, and prompts use the same IDs.
