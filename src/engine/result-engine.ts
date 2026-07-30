import {
  archetypeCatalog,
  blueprintCatalog,
  modifierCatalog,
  operatingRules,
  stageCatalog,
  styleCatalog
} from '../config/catalogs';
import type { InvestorAssessment, ResultViewModel } from '../domain/types';

export function buildResultViewModel(assessment: InvestorAssessment): ResultViewModel {
  const archetype = archetypeCatalog[assessment.portfolioArchetypeId];
  const style = styleCatalog[assessment.investmentStyleId];
  const blueprint = blueprintCatalog[assessment.portfolioBlueprintId];

  return {
    headline: `${archetype.title} with a ${style.title} operating style`,
    summary: `${archetype.summary} ${style.summary}`,
    confidenceMessage:
      assessment.confidence.band === 'high'
        ? 'Your answers consistently point toward this profile.'
        : assessment.confidence.band === 'medium'
          ? 'Most of your answers align with this profile.'
          : 'Your answers reflect multiple preferences. Treat this as a starting point that can evolve.',
    stage: stageCatalog[assessment.investorStageId],
    modifier: modifierCatalog[assessment.primaryModifierId],
    style,
    archetype,
    blueprint,
    operatingRules: operatingRules[assessment.operatingRulesProfileId],
    nextStep: 'Review whether the blueprint roles match what you need your portfolio to do before considering specific investments.'
  };
}
