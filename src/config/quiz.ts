import source from './source-onboarding-config.json';
import type { QuizQuestion, ScoreCode } from '../domain/types';

type SourceOption = {
  id: string;
  label: string;
  scores?: Partial<Record<ScoreCode, number>>;
  signals?: string[];
};

type SourceQuestion = {
  id: string;
  step: number;
  title: string;
  question: string;
  helperText?: string;
  selectionMode: 'single' | 'ordered_multi';
  minimumSelections?: number;
  maximumSelections?: number;
  options: SourceOption[];
};

export const quizQuestions: QuizQuestion[] = (source.questions as SourceQuestion[]).map((question) => ({
  id: question.id,
  step: question.step,
  title: question.title,
  question: question.question,
  helperText: question.helperText,
  selectionMode: question.selectionMode,
  minimumSelections: question.minimumSelections ?? 1,
  maximumSelections: question.maximumSelections ?? 1,
  options: question.options.map((option) => ({
    id: option.id,
    label: option.label,
    scores: option.scores ?? {},
    signals: option.signals ?? []
  }))
}));

export const QUIZ_VERSION = '1.0.0' as const;
