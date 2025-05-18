export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  showResults: boolean;
  isAnswerSelected: boolean;
  difficulty: string | null;
}

export interface QuizContextType {
  state: QuizState;
  selectAnswer: (answerIndex: number) => void;
  goToNextQuestion: () => void;
  restartQuiz: () => void;
  calculateScore: () => number;
  calculatePercentage: () => number;
  setDifficulty: (difficulty: string) => void;
}