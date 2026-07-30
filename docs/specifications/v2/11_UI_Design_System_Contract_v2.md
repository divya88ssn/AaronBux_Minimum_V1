# AaronBux UI and Design-System Contract v2

## Purpose

This contract defines how the onboarding and result experiences consume the V1 catalogs and V2 domain model without embedding product logic in UI components.

## Screen Model

1. Welcome
2. Existing Setup
3. Portfolio Job
4. Goals
5. Time Horizon
6. Effort and Research
7. Stress Response
8. Decision Preference
9. Opportunity and Income Preferences
10. Review
11. Processing
12. Result Summary
13. Profile Detail
14. Portfolio Blueprint
15. Operating Rules
16. Next Step

## Quiz Configuration Contract

```ts
export interface QuizQuestion {
  id: string;
  order: number;
  type: "single_select" | "multi_select";
  title: string;
  helperText?: string;
  required: boolean;
  options: QuizOption[];
  analyticsKey: string;
}

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  effects: AnswerEffect;
}
```

## Result View Model

```ts
export interface ResultViewModel {
  headline: string;
  summary: string;
  confidence: {
    band: "low" | "medium" | "high";
    message: string;
  };
  stage: ResultSection;
  modifier: ResultSection;
  style: ResultSection;
  archetype: ResultSection;
  blueprint: BlueprintSection;
  operatingRules: OperatingRulesSection;
  nextStep: {
    title: string;
    body: string;
    actionLabel: string;
    actionId: string;
  };
}
```

## Component Responsibilities

### Allowed in React components
- Render labels and descriptions
- Manage local visual state
- Display validation messages
- Navigate between screens
- Submit answers
- Render resolver output

### Prohibited in React components
- Scoring
- Tie-breaking
- Archetype selection
- Compatibility decisions
- Confidence calculation
- Prompt construction
- Database mapping

## Required UI States

Every screen must define:
- default
- selected
- validation error
- loading
- disabled
- unavailable
- retry

The full flow must define:
- in-progress session
- abandoned session
- completed assessment
- resolver failure
- stale quiz version
- stale assessment version

## Copy Token Structure

```ts
export const copy = {
  quiz: {
    portfolioJob: {
      title: "What should your portfolio help you do?",
      helper: "Choose the outcome that matters most right now."
    }
  },
  result: {
    labels: {
      stage: "Where you are now",
      modifier: "How you tend to decide",
      style: "How you prefer to invest",
      archetype: "Your portfolio philosophy",
      blueprint: "How the portfolio is organized",
      operatingRules: "How to manage it over time"
    }
  }
};
```

## Accessibility Requirements

- All interactive controls use semantic HTML.
- Every question has one programmatic label.
- Keyboard navigation supports the full quiz.
- Focus moves to validation errors when submission fails.
- Result sections use hierarchical headings.
- Confidence is communicated with text, not color alone.
- Progress is announced accessibly.
- Motion respects reduced-motion preferences.

## Responsive Requirements

- Mobile-first layout at 320 px minimum.
- No horizontal scrolling in quiz or result flows.
- Touch targets at least 44 × 44 px.
- Result cards stack on narrow screens.
- Long explanations remain readable without truncation.

## Analytics Hooks

Every screen and action exposes:
- screen_viewed
- answer_selected
- answer_changed
- validation_failed
- quiz_completed
- result_viewed
- result_section_expanded
- next_step_clicked

## Acceptance Criteria

- The UI is fully generated from configuration and view models.
- No product decision logic exists in presentation components.
- Copy uses stable keys.
- Required UI states are implemented.
- Accessibility checks pass for keyboard, labels, focus, and contrast.
