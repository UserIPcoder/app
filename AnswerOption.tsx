import React from 'react';

interface AnswerOptionProps {
  text: string;
  index: number;
  selected: boolean;
  correct: boolean | null;
  disabled: boolean;
  onSelect: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  text,
  index,
  selected,
  correct,
  disabled,
  onSelect,
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  let optionClass = 'flex items-center p-4 mb-3 border rounded-xl transition-all duration-300 cursor-pointer relative';
  
  if (!selected && !disabled) {
    optionClass += ' border-gray-200 hover:border-orange-400 hover:bg-orange-50';
  } else if (selected && correct === null) {
    optionClass += ' border-orange-500 bg-orange-50';
  } else if (selected && correct === true) {
    optionClass += ' border-green-500 bg-green-50';
  } else if (selected && correct === false) {
    optionClass += ' border-red-500 bg-red-50';
  } else if (disabled) {
    optionClass += ' border-gray-200 opacity-70';
  }

  if (correct === true && !selected) {
    optionClass += ' border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50';
  }

  return (
    <div className={optionClass} onClick={!disabled ? onSelect : undefined}>
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 font-medium">
        {letters[index]}
      </div>
      <span className="text-gray-800">{text}</span>
    </div>
  );
};

export default AnswerOption;