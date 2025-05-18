import React from 'react';

interface LevelSelectorProps {
  onLevelSelect: (level: string) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onLevelSelect }) => {
  const levels = [
    { id: 'easy', label: 'Easy', description: 'Basic questions for beginners' },
    { id: 'medium', label: 'Medium', description: 'Moderate difficulty questions' },
    { id: 'hard', label: 'Hard', description: 'Challenging questions for experts' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Difficulty Level</h2>
      <div className="space-y-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelSelect(level.id)}
            className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 
                     transition-all duration-200 hover:shadow-md group"
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                {level.label}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                {level.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector; 