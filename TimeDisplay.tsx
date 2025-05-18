import React, { useState, useEffect, useRef } from 'react';

interface TimeDisplayProps {
  onTimeUp: () => void;
  isQuizActive: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ onTimeUp, isQuizActive }) => {
  const [timer, setTimer] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isQuizActive) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isQuizActive]);

  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, timer, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (customTime) {
      const time = parseInt(customTime);
      if (time >= 1 && time <= 3600) {
        setTimer(time);
        setCustomTime('');
      }
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(30);
    setCustomTime('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20 shadow-lg">
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-300 mb-2 font-mono">
          {formatTime(timer)}
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Custom time (seconds)"
            className="w-32 px-2 py-1 bg-gray-700/50 border border-purple-500/20 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500"
            min="1"
            max="3600"
            disabled={isRunning}
          />
          <button
            onClick={handleStart}
            disabled={isRunning || !isQuizActive}
            className={`px-3 py-1 rounded ${
              isRunning || !isQuizActive
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
          >
            Start
          </button>
          <button
            onClick={handleReset}
            disabled={!isRunning}
            className={`px-3 py-1 rounded ${
              !isRunning
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            } transition-colors`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay; 