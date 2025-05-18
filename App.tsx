import React from 'react';
import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic stars background */}
      <div className="fixed inset-0">
        {/* Small stars */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        
        {/* Twinkling stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Moon with glow effect */}
      <div className="absolute top-8 right-8 w-40 h-40">
        <div className="absolute inset-0 bg-yellow-200 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-yellow-100 rounded-full mix-blend-screen filter blur-2xl opacity-20"></div>
        <div className="absolute inset-0 bg-yellow-300 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Shooting stars */}
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-shooting-star"></div>
      <div className="absolute top-0 left-3/4 w-1 h-1 bg-white rounded-full animate-shooting-star animation-delay-2000"></div>
      <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full animate-shooting-star animation-delay-4000"></div>
      
      {/* Galaxy swirl effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-transparent to-blue-900 animate-spin-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-transparent to-purple-900 animate-spin-slow-reverse"></div>
      </div>
      
      {/* Main content */}
      <div className="relative w-full max-w-4xl z-10">
        <QuizProvider>
          <Quiz />
        </QuizProvider>
      </div>
    </div>
  );
}

export default App;