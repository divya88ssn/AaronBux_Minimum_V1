import { buildResultViewModel } from '../engine/result-engine';
import type { InvestorAssessment } from '../domain/types';

type Props = { assessment: InvestorAssessment; onRestart: () => void };

export function Results({ assessment, onRestart }: Props) {
  const result = buildResultViewModel(assessment);
  const sections = [result.stage, result.modifier, result.style, result.archetype];

  return (
    <main className="shell result-shell">
      <section className="hero card">
        <p className="eyebrow">Your AaronBux profile</p>
        <h1>{result.headline}</h1>
        <p className="hero-copy">{result.summary}</p>
        <div className="confidence"><strong>{assessment.confidence.score}% confidence</strong><span>{result.confidenceMessage}</span></div>
      </section>

      <section className="grid">
        {sections.map((section) => (
          <article className="card section-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
            <h3>Strengths</h3>
            <ul>{section.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Watch for</h3>
            <ul>{section.watchouts.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="card section-card">
        <p className="eyebrow">Portfolio blueprint</p>
        <h2>{result.blueprint.title}</h2>
        <p>{result.blueprint.summary}</p>
        <div className="component-list">{result.blueprint.components.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="card section-card">
        <p className="eyebrow">Operating rules</p>
        <h2>How to manage this profile over time</h2>
        <ol>{result.operatingRules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
      </section>

      <section className="card next-step">
        <h2>Recommended next step</h2>
        <p>{result.nextStep}</p>
        <button className="primary" type="button" onClick={onRestart}>Retake assessment</button>
      </section>

      <details className="debug">
        <summary>Developer resolution trace</summary>
        <pre>{JSON.stringify(assessment.trace, null, 2)}</pre>
      </details>
    </main>
  );
}
