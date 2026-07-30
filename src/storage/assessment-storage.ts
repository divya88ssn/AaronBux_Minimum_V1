import type { InvestorAssessment, QuizAnswers } from '../domain/types';

const ANSWERS_KEY = 'aaronbux.quiz.answers.v1';
const ASSESSMENT_KEY = 'aaronbux.assessment.v1';

export function saveAnswers(answers: QuizAnswers) {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadAnswers(): QuizAnswers {
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? '{}') as QuizAnswers;
  } catch {
    return {};
  }
}

export function saveAssessment(assessment: InvestorAssessment) {
  localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(assessment));
}

export function loadAssessment(): InvestorAssessment | null {
  try {
    const value = localStorage.getItem(ASSESSMENT_KEY);
    return value ? JSON.parse(value) as InvestorAssessment : null;
  } catch {
    return null;
  }
}

export function clearAssessment() {
  localStorage.removeItem(ANSWERS_KEY);
  localStorage.removeItem(ASSESSMENT_KEY);
}
