import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { resolveAssessment } from './engine/resolver';
import type { InvestorAssessment, QuizAnswers } from './domain/types';
import { clearAssessment, loadAnswers, loadAssessment, saveAnswers, saveAssessment } from './storage/assessment-storage';

export default function App() {
  const [assessment, setAssessment] = useState<InvestorAssessment | null>(() => loadAssessment());
  const [answers, setAnswers] = useState<QuizAnswers>(() => loadAnswers());

  function complete(nextAnswers: QuizAnswers) {
    const result = resolveAssessment(nextAnswers);
    saveAssessment(result);
    setAssessment(result);
  }

  function restart() {
    clearAssessment();
    setAnswers({});
    setAssessment(null);
  }

  return assessment
    ? <Results assessment={assessment} onRestart={restart} />
    : <Quiz initialAnswers={answers} onChange={(next) => { setAnswers(next); saveAnswers(next); }} onComplete={complete} />;
}
