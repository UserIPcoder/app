import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import LevelSelector from './LevelSelector';
import TimeDisplay from './TimeDisplay';

const Quiz: React.FC = () => {
  const { state, selectAnswer, goToNextQuestion, restartQuiz, calculateScore, calculatePercentage, setDifficulty } = useQuiz();
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    if (state.difficulty && !state.showResults) {
      setIsQuizActive(true);
    } else {
      setIsQuizActive(false);
    }
  }, [state.difficulty, state.showResults]);

  const handleTimeUp = () => {
    setShowTimeUpModal(true);
    setIsQuizActive(false);
  };

  const handleCloseModal = () => {
    setShowTimeUpModal(false);
    setIsQuizActive(false);
    restartQuiz();
  };

  if (!state.difficulty) {
    return <LevelSelector onLevelSelect={setDifficulty} />;
  }

  if (state.showResults) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-xl p-8 max-w-md mx-auto text-center border border-purple-500/20">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">Quiz Results</h2>
        <p className="text-lg text-gray-300 mb-2">
          Your score: {calculateScore()} out of {state.questions.length}
        </p>
        <p className="text-lg text-gray-300 mb-6">
          Percentage: {calculatePercentage()}%
        </p>
        <button
          onClick={restartQuiz}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const hasSelectedAnswer = state.selectedAnswers[state.currentQuestionIndex] !== null;
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-xl p-8 border border-purple-500/20">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">
            Question {state.currentQuestionIndex + 1} of {state.questions.length}
          </h2>
          <p className="text-gray-300">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(index)}
              disabled={hasSelectedAnswer || showTimeUpModal}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                ${
                  hasSelectedAnswer
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-900/50 text-green-100'
                      : state.selectedAnswers[state.currentQuestionIndex] === index
                      ? 'border-red-500 bg-red-900/50 text-red-100'
                      : 'border-gray-700 text-gray-400'
                    : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:bg-purple-900/20'
                }
                ${(hasSelectedAnswer || showTimeUpModal) ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {hasSelectedAnswer && !showTimeUpModal && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={goToNextQuestion}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isLastQuestion ? 'Finish' : 'Next Question'}
            </button>
          </div>
        )}
      </div>

      <div className="fixed top-4 right-4 z-50">
        <TimeDisplay onTimeUp={handleTimeUp} isQuizActive={isQuizActive} />
      </div>

      {showTimeUpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-lg p-8 max-w-md mx-4 text-center border border-purple-500/20">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Time's Up!</h2>
            <p className="text-gray-300 mb-6">
              You didn't complete the quiz in time. Your score: {calculateScore()} out of {state.questions.length}
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;