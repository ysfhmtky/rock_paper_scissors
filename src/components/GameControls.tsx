import React from 'react';
import { EntityType } from '../types';

interface GameControlsProps {
  isPlaying: boolean;
  winner: EntityType | null;
  onStart: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  winner,
  onStart,
  onReset,
}) => {
  return (
    <div className="text-center">
      {winner ? (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {winner.charAt(0).toUpperCase() + winner.slice(1)} wins!
          </h2>
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl text-gray-700">
            {isPlaying ? "Battle in progress..." : "Ready to start!"}
          </h2>
        </div>
      )}
      
      <button
        onClick={isPlaying ? onReset : onStart}
        className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 
          transition-colors duration-200"
      >
        {isPlaying ? "Reset Game" : "Start Game"}
      </button>
    </div>
  );
};

export default GameControls;