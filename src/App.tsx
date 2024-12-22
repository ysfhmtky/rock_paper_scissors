import React from 'react';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Rock Paper Scissors Battle
      </h1>
      <GameBoard />
    </div>
  );
}

export default App;