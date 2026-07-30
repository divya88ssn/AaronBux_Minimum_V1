# AaronBux Behavioral Modifier Catalog v1

## Purpose

Behavioral Modifiers capture *how an investor thinks and reacts* while making
investment decisions. They do not determine portfolio allocation directly.
Instead they personalize coaching, explanations, alerts and UI.

Architecture:

Investor Stage
→ Behavioral Modifier(s)
→ Investment Style
→ Portfolio Archetype
→ Portfolio Blueprint

---

## Modifier 1 — Validation Seeker

Needs confidence before acting.

Typical signals
- Looks for confirmation
- Checks multiple sources
- Hesitates before investing

AI behavior
- Provide evidence
- Compare alternatives
- Explain trade-offs

---

## Modifier 2 — Opportunity Chaser

Enjoys discovering ideas.

Typical signals
- Interested in themes
- Watches market news
- Likes new opportunities

AI behavior
- Limit opportunity sleeve
- Protect core allocation
- Highlight concentration risk

---

## Modifier 3 — Instruction Seeker

Prefers step-by-step guidance.

Typical signals
- Wants exact next action
- Avoids ambiguity

AI behavior
- Checklist driven
- Action-oriented
- Minimal jargon

---

## Modifier 4 — Confidence Builder

Needs reassurance during uncertainty.

Typical signals
- Anxiety during downturns
- Second-guesses decisions

AI behavior
- Reassure using long-term context
- Avoid reactive suggestions

---

## Modifier 5 — Optimization Mindset

Continuously improves an existing system.

Typical signals
- Compares allocations
- Looks for efficiency

AI behavior
- Surface trade-offs
- Portfolio diagnostics
- Controlled experimentation

---

## Rules

Behavioral Modifiers affect:
- Coaching tone
- Explanation style
- Alert wording
- Feature emphasis
- Decision journal prompts

Behavioral Modifiers never directly change:
- Asset allocation
- Risk profile
- Portfolio blueprint

Multiple modifiers may coexist with one primary modifier.

## Acceptance Criteria

- Every assessment has exactly one primary modifier.
- Optional secondary modifier allowed.
- Modifiers are independent of Investor Stage and Investment Style.
