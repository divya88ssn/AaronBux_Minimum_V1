import type {
  BehavioralModifierId,
  InvestmentStyleId,
  InvestorStageId,
  PortfolioArchetypeId,
  PortfolioBlueprintId,
  ResultSection
} from '../domain/types';

export const archetypeToBlueprint: Record<PortfolioArchetypeId, PortfolioBlueprintId> = {
  balanced_family_office: 'balanced_core',
  growth_diversifier: 'growth_core',
  focused_compounder: 'focused_growth',
  tactical_opportunist: 'core_satellite',
  income_preserver: 'income_core'
};

export const blueprintToRules: Record<PortfolioBlueprintId, string> = {
  balanced_core: 'balanced_family_office_default',
  growth_core: 'growth_diversifier_default',
  focused_growth: 'focused_compounder_default',
  core_satellite: 'tactical_opportunist_default',
  income_core: 'income_preserver_default'
};

export const stageCatalog: Record<InvestorStageId, ResultSection> = {
  foundation_builder: {
    title: 'Foundation Builder',
    summary: 'You are building the habits and structure that make investing repeatable.',
    strengths: ['Willingness to learn', 'Long-term orientation'],
    watchouts: ['Too many choices at once', 'Changing direction before a foundation is established']
  },
  portfolio_organizer: {
    title: 'Portfolio Organizer',
    summary: 'You already own investments and now need a clearer structure across them.',
    strengths: ['Existing investing momentum', 'Readiness to simplify'],
    watchouts: ['Overlapping holdings', 'Owning assets without a defined role']
  },
  system_builder: {
    title: 'System Builder',
    summary: 'You are ready to manage investing through repeatable rules rather than isolated choices.',
    strengths: ['Process orientation', 'Consistency'],
    watchouts: ['Overengineering the system', 'Reviewing more frequently than the strategy requires']
  },
  intentional_optimizer: {
    title: 'Intentional Optimizer',
    summary: 'You have a functioning portfolio and want to improve it deliberately.',
    strengths: ['Comparative thinking', 'Clear improvement mindset'],
    watchouts: ['Optimizing small details', 'Mistaking activity for progress']
  },
  adaptive_investor: {
    title: 'Adaptive Investor',
    summary: 'You can work with a structured portfolio while adapting to changing needs and conditions.',
    strengths: ['Strategic flexibility', 'High decision ownership'],
    watchouts: ['Unnecessary complexity', 'Making changes without explicit thresholds']
  }
};

export const modifierCatalog: Record<BehavioralModifierId, ResultSection> = {
  validation_seeker: {
    title: 'Validation Seeker',
    summary: 'You often want confirmation that your current direction is sound before acting.',
    strengths: ['Thoughtful decisions', 'Awareness of uncertainty'],
    watchouts: ['Delaying action while seeking certainty', 'Overweighting outside opinions']
  },
  opportunity_chaser: {
    title: 'Opportunity Chaser',
    summary: 'You notice new possibilities quickly and enjoy evaluating what could outperform.',
    strengths: ['Curiosity', 'Ability to spot emerging ideas'],
    watchouts: ['Letting opportunities displace the core', 'Adding positions without exit rules']
  },
  instruction_seeker: {
    title: 'Instruction Seeker',
    summary: 'You prefer clear guidance and an understandable next step.',
    strengths: ['Receptiveness to structure', 'Execution once direction is clear'],
    watchouts: ['Depending on instructions rather than building personal rules', 'Following advice without checking fit']
  },
  confidence_builder: {
    title: 'Confidence Builder',
    summary: 'You are developing comfort with decisions through practice and visible reasoning.',
    strengths: ['Learning orientation', 'Healthy caution'],
    watchouts: ['Interpreting uncertainty as failure', 'Avoiding decisions that would build experience']
  },
  optimization_mindset: {
    title: 'Optimization Mindset',
    summary: 'You naturally look for ways to improve allocations, rules, and portfolio efficiency.',
    strengths: ['Analytical discipline', 'Continuous improvement'],
    watchouts: ['Frequent tinkering', 'Optimizing before defining the portfolio job']
  }
};

export const styleCatalog: Record<InvestmentStyleId, ResultSection> = {
  guided_autopilot: {
    title: 'Guided Autopilot',
    summary: 'You prefer a portfolio that can operate with limited ongoing decisions.',
    strengths: ['Low maintenance', 'Consistency'],
    watchouts: ['Ignoring meaningful life changes', 'Confusing simplicity with lack of oversight']
  },
  steady_steward: {
    title: 'Steady Steward',
    summary: 'You prefer periodic oversight without constant intervention.',
    strengths: ['Patience', 'Balanced involvement'],
    watchouts: ['Reviewing only after market stress', 'Leaving unclear holdings untouched']
  },
  systematic_improver: {
    title: 'Systematic Improver',
    summary: 'You prefer explicit rules, scheduled reviews, and measured changes.',
    strengths: ['Repeatability', 'Evidence-based improvement'],
    watchouts: ['Excessive optimization', 'Adding rules that do not improve decisions']
  },
  bounded_explorer: {
    title: 'Bounded Explorer',
    summary: 'You want room to explore while protecting the long-term portfolio core.',
    strengths: ['Curiosity with guardrails', 'Clear separation of core and experiments'],
    watchouts: ['Expanding the opportunity sleeve', 'Moving ideas into the core without evidence']
  },
  active_navigator: {
    title: 'Active Navigator',
    summary: 'You prefer hands-on research and active decision ownership.',
    strengths: ['High engagement', 'Ability to act on a thesis'],
    watchouts: ['Decision fatigue', 'Taking action without predefined review criteria']
  }
};

export const archetypeCatalog: Record<PortfolioArchetypeId, ResultSection> = {
  balanced_family_office: {
    title: 'Balanced Family Office',
    summary: 'A multi-purpose portfolio balancing growth, stability, liquidity, and selected opportunities.',
    strengths: ['Broad role coverage', 'Resilience across different needs'],
    watchouts: ['Too many components', 'Unclear boundaries between sleeves']
  },
  growth_diversifier: {
    title: 'Growth Diversifier',
    summary: 'A long-term growth portfolio built around broad diversification.',
    strengths: ['Wide market participation', 'Simple growth logic'],
    watchouts: ['Performance comparison during concentrated rallies', 'Adding unnecessary themes']
  },
  focused_compounder: {
    title: 'Focused Compounder',
    summary: 'A concentrated growth philosophy emphasizing conviction and long holding periods.',
    strengths: ['Clarity of thesis', 'Potential for deep understanding'],
    watchouts: ['Concentration risk', 'Confusing conviction with inflexibility']
  },
  tactical_opportunist: {
    title: 'Tactical Opportunist',
    summary: 'A stable core paired with a controlled sleeve for active opportunities.',
    strengths: ['Room for active ideas', 'Protection of the long-term core'],
    watchouts: ['Opportunity sleeve expansion', 'Inconsistent entry and exit rules']
  },
  income_preserver: {
    title: 'Income Preserver',
    summary: 'A portfolio centered on dependable income, stability, and capital preservation.',
    strengths: ['Clear cash-flow purpose', 'Risk-aware construction'],
    watchouts: ['Underestimating inflation', 'Reaching for yield']
  }
};

export const blueprintCatalog: Record<PortfolioBlueprintId, { title: string; summary: string; components: string[] }> = {
  balanced_core: {
    title: 'Balanced Core Blueprint',
    summary: 'Combines a growth engine with stability, liquidity, and a limited opportunity sleeve.',
    components: ['Core Growth', 'Global Diversification', 'Stability', 'Liquidity Reserve', 'Optional Opportunity Sleeve']
  },
  growth_core: {
    title: 'Growth Core Blueprint',
    summary: 'Prioritizes broad long-term growth while retaining enough stability to stay invested.',
    components: ['Core Growth', 'Global Diversification', 'Stability']
  },
  focused_growth: {
    title: 'Focused Growth Blueprint',
    summary: 'Uses a diversified foundation with a more concentrated conviction layer.',
    components: ['Core Growth', 'Focused Conviction Sleeve', 'Liquidity Reserve']
  },
  core_satellite: {
    title: 'Core-Satellite Blueprint',
    summary: 'Separates the durable portfolio core from a bounded active opportunity sleeve.',
    components: ['Core Growth', 'Global Diversification', 'Opportunity Sleeve', 'Liquidity Reserve']
  },
  income_core: {
    title: 'Income Core Blueprint',
    summary: 'Organizes the portfolio around income, stability, liquidity, and inflation awareness.',
    components: ['Income', 'Stability', 'Liquidity Reserve', 'Inflation Protection']
  }
};

export const operatingRules: Record<string, string[]> = {
  balanced_family_office_default: [
    'Contribute on a consistent schedule.',
    'Review the complete portfolio annually.',
    'Rebalance only when allocations move outside predefined ranges.',
    'Keep opportunity positions separate from the core.'
  ],
  growth_diversifier_default: [
    'Automate contributions where possible.',
    'Review the portfolio every six months.',
    'Rebalance using new contributions before selling.',
    'Avoid adding holdings that duplicate the same role.'
  ],
  focused_compounder_default: [
    'Document the thesis for every focused holding.',
    'Review the portfolio quarterly.',
    'Define conditions that would invalidate each thesis.',
    'Maintain a liquidity reserve to avoid forced decisions.'
  ],
  tactical_opportunist_default: [
    'Keep the long-term core separate from opportunity capital.',
    'Review opportunities monthly and the full portfolio quarterly.',
    'Set a maximum opportunity-sleeve size.',
    'Record entry, review, and exit conditions before acting.'
  ],
  income_preserver_default: [
    'Match expected income needs to portfolio cash flows.',
    'Review income quarterly and allocation annually.',
    'Avoid increasing risk solely to raise yield.',
    'Maintain liquidity for known near-term expenses.'
  ]
};
