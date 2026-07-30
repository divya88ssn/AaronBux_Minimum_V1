# AaronBux API and Persistence Specification v2

## Purpose

This specification defines API contracts, validation boundaries, persistence models, and versioning for onboarding assessments.

## API Endpoints

### Create Quiz Session

`POST /api/v1/quiz-sessions`

Response:

```json
{
  "id": "qs_123",
  "quizVersion": "2.0.0",
  "status": "in_progress",
  "startedAt": "2026-07-29T18:00:00Z"
}
```

### Save Answers

`PUT /api/v1/quiz-sessions/{sessionId}/answers`

Request:

```json
{
  "answers": [
    {
      "questionId": "portfolio_job",
      "optionId": "build_long_term_wealth"
    }
  ]
}
```

### Complete Assessment

`POST /api/v1/quiz-sessions/{sessionId}/complete`

Response:

```json
{
  "assessmentId": "asmt_123",
  "status": "completed",
  "result": {
    "investorStageId": "system_builder",
    "primaryModifierId": "validation_seeker",
    "investmentStyleId": "systematic_improver",
    "portfolioArchetypeId": "growth_diversifier",
    "portfolioBlueprintId": "growth_core",
    "operatingRulesProfileId": "growth_diversifier_default",
    "confidence": {
      "score": 82,
      "band": "high",
      "reasons": ["clear_score_separation", "preferred_style_compatibility"]
    }
  },
  "versions": {
    "specification": "2.0.0",
    "quiz": "2.0.0",
    "resolver": "2.0.0",
    "explanation": "2.0.0"
  }
}
```

### Retrieve Assessment

`GET /api/v1/assessments/{assessmentId}`

### Generate Expanded Explanation

`POST /api/v1/assessments/{assessmentId}/explanations`

The LLM may elaborate only from the stored assessment and catalog definitions.

## Error Contract

```json
{
  "error": {
    "code": "INVALID_QUIZ_ANSWER",
    "message": "The submitted option is not valid for this quiz version.",
    "details": {
      "questionId": "desired_effort",
      "optionId": "unknown"
    },
    "requestId": "req_123"
  }
}
```

Required error codes:
- QUIZ_SESSION_NOT_FOUND
- QUIZ_VERSION_STALE
- REQUIRED_ANSWER_MISSING
- INVALID_QUIZ_ANSWER
- RESOLVER_FAILED
- ASSESSMENT_NOT_FOUND
- EXPLANATION_FAILED

## Persistence Model

### quiz_sessions
- id
- user_id nullable
- quiz_version
- status
- started_at
- completed_at nullable
- created_at
- updated_at

### quiz_responses
- id
- quiz_session_id
- question_id
- option_id
- answered_at
- source

Unique constraint:
`quiz_session_id + question_id`

### assessments
- id
- quiz_session_id
- investor_stage_id
- primary_modifier_id
- secondary_modifier_id nullable
- investment_style_id
- portfolio_archetype_id
- secondary_archetype_id nullable
- portfolio_blueprint_id
- operating_rules_profile_id
- confidence_score
- confidence_band
- confidence_reasons_json
- specification_version
- resolver_version
- explanation_version
- created_at

### assessment_explanations
- id
- assessment_id
- explanation_version
- source: deterministic | ai_enhanced
- content_json
- created_at

### specification_versions
- id
- domain_version
- quiz_version
- resolver_version
- explanation_version
- status: draft | active | retired
- activated_at nullable
- retired_at nullable

## Data Integrity

- Completed sessions are immutable.
- Assessments are append-only.
- Explanation revisions create new records.
- Version fields are required.
- Canonical IDs are validated against the active specification.
- Raw answers are retained so assessments can be reproduced.

## Security and Privacy

- Do not store account credentials in quiz responses.
- Encrypt data in transit and at rest.
- Minimize collection of personal financial information.
- Separate educational profiling from regulated account onboarding.
- Log resolver version, not raw sensitive data, in operational logs.
- Support deletion or anonymization according to the product’s privacy policy.

## Acceptance Criteria

- All requests are schema-validated.
- Assessment creation is idempotent for a completed session.
- Historical assessments retain their original versions.
- AI explanation failures do not invalidate deterministic results.
- Database constraints prevent duplicate answers and invalid state transitions.
