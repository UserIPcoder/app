import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { RotateCcw, Trophy, XCircle, CheckCircle, Frown, Smile, PartyPopper } from 'lucide-react';

const Results: React.FC = () => {
  const { state, calculateScore, calculatePercentage, restartQuiz } = useQuiz();
  const score = calculateScore();
  const percentage = calculatePercentage();
  const { questions, selectedAnswers } = state;
  
  const getResultMessage = () => {
    if (percentage >= 80) {
      return {
        title: "Excellent!",
        message: "You're a quiz master! Fantastic job on this quiz!",
        icon: <PartyPopper className="h-12 w-12 text-yellow-500" />,
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Job!",
        message: "You have a solid understanding of the material.",
        icon: <Smile className="h-12 w-12 text-green-500" />,
      };
    } else {
      return {
        title: "Keep Practicing",
        message: "Don't worry, you can try again to improve your score.",
        icon: <Frown className="h-12 w-12 text-blue-500" />,
      };
    }
  };

  const resultData = getResultMessage();
  const circumference = 2 * Math.PI * 40; // 2πr where r=40

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">{resultData.icon}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{resultData.title}</h2>
        <p className="text-gray-600 mb-4">{resultData.message}</p>
        
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-blue-500 transform -rotate-90 origin-center transition-all duration-1000 ease-out" 
                strokeWidth="8" 
                strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{score}/{questions.length}</div>
                <div className="text-sm text-gray-500">{percentage}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Score Breakdown
        </h3>
        
        <div className="space-y-4">
          {questions.map((question, index) => {
            const selectedAnswer = selectedAnswers[index];
            const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correctAnswer;
            const hasAnswered = selectedAnswer !== undefined;
            
            return (
              <div key={index} className="flex items-start">
                {hasAnswered ? (
                  isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  )
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{question.question}</p>
                  <p className="text-sm text-gray-500">
                    {hasAnswered && typeof selectedAnswer === 'number' ? (
                      <>
                        Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {question.options[selectedAnswer]}
                        </span>
                        {!isCorrect && (
                          <span className="text-green-600 ml-1">
                            (Correct: {question.options[question.correctAnswer]})
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400">Not answered</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={restartQuiz}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg flex items-center transition-all duration-300 ease-out transform hover:bg-blue-600 hover:scale-105"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;