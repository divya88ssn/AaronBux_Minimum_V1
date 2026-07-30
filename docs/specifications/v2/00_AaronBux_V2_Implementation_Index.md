# AaronBux V2 Implementation Specification Index

## Relationship to V1

The eight V1 catalogs remain the canonical business-definition layer:

1. Investment Style Catalog
2. Investor Stage Catalog
3. Behavioral Modifier Catalog
4. Portfolio Archetype Catalog
5. Portfolio Blueprint Catalog
6. Operating Rules Catalog
7. Resolver Catalog
8. Explanation Catalog

The V2 artifacts translate that product truth into implementation contracts:

9. Canonical Domain Model
10. Rule Engine Specification
11. UI and Design-System Contract
12. API and Persistence Specification
13. Analytics and Experimentation Specification
14. Acceptance-Test Specification

## Generation Map

| Final App Deliverable | V1 Source | V2 Contract |
|---|---|---|
| React/Vite frontend | All catalogs | UI and Design-System Contract |
| Quiz configuration JSON | Resolver + domain catalogs | Domain Model + Rule Engine |
| Result engine | Resolver + Explanation | Rule Engine + UI Contract |
| Resolver engine | Resolver Catalog | Rule Engine Specification |
| AI prompts | Explanation + profile catalogs | Domain Model + API Contract |
| API models | All entity catalogs | API and Persistence Specification |
| Database schema | Resolver outputs | Domain Model + Persistence |
| Design-system copy | Explanation Catalog | UI Contract |
| Acceptance tests | All catalog rules | Acceptance-Test Specification |
| Product analytics | Quiz and result flow | Analytics Specification |

## Recommended Code Generation Order

1. Generate shared TypeScript IDs and interfaces from Artifact 09.
2. Generate catalog JSON and quiz configuration from Artifacts 09 and 10.
3. Implement and test the deterministic resolver from Artifact 10.
4. Build result view models and React components from Artifact 11.
5. Implement API routes and database migrations from Artifact 12.
6. Add analytics events and experiment assignments from Artifact 13.
7. Implement the test suite from Artifact 14.
8. Add AI-enhanced explanations only after deterministic results work.

## Non-Negotiable Architecture Rule

Product behavior must live in versioned configuration, domain services, or resolver policies.

It must not exist only in:
- React components
- database triggers
- API controllers
- analytics code
- LLM prompts

## Package Contents

- 00_AaronBux_V2_Implementation_Index.md
- 09_Canonical_Domain_Model_v2.md
- 09_Canonical_Domain_Model_v2.json
- 10_Rule_Engine_Specification_v2.md
- 10_Rule_Engine_Specification_v2.json
- 11_UI_Design_System_Contract_v2.md
- 11_UI_Design_System_Contract_v2.json
- 12_API_Persistence_Specification_v2.md
- 12_API_Persistence_Specification_v2.json
- 13_Analytics_Experimentation_Specification_v2.md
- 13_Analytics_Experimentation_Specification_v2.json
- 14_Acceptance_Test_Specification_v2.md
- 14_Acceptance_Test_Specification_v2.json
