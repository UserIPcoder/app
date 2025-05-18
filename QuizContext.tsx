import React, { createContext, useContext, useReducer } from 'react';
import { QuizContextType, QuizState, Question } from '../types/quiz';
import { quizQuestions, shuffleQuestions } from '../data/quizData';

type QuizAction =
  | { type: 'SELECT_ANSWER'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESTART_QUIZ' }
  | { type: 'SET_DIFFICULTY'; payload: string };

const initialQuestions = shuffleQuestions(quizQuestions);

const initialState: QuizState = {
  questions: initialQuestions,
  currentQuestionIndex: 0,
  selectedAnswers: Array(initialQuestions.length).fill(null),
  showResults: false,
  isAnswerSelected: false,
  difficulty: null,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SELECT_ANSWER':
      if (state.currentQuestionIndex >= state.questions.length) {
        return state;
      }
      const newSelectedAnswers = [...state.selectedAnswers];
      newSelectedAnswers[state.currentQuestionIndex] = action.payload;
      return {
        ...state,
        selectedAnswers: newSelectedAnswers,
        isAnswerSelected: true,
      };
    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestionIndex + 1;
      const showResults = nextIndex >= state.questions.length;
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        showResults,
        isAnswerSelected: false,
      };
    case 'RESTART_QUIZ':
      const shuffledQuestions = shuffleQuestions(quizQuestions);
      return {
        ...initialState,
        questions: shuffledQuestions,
        selectedAnswers: Array(shuffledQuestions.length).fill(null),
      };
    case 'SET_DIFFICULTY':
      const filteredQuestions = quizQuestions.filter(q => q.difficulty === action.payload);
      if (filteredQuestions.length === 0) {
        return state;
      }
      const shuffledFilteredQuestions = shuffleQuestions(filteredQuestions);
      return {
        ...state,
        difficulty: action.payload,
        questions: shuffledFilteredQuestions,
        currentQuestionIndex: 0,
        selectedAnswers: Array(shuffledFilteredQuestions.length).fill(null),
        showResults: false,
        isAnswerSelected: false,
      };
    default:
      return state;
  }
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const selectAnswer = (answerIndex: number) => {
    if (state.currentQuestionIndex >= state.questions.length) return;
    dispatch({ type: 'SELECT_ANSWER', payload: answerIndex });
  };

  const goToNextQuestion = () => {
    if (state.currentQuestionIndex >= state.questions.length) return;
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const restartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  const setDifficulty = (difficulty: string) => {
    const filteredQuestions = quizQuestions.filter(q => q.difficulty === difficulty);
    if (filteredQuestions.length === 0) return;
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  const calculateScore = (): number => {
    if (state.questions.length === 0) return 0;
    return state.selectedAnswers.reduce((score: number, selected: number | null, index: number) => {
      if (selected === null || index >= state.questions.length) return score;
      return selected === state.questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const calculatePercentage = (): number => {
    if (state.questions.length === 0) return 0;
    const score = calculateScore();
    return Math.round((score / state.questions.length) * 100);
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        selectAnswer,
        goToNextQuestion,
        restartQuiz,
        calculateScore,
        calculatePercentage,
        setDifficulty,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};