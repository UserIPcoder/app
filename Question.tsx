import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import AnswerOption from './AnswerOption';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const Question: React.FC = () => {
  const { state, selectAnswer, goToNextQuestion } = useQuiz();
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const { currentQuestionIndex, questions, selectedAnswers, isAnswerSelected } = state;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  
  useEffect(() => {
    if (isAnswerSelected) {
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
    }
  }, [isAnswerSelected]);

  const handleSelectAnswer = (answerIndex: number) => {
    if (!isAnswerSelected) {
      selectAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowFeedback(false);
      goToNextQuestion();
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div className={`transition-all duration-500 ease-out ${isFlipping ? 'animate-pageFlip' : 'animate-fadeIn'}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.text}</h2>
      
      <div className="mb-6 relative">
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="relative">
            <AnswerOption
              text={option}
              index={index}
              selected={selectedAnswer === index}
              correct={showFeedback ? index === currentQuestion.correctAnswer : null}
              disabled={isAnswerSelected && selectedAnswer !== index}
              onSelect={() => handleSelectAnswer(index)}
            />
            {showFeedback && index === currentQuestion.correctAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Correct Answer</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`p-6 rounded-lg mb-6 flex items-start ${
          selectedAnswer === currentQuestion.correctAnswer
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
            : 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200'
        }`}>
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
          )}
          <div>
            <h3 className={`font-semibold mb-1 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'text-green-800'
                : 'text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? 'Excellent!'
                : 'Not quite right'}
            </h3>
            <p className={`text-sm ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'text-green-700'
                : 'text-red-700'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? 'You got it right! Keep up the good work!'
                : `The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={!isAnswerSelected}
          className={`
            px-6 py-3 font-medium rounded-lg flex items-center
            transition-all duration-300 ease-out transform
            ${
              isAnswerSelected
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Next Question
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Question;