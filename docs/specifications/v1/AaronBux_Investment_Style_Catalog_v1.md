# AaronBux Investment Style Catalog v1.0

**Status:** Implementation-ready draft  
**Catalog ID:** `investment_style_catalog`  
**Version:** `1.0.0`  
**Depends on:** onboarding answers, effort profile, stress profile, investor stage, behavioral modifiers  
**Does not determine:** final portfolio archetype or asset allocation by itself

---

## 1. Purpose

The Investment Style describes **how a user can realistically operate an investing system over time**.

It answers:

> What level of attention, research, structure, guidance, and decision authority should this person’s investing experience require?

The Investment Style is separate from:

- **Investor Stage:** where the user is in their development;
- **Behavioral Modifier:** how confidence, anxiety, validation, or exploration affects interaction;
- **Portfolio Archetype:** the investment system selected;
- **Portfolio Blueprint:** the component architecture of that system;
- **Operating Rules:** the specific rules for maintaining it.

A user can have the same Investment Style while using different compatible portfolio archetypes.

Example:

```text
Investment Style: Guided Autopilot
Portfolio Archetype: Global Diversified
Behavioral Modifier: Validation Seeker
```

or:

```text
Investment Style: Guided Autopilot
Portfolio Archetype: Balanced Family Office
Behavioral Modifier: None
```

---

## 2. Design principles

1. **Style represents sustainable behavior, not aspiration.**
2. **More activity is not presented as more expertise.**
3. **The user should not select a technical label directly.**
4. **Style is derived mainly from effort, decision behavior, and stress response.**
5. **Goals and time horizon can constrain a style-compatible portfolio, but do not redefine the style.**
6. **Behavioral modifiers change how the style is supported, not the underlying allocation.**
7. **A style must be understandable in plain language.**
8. **Every style must define a realistic operating burden.**
9. **No style may imply guaranteed performance.**
10. **A style may be revisited as the user’s behavior and experience change.**

---

## 3. Canonical style taxonomy

| ID | User-facing name | Core promise | Typical effort |
|---|---|---|---|
| `guided_autopilot` | Guided Autopilot | A clear system that stays mostly in the background and explains when attention is needed | Very low to low |
| `steady_steward` | Steady Steward | A durable portfolio reviewed occasionally with disciplined, limited changes | Low |
| `systematic_improver` | Systematic Improver | A repeatable process for reviewing, comparing, and improving the portfolio | Low-medium to medium |
| `bounded_explorer` | Bounded Explorer | A stable core with controlled room to research and test selected ideas | Medium to medium-high |
| `active_navigator` | Active Navigator | A defined framework for making more frequent, market-aware decisions without losing portfolio boundaries | High |

These are **operating styles**, not portfolio recommendations.

---

# 4. Style definitions

## 4.1 Guided Autopilot

### Identity

- **ID:** `guided_autopilot`
- **Short label:** Guided Autopilot
- **One-line description:** A mostly automated investing system with clear explanations and attention only when something meaningfully changes.
- **Core user thought:** “I want the system to tell me when something actually needs my attention.”

### Best-fit user behavior

The user generally wants to:

- establish a sensible portfolio;
- automate contributions where possible;
- avoid frequent monitoring;
- receive clear reasons before making changes;
- know when leaving the portfolio alone is the correct action;
- avoid turning investing into an ongoing research project.

### Typical source signals

Strong supporting signals:

- `low_intervention`
- `simple_setup`
- `passive_foundation`
- `system_attention_preference`
- `rules_based_attention`
- `confidence_gap`
- `external_validation`
- `strategy_doubt`
- `low_attention_goal`

Typical effort answer:

- “Set it up, automate it, and check it about once a year.”
- “I want the system to tell me when something actually needs my attention.”

### Operating profile

| Dimension | Default |
|---|---|
| Effort budget | Under 1 hour per month; often much less |
| Review cadence | Annual, with optional semiannual check-in |
| Monitoring | Exception-based only |
| Research expectation | Minimal |
| Decision frequency | Rare |
| Change threshold | High |
| Automation preference | High |
| Guidance level | High |
| Explanation depth | Medium; high when Validation Seeker is active |
| User authority | Confirm meaningful changes; routine maintenance may be automated |

### Recommended UI behavior

The experience should:

- emphasize what is already working;
- show one recommended next action at a time;
- distinguish “no action needed” from inactivity;
- use exception-based alerts;
- avoid dense market feeds;
- explain why a proposed change matters;
- request confirmation before material changes;
- keep optional detail behind progressive disclosure.

### Recommended AI coaching behavior

The assistant should:

- lead with the conclusion;
- explain whether action is necessary;
- show the portfolio rule involved;
- avoid presenting many alternatives unless asked;
- reinforce consistency over novelty;
- use reassuring but non-patronizing language.

Example coaching pattern:

```text
Nothing in your portfolio currently requires a change.
Your allocation remains within its intended ranges, and the market movement has
not altered the role of any component. Your next scheduled review is in October.
```

### Compatible portfolio archetypes

Usually compatible:

- Balanced Family Office
- Global Diversified
- Permanent Portfolio
- Income-Focused
- Liability-Driven Investing

Conditionally compatible:

- Growth + Alternatives, only with a tightly bounded sleeve and low-maintenance implementation
- Factor Tilt, only when implemented with simple, rules-based rebalancing

Usually incompatible:

- Tactical / Opportunistic
- any blueprint requiring frequent discretionary decisions

### Strengths

- consistency;
- low behavioral churn;
- ease of automation;
- lower cognitive load;
- clear adherence to long-term rules.

### Likely blind spots

- may ignore changes for too long without good alerts;
- may rely heavily on reassurance;
- may not understand why a simple system is sufficient;
- may defer decisions even when a genuine goal or life change occurs.

### Result-screen copy

**Headline:** Your investing style is Guided Autopilot.

**Summary:** You are most likely to stay consistent when your portfolio has a clear structure, runs mostly in the background, and asks for your attention only when a meaningful decision is required.

**What this means:** Your system should automate routine behavior, explain why a change is or is not needed, and avoid creating work merely to make the portfolio feel active.

**Watch-out:** A low-maintenance system still needs defined review points. AaronBux should help you notice genuine changes without turning normal market movement into an alert.

### Acceptance criteria

- The style is never assigned when the user explicitly selects high market attention and high discretionary decision frequency.
- The style can coexist with `validation_seeker` without changing the portfolio archetype.
- The result screen displays a low effort burden and exception-based monitoring.
- The UI does not imply that the user is inexperienced or unsophisticated.

---

## 4.2 Steady Steward

### Identity

- **ID:** `steady_steward`
- **Short label:** Steady Steward
- **One-line description:** A disciplined investor who prefers occasional review, clear portfolio roles, and limited changes.
- **Core user thought:** “I am comfortable checking in a few times a year and making small changes only when needed.”

### Best-fit user behavior

The user generally wants to:

- maintain a durable long-term structure;
- review periodically rather than continuously;
- understand portfolio roles;
- rebalance when allocation ranges or goals meaningfully change;
- keep complexity proportionate to its benefit;
- remain involved without becoming reactive.

### Typical source signals

Strong supporting signals:

- `long_term_consistency`
- `diversification_goal`
- `structured_reassessment`
- `goal_alignment_check`
- `periodic_review`
- `low_intervention`
- `stay_the_course`
- `capital_protection_goal`

Typical effort answer:

- “Check in a few times a year and make small changes only when needed.”

Typical stress answer:

- “Check whether my original plan still makes sense before touching anything.”

### Operating profile

| Dimension | Default |
|---|---|
| Effort budget | 1–2 hours per quarter |
| Review cadence | Quarterly light review; annual full review |
| Monitoring | Portfolio-level and goal-relevant signals |
| Research expectation | Low |
| Decision frequency | Occasional |
| Change threshold | Medium-high |
| Automation preference | Medium-high |
| Guidance level | Medium |
| Explanation depth | Medium |
| User authority | User approves allocation or goal changes |

### Recommended UI behavior

The experience should:

- show portfolio health by role, not daily price movement;
- provide a scheduled review checklist;
- surface drift only when material;
- connect decisions to goals and component roles;
- support calm comparison between current and proposed states;
- show the impact of a change before confirmation.

### Recommended AI coaching behavior

The assistant should:

- frame recommendations around goal alignment and portfolio roles;
- show whether the portfolio remains within acceptable ranges;
- distinguish maintenance from redesign;
- use periodic review language rather than urgency;
- explain trade-offs in a compact way.

### Compatible portfolio archetypes

Usually compatible:

- Balanced Family Office
- Global Diversified
- Income-Focused
- Inflation Hedge
- Liability-Driven Investing
- Permanent Portfolio

Conditionally compatible:

- Factor Tilt
- Risk Parity
- Growth + Alternatives with limited complexity

Usually incompatible:

- highly active Tactical / Opportunistic systems

### Strengths

- disciplined review behavior;
- ability to make limited changes without overreacting;
- good fit for goal-based planning;
- balance between automation and understanding.

### Likely blind spots

- may tolerate unnecessary complexity if each addition sounds individually reasonable;
- may postpone portfolio consolidation;
- may need clearer rules for when a small change becomes a redesign.

### Result-screen copy

**Headline:** Your investing style is Steady Steward.

**Summary:** You appear comfortable staying involved as long as the portfolio does not demand constant attention. You are likely to benefit from scheduled reviews, clear component roles, and rules that separate meaningful changes from normal market movement.

**What this means:** Your system should be durable enough to leave alone between reviews, but transparent enough that you can understand and approve important adjustments.

**Watch-out:** Occasional review can become piecemeal decision-making if the portfolio does not have an explicit structure. New investments should be added only when they fill a defined role.

### Acceptance criteria

- The style requires low or low-medium effort.
- The user must show some willingness to review goals or allocations periodically.
- The style must not be assigned solely because the user selected a conservative goal.
- The operating model includes scheduled review and defined change thresholds.

---

## 4.3 Systematic Improver

### Identity

- **ID:** `systematic_improver`
- **Short label:** Systematic Improver
- **One-line description:** A rules-oriented investor who wants to compare, refine, and improve the portfolio through a repeatable process.
- **Core user thought:** “I want to improve my returns using a clear, repeatable strategy.”

### Best-fit user behavior

The user generally wants to:

- understand why portfolios with similar holdings behave differently;
- compare allocations or strategies;
- rebalance using explicit rules;
- improve the portfolio without relying on headlines or instinct;
- devote moderate attention to research and review;
- evaluate changes before adopting them.

### Typical source signals

Strong supporting signals:

- `systematic_optimization`
- `repeatable_strategy_preference`
- `rules_based_rebalance`
- `systematic_return_goal`
- `strategy_comparison`
- `portfolio_construction_curiosity`
- `active_review`
- `research_interest`

Typical effort answers:

- “Review the allocation periodically and rebalance using clear rules.”
- “Compare funds, strategies, and portfolio approaches to look for improvements.”

Typical stress answer:

- “Rebalance if part of the portfolio moved outside its intended range.”

### Operating profile

| Dimension | Default |
|---|---|
| Effort budget | 1–3 hours per month |
| Review cadence | Monthly monitoring; quarterly decision review |
| Monitoring | Allocation, factor, cost, concentration, and rule-based signals |
| Research expectation | Medium |
| Decision frequency | Periodic |
| Change threshold | Rule-based |
| Automation preference | Medium |
| Guidance level | Medium |
| Explanation depth | High on methodology and trade-offs |
| User authority | User evaluates and approves strategic changes |

### Recommended UI behavior

The experience should:

- show current allocation against intended ranges;
- present evidence and trade-offs;
- support scenario comparison;
- show expected benefit, cost, and complexity of a change;
- preserve a decision journal;
- distinguish rule-driven rebalance from discretionary market action;
- allow deeper inspection without making it mandatory.

### Recommended AI coaching behavior

The assistant should:

- explain the rule or hypothesis behind each recommendation;
- compare current and proposed portfolio states;
- surface duplication, concentration, cost, and drift;
- avoid recommending changes based solely on recent performance;
- help the user define evaluation periods and exit criteria.

### Compatible portfolio archetypes

Usually compatible:

- Factor Tilt
- Risk Parity
- Global Diversified with systematic overlays
- Balanced Family Office with explicit sleeves and ranges

Conditionally compatible:

- Growth + Alternatives
- Permanent Portfolio
- Inflation Hedge

Compatible only with strong constraints:

- Tactical / Opportunistic, when decisions are governed by explicit rules rather than impulse

### Strengths

- process discipline;
- willingness to compare trade-offs;
- good fit for repeatable rules;
- ability to learn from portfolio evidence;
- lower dependence on narratives or social proof.

### Likely blind spots

- over-optimization;
- unnecessary strategy layering;
- reacting to short evaluation periods;
- treating measurable differences as automatically meaningful;
- spending more time than the expected benefit justifies.

### Result-screen copy

**Headline:** Your investing style is Systematic Improver.

**Summary:** You are most likely to trust a portfolio when its decisions follow a repeatable method. You want to understand what each component contributes, compare alternatives, and make changes only when the evidence and rules support them.

**What this means:** AaronBux should give you structured comparisons, clear allocation ranges, and a record of why each change was made—not a stream of ideas detached from your portfolio system.

**Watch-out:** A repeatable process can still become over-optimization. Every additional strategy should earn its place through a clear portfolio role and a meaningful expected benefit.

### Acceptance criteria

- The style requires medium research tolerance or rules-based review behavior.
- A Validation Seeker modifier may increase explanation depth but does not convert the style to Guided Autopilot.
- The style must produce rule-based monitoring and decision-journal behavior.
- The style must not be inferred from a growth goal alone.

---

## 4.4 Bounded Explorer

### Identity

- **ID:** `bounded_explorer`
- **Short label:** Bounded Explorer
- **One-line description:** A curious investor who wants a stable foundation plus controlled space to investigate selected opportunities.
- **Core user thought:** “I want a stable core and room to explore without turning the whole portfolio into a bet.”

### Best-fit user behavior

The user generally wants to:

- maintain a dependable long-term core;
- explore innovation, themes, real assets, alternatives, or selected stocks;
- limit exploratory decisions to a defined sleeve;
- research before committing;
- understand how a new idea changes the whole portfolio;
- preserve boundaries during excitement or market stress.

### Typical source signals

Strong supporting signals:

- `exploration_beyond_core`
- `bounded_growth_goal`
- `opportunity_sleeve`
- `innovation_interest`
- `alternative_return_interest`
- `research_interest`
- `controlled_growth`
- `active_opportunity_interest`

Typical effort answers:

- “Research before making changes, but I do not want investing to become a second job.”
- “Follow new ideas and use a limited part of the portfolio to explore them.”

### Operating profile

| Dimension | Default |
|---|---|
| Effort budget | 2–4 hours per month |
| Review cadence | Monthly opportunity review; quarterly portfolio review |
| Monitoring | Core health plus sleeve-specific signals |
| Research expectation | Medium-high |
| Decision frequency | Occasional to moderate |
| Change threshold | Moderate within sleeve; high for core |
| Automation preference | High for core, low-medium for exploratory sleeve |
| Guidance level | Medium |
| Explanation depth | High on portfolio impact and boundaries |
| User authority | User approves additions and removals within the sleeve |

### Recommended UI behavior

The experience should:

- visibly separate core and opportunity sleeves;
- show the sleeve budget before presenting ideas;
- explain overlap and portfolio impact;
- require a stated thesis or role for additions;
- show maximum exposure and concentration constraints;
- provide cooling-off or review prompts for large changes;
- prevent exploratory content from dominating the home screen.

### Recommended AI coaching behavior

The assistant should:

- ask what portfolio role an idea would fill;
- compare the idea with existing exposures;
- show the effect on concentration and risk;
- remind the user of sleeve boundaries;
- record entry rationale and review criteria;
- distinguish long-term allocation from short-term excitement.

### Compatible portfolio archetypes

Usually compatible:

- Growth + Alternatives
- Balanced Family Office with an opportunity sleeve
- Barbell
- Endowment Style
- Real Asset Preservation

Conditionally compatible:

- Global Diversified with a small satellite sleeve
- Factor Tilt plus a bounded thematic sleeve
- Tech / Innovation specialization
- Commodity-Heavy specialization

Usually incompatible:

- pure Tactical / Opportunistic unless high-effort and active decision signals are also present
- low-maintenance portfolios when the exploratory sleeve cannot be simplified

### Strengths

- curiosity within boundaries;
- ability to combine a stable core with differentiated exposures;
- openness to new return sources;
- willingness to research portfolio impact.

### Likely blind spots

- sleeve creep;
- narrative-driven additions;
- duplicated exposure through different wrappers;
- underestimating liquidity, cost, or complexity;
- treating every interesting idea as portfolio-relevant.

### Result-screen copy

**Headline:** Your investing style is Bounded Explorer.

**Summary:** You want more than a basic portfolio, but you also want a structure that prevents every new idea from reshaping your financial plan. You are likely to do best with a stable core and an explicitly limited space for selected opportunities.

**What this means:** AaronBux should help you evaluate ideas in the context of your full portfolio, preserve a clear sleeve budget, and make the trade-offs of each addition visible.

**Watch-out:** The main risk is not exploration itself—it is allowing individually reasonable ideas to accumulate into an unplanned portfolio.

### Acceptance criteria

- The user must show both exploration interest and willingness to maintain boundaries.
- A very-low-effort user cannot receive this style unless the opportunity component is extremely limited and passive.
- The style must display separate core and exploration operating rules.
- The style must not be assigned from one thematic holding alone.

---

## 4.5 Active Navigator

### Identity

- **ID:** `active_navigator`
- **Short label:** Active Navigator
- **One-line description:** A highly involved investor who wants a disciplined framework for making market-aware decisions.
- **Core user thought:** “I want to follow markets and act when conditions genuinely change.”

### Best-fit user behavior

The user generally wants to:

- follow markets closely;
- respond to valuation, catalysts, or regime changes;
- make discretionary decisions more frequently;
- maintain explicit risk limits;
- evaluate active decisions against a stable portfolio baseline;
- accept the time and behavioral burden of active management.

### Typical source signals

Strong supporting signals:

- `high_market_attention`
- `regime_change_intervention`
- `tactical_participation_goal`
- `active_opportunity_interest`
- `market_condition_decisions`
- `high_intervention`
- `opportunity_response`

Required supporting conditions:

- effort level `high`, or at minimum `medium_high` with strong active-decision evidence;
- no incompatible very-low-effort preference;
- no dominant preservation-shift stress response unless the active scope is tightly bounded.

### Operating profile

| Dimension | Default |
|---|---|
| Effort budget | 1–3 hours per week or more |
| Review cadence | Weekly; event-driven when defined triggers occur |
| Monitoring | Market, valuation, catalyst, risk, and portfolio exposure signals |
| Research expectation | High |
| Decision frequency | Moderate to frequent |
| Change threshold | Defined by strategy and risk limits |
| Automation preference | Low for discretionary decisions; high for guardrails and tracking |
| Guidance level | Low-medium; high on risk controls |
| Explanation depth | High |
| User authority | User makes active decisions within established constraints |

### Recommended UI behavior

The experience should:

- show the active decision budget and total portfolio exposure;
- separate long-term core from active positions;
- require decision thesis, trigger, sizing, and exit criteria;
- expose concentration and downside scenarios;
- track active decisions against the declared thesis;
- show whether the active process is adding value after costs;
- prevent market content from bypassing portfolio rules.

### Recommended AI coaching behavior

The assistant should:

- challenge the decision thesis;
- request a catalyst, time horizon, position size, and invalidation condition;
- compare the decision with doing nothing;
- check overlap with existing exposure;
- highlight downside and liquidity constraints;
- avoid presenting market commentary as a direct trade instruction.

### Compatible portfolio archetypes

Usually compatible:

- Tactical / Opportunistic
- Barbell with an actively managed risk sleeve
- Growth + Alternatives with explicit active mandates
- Commodity-Heavy when the user understands cyclical exposure

Conditionally compatible:

- Balanced Family Office with a strictly bounded active sleeve
- Factor Tilt with tactical overlays

Usually incompatible:

- portfolios designed to remain untouched when the user expects regular discretionary action

### Strengths

- willingness to engage deeply;
- responsiveness to changing conditions;
- ability to state and test an investment thesis;
- comfort with explicit risk management.

### Likely blind spots

- overtrading;
- recency and narrative bias;
- confusing activity with value creation;
- abandoning the process under stress;
- underestimating taxes, costs, and decision fatigue.

### Result-screen copy

**Headline:** Your investing style is Active Navigator.

**Summary:** You want an investing system that allows you to respond to changing conditions rather than follow a fully static plan. That can work only if active decisions remain inside explicit portfolio and risk boundaries.

**What this means:** AaronBux should help you define the thesis, size, trigger, and exit conditions for each active decision while protecting the long-term portfolio from uncontrolled drift.

**Watch-out:** The central risk is not simply taking more risk. It is allowing frequent decisions to replace a coherent portfolio process.

### Acceptance criteria

- The style requires high involvement and active-decision signals from more than one screen.
- It must be excluded when the effort answer is very low or low.
- It must not be assigned from a high TO score alone.
- The operating model must require decision logging, active-risk boundaries, and review criteria.

---

# 5. Investment Style resolution model

## 5.1 Inputs

The style resolver consumes:

```ts
type InvestmentStyleInputs = {
  effortProfile: {
    band: "very_low" | "low" | "low_medium" | "medium" | "medium_high" | "high";
    researchTolerance: "minimal" | "low" | "medium" | "high";
    marketAttention: "exception_only" | "periodic" | "regular" | "frequent";
    decisionFrequency: "rare" | "occasional" | "periodic" | "frequent";
    rulePreference: "high" | "medium" | "low";
  };
  stressProfile: {
    type: string;
    interventionTendency: "low" | "moderate" | "high" | "variable";
  };
  signals: string[];
  behavioralModifiers: string[];
  investorStage: string;
  portfolioJobs: string[];
};
```

## 5.2 Decision hierarchy

Resolve the style in this order:

1. **Effort ceiling** — what the user will realistically maintain.
2. **Decision mode** — automated, periodic, systematic, exploratory, or active.
3. **Stress behavior** — whether the user stays disciplined, seeks validation, preserves, or intervenes.
4. **Research tolerance** — how much evidence evaluation the user wants.
5. **Boundary preference** — whether opportunities must remain within a sleeve.
6. **Behavioral modifiers** — customize support but do not independently select the style.
7. **Investor stage** — adjust explanation and onboarding guidance, not the core operating burden.

## 5.3 Hard constraints

```text
Very-low effort → Guided Autopilot only
Low effort → Guided Autopilot or Steady Steward
Low-medium effort → Steady Steward or Systematic Improver
Medium effort → Systematic Improver or Bounded Explorer
Medium-high effort → Bounded Explorer; Active Navigator only with strong active signals
High effort → Active Navigator, Bounded Explorer, or Systematic Improver
```

Additional constraints:

- `active_navigator` requires at least two independent active-decision signals.
- `bounded_explorer` requires both exploration interest and a boundary signal.
- `systematic_improver` requires a rule, comparison, or repeatable-strategy signal.
- `guided_autopilot` may be selected for high-VS users only when effort is low; VS alone is insufficient.
- A preservation stress response may reduce active style eligibility but does not automatically imply Guided Autopilot.

## 5.4 Recommended scoring weights

Style should be resolved independently from portfolio-archetype scores.

| Input | Weight |
|---|---:|
| Effort screen | 40% |
| Stress behavior | 20% |
| Investing beliefs | 15% |
| Current setup | 10% |
| Current unresolved question | 10% |
| Portfolio job | 5% |

Time horizon does not directly score style. It constrains the portfolio blueprint and operating rules.

## 5.5 Style score example

```ts
const styleScores = {
  guided_autopilot: 0,
  steady_steward: 0,
  systematic_improver: 0,
  bounded_explorer: 0,
  active_navigator: 0
};
```

Example signal mapping:

```text
rules_based_attention
→ Guided Autopilot +3
→ Steady Steward +1

periodic_review
→ Steady Steward +3
→ Systematic Improver +1

systematic_optimization
→ Systematic Improver +4

bounded_growth_goal
→ Bounded Explorer +3

high_market_attention
→ Active Navigator +4
```

After scoring, apply the effort ceiling and hard constraints before selecting the highest eligible style.

---

# 6. Modifier overlays

Behavioral modifiers customize the style experience.

## 6.1 Validation Seeker overlay

Changes:

- increase explanation depth;
- compare recommendation with reasonable alternatives;
- confirm before meaningful changes;
- avoid ambiguous alerts;
- provide evidence that “no change” is an intentional outcome;
- use confidence-building language without overstating certainty.

Does not change:

- effort budget;
- portfolio allocation;
- portfolio archetype;
- review cadence unless uncertainty itself requires an additional guided check-in.

## 6.2 High exploration overlay

Changes:

- surface controlled research paths;
- show sleeve capacity;
- provide idea-to-portfolio impact analysis;
- require a role and thesis for additions.

Does not automatically change the style to Bounded Explorer if the user lacks effort capacity or boundaries.

## 6.3 High intervention overlay

Changes:

- increase friction before unscheduled changes;
- show previous decisions and stated rules;
- prompt for the reason the original plan no longer applies;
- require additional confirmation for core allocation changes.

## 6.4 Low-confidence overlay

Changes:

- simplify decision presentation;
- lead with the recommended path;
- clearly label optional detail;
- provide next-step guidance;
- avoid overwhelming the user with equivalent alternatives.

---

# 7. Investor-stage overlays

Investor Stage changes how the style is explained and activated.

## Starter

- explain basic portfolio roles;
- minimize technical language;
- prioritize one immediate setup action;
- show examples before configuration;
- avoid assuming existing operating habits.

## Emerging Strategist

- acknowledge the existing foundation;
- emphasize organization and decision rules;
- show how current holdings map to the target system;
- distinguish portfolio redesign from consolidation.

## Established

- emphasize optimization, gaps, and trade-offs;
- respect existing routines;
- show migration rather than replacement;
- provide more control over implementation.

## Advanced

- make assumptions and constraints explicit;
- support deeper analysis;
- allow user-defined rules and monitoring;
- retain portfolio-level guardrails.

---

# 8. Result object schema

```ts
type InvestmentStyleResult = {
  catalogVersion: "1.0.0";
  id:
    | "guided_autopilot"
    | "steady_steward"
    | "systematic_improver"
    | "bounded_explorer"
    | "active_navigator";
  name: string;
  summary: string;
  evidence: Array<{
    sourceQuestionId: string;
    sourceOptionId: string;
    signal: string;
    explanation: string;
  }>;
  operatingProfile: {
    effortBudget: string;
    reviewCadence: string;
    monitoringMode: string;
    researchExpectation: string;
    decisionFrequency: string;
    changeThreshold: string;
    automationPreference: string;
    guidanceLevel: string;
    explanationDepth: string;
  };
  strengths: string[];
  blindSpots: string[];
  behavioralOverlays: string[];
  stageOverlay: string;
  compatibleArchetypes: string[];
  constrainedArchetypes: string[];
  excludedArchetypes: string[];
  resultCopy: {
    headline: string;
    summary: string;
    whatThisMeans: string;
    watchOut: string;
  };
  confidence: "high" | "moderate" | "low";
};
```

---

# 9. UI requirements

## Investment Style reveal screen

Required sections:

1. Eyebrow: `YOUR INVESTMENT STYLE`
2. Style name
3. One-sentence summary
4. “How you prefer to invest” evidence cards
5. Effort and cadence panel
6. “What AaronBux should do for you”
7. One strength
8. One watch-out
9. Continue to Portfolio Archetype

### Evidence-card examples

```text
You prefer scheduled reviews over constant monitoring.
You want rules to determine when a change is necessary.
You are willing to research selected opportunities, but not manage the whole portfolio actively.
```

### Required interaction behavior

- Do not show a match percentage.
- Show no more than three primary evidence statements.
- Offer “How we reached this” as progressive disclosure.
- Allow the user to flag “This does not sound like me.”
- Flagging the result must not silently overwrite answers; it should open the relevant answers for review.

---

# 10. Analytics events

```text
investment_style_resolved
investment_style_viewed
investment_style_evidence_expanded
investment_style_disagreed
investment_style_answer_review_started
investment_style_answer_changed
investment_style_continued
```

Required properties:

```text
style_id
style_confidence
investor_stage
behavioral_modifiers
portfolio_candidate_leader
resolver_required
copy_version
style_catalog_version
```

---

# 11. QA scenarios

## Scenario A — Guided Autopilot with Validation Seeker

Inputs:

- simple retirement setup;
- “Am I doing this right?”;
- simple diversified belief;
- set up and check annually;
- seeks external confirmation during a decline.

Expected:

```text
Style: Guided Autopilot
Modifier: Validation Seeker
Guidance: High
Monitoring: Exception-based
```

## Scenario B — Steady Steward

Inputs:

- broad ETFs;
- unsure when to change;
- diversification belief;
- checks a few times a year;
- reassesses goals before acting.

Expected:

```text
Style: Steady Steward
Review: Periodic
Change threshold: Medium-high
```

## Scenario C — Systematic Improver

Inputs:

- regularly compares allocations;
- asks why portfolios perform differently;
- believes repeatable strategies can improve returns;
- reviews and rebalances with rules;
- rebalances during a decline.

Expected:

```text
Style: Systematic Improver
Research: Medium
Decision mode: Rule-based
```

## Scenario D — Bounded Explorer

Inputs:

- sectors, themes, or real estate already present;
- wants growth without gambling;
- prefers stable core plus selected opportunities;
- researches ideas without making investing a second job;
- looks for opportunities during declines.

Expected:

```text
Style: Bounded Explorer
Core rule: Stable
Opportunity sleeve: Bounded
```

## Scenario E — Active Navigator

Inputs:

- maintains an opportunity sleeve;
- believes declines can create actionable opportunities;
- follows markets closely;
- moves when the environment fundamentally changes;
- wants controlled tactical participation.

Expected:

```text
Style: Active Navigator
Effort: High
Decision logging: Required
```

## Scenario F — Active signals but low effort

Inputs:

- opportunity interest;
- annual check-in effort;
- stable wealth goal.

Expected:

```text
Style: Guided Autopilot or Steady Steward
Active Navigator: Excluded
Portfolio may include only a bounded, low-maintenance opportunity sleeve
```

---

# 12. Definition of done

The Investment Style Catalog is implementation-complete when:

- all five styles are represented in a machine-readable catalog;
- the resolver uses effort as the primary constraint;
- style scores are separate from portfolio-archetype scores;
- every style has UI copy, operating defaults, strengths, blind spots, and compatibility rules;
- behavioral and stage overlays are applied without changing allocation directly;
- the same answer set produces the same style for a fixed catalog version;
- QA fixtures cover all five styles and key contradiction paths;
- the result screen can be generated entirely from catalog data;
- analytics can measure resolution, disagreement, answer revision, and continuation.

---

# 13. Explicit out of scope

This catalog does not define:

- ETFs, stocks, funds, or specific securities;
- exact asset-allocation percentages;
- suitability or fiduciary determinations;
- expected returns;
- portfolio-archetype definitions;
- component-level blueprint roles;
- full operating-rule logic;
- tax, legal, or investment advice.

Those concerns belong to the Portfolio Archetype, Portfolio Blueprint, and Operating Rules catalogs.
