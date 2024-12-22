import React, { useEffect, useRef, useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { Square, Scissors, FileText } from 'lucide-react';
import GameControls from './GameControls';
import { EntityType } from '../types';

const GameBoard: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { entities, winner, startGame, resetGame } = useGameLogic(boardRef);

  const getEntityIcon = (type: EntityType) => {
    const iconProps = { size: 24, className: "text-white" };
    switch (type) {
      case 'rock': return <Square {...iconProps} />;
      case 'paper': return <FileText {...iconProps} />;
      case 'scissors': return <Scissors {...iconProps} />;
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    startGame();
  };

  const handleReset = () => {
    setIsPlaying(false);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={boardRef}
        className="w-[600px] h-[600px] bg-gray-800 relative rounded-lg overflow-hidden"
      >
        {entities.map((entity) => (
          <div
            key={entity.id}
            className={`absolute transition-all duration-200 w-8 h-8 rounded-full flex items-center justify-center
              ${entity.type === 'rock' ? 'bg-red-500' : 
                entity.type === 'paper' ? 'bg-blue-500' : 'bg-green-500'}`}
            style={{
              transform: `translate(${entity.x}px, ${entity.y}px)`,
            }}
          >
            {getEntityIcon(entity.type)}
          </div>
        ))}
      </div>

      <GameControls
        isPlaying={isPlaying}
        winner={winner}
        onStart={handleStart}
        onReset={handleReset}
      />
    </div>
  );
};

export default GameBoard;