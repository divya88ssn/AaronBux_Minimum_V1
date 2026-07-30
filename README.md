# AaronBux Minimum V1

A GitHub-ready, configuration-driven React/Vite/TypeScript implementation of the AaronBux investor onboarding assessment.

## What is included

- Seven-question onboarding flow sourced from the existing AaronBux onboarding configuration
- Ordered multi-select behavior
- Deterministic TypeScript resolver
- Five Investor Stages
- Five Behavioral Modifiers
- Five Investment Styles
- Five Portfolio Archetypes
- Five Portfolio Blueprints
- Five Operating Rules profiles
- Deterministic result engine
- Browser `localStorage` persistence
- Developer resolution trace
- Vitest resolver tests
- V1 and V2 specification documents under `/docs/specifications`

## Important limitation

This repository is a minimum product implementation. The existing questionnaire contains legacy scoring codes such as `BFO`, `GD`, `FT`, `GA`, `TO`, `IP`, `ES`, and `VS`. The V1 resolver maps those codes into the five canonical V1 archetypes and related profile dimensions using transparent rules in `src/engine/resolver.ts`.

Those mappings are suitable for a functional beta but should be validated with product scenarios and user evidence before being treated as investment methodology.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Test and build

```bash
npm run validate:catalogs
npm test
npm run build
```

## GitHub upload

```bash
git init
git add .
git commit -m "Initial AaronBux minimum V1"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## Architecture

```text
src/config/quiz.ts
        ↓
src/engine/resolver.ts
        ↓
src/engine/result-engine.ts
        ↓
React components
        ↓
localStorage
```

Product logic is intentionally kept out of React components.

## Next recommended changes

1. Review the score-code-to-domain mapping in `src/engine/resolver.ts`.
2. Replace heuristic stage, modifier, and style rules with approved scenario fixtures.
3. Add analytics for start, answer, completion, result view, and next-step actions.
4. Add a backend only when cross-device persistence or user accounts are required.
5. Keep AI explanations optional and downstream of the deterministic result.

## Disclaimer

This prototype provides educational portfolio-structure guidance. It does not recommend specific securities, execute trades, or guarantee investment outcomes.
