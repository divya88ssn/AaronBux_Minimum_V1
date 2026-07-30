# AaronBux Analytics and Experimentation Specification v2

## Purpose

This specification defines how AaronBux measures onboarding completion, result comprehension, behavioral fit, and conversion without changing resolver truth during experiments.

## Measurement Principles

1. Separate product learning from financial performance claims.
2. Measure comprehension and activation before downstream retention.
3. Never A/B test core resolver truth without explicit versioning.
4. Experiments may change presentation, sequencing, or explanation depth.
5. Any scoring experiment creates a new resolver version.

## Core Funnel

1. onboarding_started
2. question_answered
3. onboarding_review_viewed
4. onboarding_completed
5. result_viewed
6. result_detail_viewed
7. blueprint_viewed
8. operating_rules_viewed
9. next_step_clicked
10. account_creation_started
11. account_creation_completed

## Event Contract

```ts
interface AnalyticsEvent {
  eventName: string;
  eventVersion: string;
  anonymousId: string;
  userId?: string;
  sessionId: string;
  quizSessionId?: string;
  assessmentId?: string;
  properties: Record<string, string | number | boolean | null>;
  occurredAt: string;
}
```

## Required Event Properties

Common:
- quiz_version
- specification_version
- resolver_version
- device_type
- referrer_category
- experiment_assignments

Assessment events:
- investor_stage_id
- behavioral_modifier_id
- investment_style_id
- portfolio_archetype_id
- confidence_band

Do not include:
- free-form sensitive financial data
- raw account numbers
- credentials
- unnecessary personally identifiable information

## Core Metrics

### Acquisition
- onboarding start rate
- source-to-start conversion

### Completion
- onboarding completion rate
- completion time
- question-level abandonment
- answer-change rate

### Result comprehension
- result section engagement
- blueprint expansion rate
- operating-rules view rate
- explanation helpfulness score

### Activation
- next-step click rate
- account creation start rate
- account creation completion rate
- saved assessment rate

### Quality
- low-confidence result rate
- contradiction rate
- resolver error rate
- stale-version error rate
- explanation-generation failure rate

## Experiment Classes

### Allowed without resolver version change
- question order
- progress indicator
- helper text
- result layout
- explanation length
- CTA wording
- section order

### Requires quiz version change
- question wording that changes interpretation
- answer option additions or removals
- required versus optional changes

### Requires resolver version change
- score weights
- compatibility rules
- tie-break order
- confidence formula
- entity mappings

## Experiment Record

```json
{
  "id": "exp_result_summary_001",
  "hypothesis": "A layered result summary improves blueprint engagement.",
  "primaryMetric": "blueprint_view_rate",
  "guardrailMetrics": [
    "result_exit_rate",
    "low_confidence_helpfulness_score"
  ],
  "eligibleVersions": {
    "quiz": "2.0.0",
    "resolver": "2.0.0"
  }
}
```

## Acceptance Criteria

- Every funnel step emits a versioned event.
- Resolver-affecting experiments use a new resolver version.
- Analytics never changes the assessment result in real time.
- Sensitive data is excluded from event payloads.
- Experiment assignments are stored with the session and assessment.
