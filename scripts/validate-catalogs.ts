import { archetypeCatalog, archetypeToBlueprint, blueprintCatalog, blueprintToRules, operatingRules } from '../src/config/catalogs';

const errors: string[] = [];
for (const archetypeId of Object.keys(archetypeCatalog)) {
  const blueprintId = archetypeToBlueprint[archetypeId as keyof typeof archetypeToBlueprint];
  if (!blueprintId) errors.push(`Missing blueprint for ${archetypeId}`);
  if (blueprintId && !blueprintCatalog[blueprintId]) errors.push(`Unknown blueprint ${blueprintId}`);
  const rulesId = blueprintId ? blueprintToRules[blueprintId] : undefined;
  if (!rulesId || !operatingRules[rulesId]) errors.push(`Missing operating rules for ${archetypeId}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('All AaronBux catalogs are valid.');
console.log('Specification version: 2.0.0');
