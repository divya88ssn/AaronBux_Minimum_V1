import { useMemo, useState } from 'react';
import { quizQuestions } from '../config/quiz';
import type { QuizAnswers } from '../domain/types';

type Props = {
  initialAnswers: QuizAnswers;
  onComplete: (answers: QuizAnswers) => void;
  onChange: (answers: QuizAnswers) => void;
};

export function Quiz({ initialAnswers, onComplete, onChange }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [error, setError] = useState('');
  const question = quizQuestions[step];
  const selected = answers[question.id] ?? [];
  const progress = Math.round(((step + 1) / quizQuestions.length) * 100);

  const canContinue = useMemo(
    () => selected.length >= question.minimumSelections && selected.length <= question.maximumSelections,
    [question, selected]
  );

  function toggle(optionId: string) {
    let next: string[];
    if (selected.includes(optionId)) {
      next = selected.filter((id) => id !== optionId);
    } else if (question.selectionMode === 'single') {
      next = [optionId];
    } else if (selected.length < question.maximumSelections) {
      next = [...selected, optionId];
    } else {
      next = [...selected.slice(1), optionId];
    }
    const updated = { ...answers, [question.id]: next };
    setAnswers(updated);
    onChange(updated);
    setError('');
  }

  function next() {
    if (!canContinue) {
      setError(`Select between ${question.minimumSelections} and ${question.maximumSelections} options.`);
      return;
    }
    if (step === quizQuestions.length - 1) onComplete(answers);
    else setStep((current) => current + 1);
  }

  return (
    <main className="shell">
      <section className="card quiz-card">
        <div className="progress-meta"><span>Question {step + 1} of {quizQuestions.length}</span><span>{progress}%</span></div>
        <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        <p className="eyebrow">{question.title}</p>
        <h1>{question.question}</h1>
        {question.helperText && <p className="helper">{question.helperText}</p>}
        <div className="options" role="group" aria-label={question.question}>
          {question.options.map((option) => {
            const active = selected.includes(option.id);
            const rank = selected.indexOf(option.id) + 1;
            return (
              <button
                type="button"
                className={`option ${active ? 'active' : ''}`}
                aria-pressed={active}
                key={option.id}
                onClick={() => toggle(option.id)}
              >
                {active && question.maximumSelections > 1 && <span className="rank">{rank}</span>}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="actions">
          <button type="button" className="secondary" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</button>
          <button type="button" className="primary" onClick={next}>{step === quizQuestions.length - 1 ? 'See my profile' : 'Continue'}</button>
        </div>
      </section>
    </main>
  );
}
