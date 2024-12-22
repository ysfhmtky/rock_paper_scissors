import { useState, useEffect, RefObject } from 'react';
import { Entity, EntityType } from '../types';
import { checkCollision, generateEntities, moveEntity } from '../utils/gameUtils';

export const useGameLogic = (boardRef: RefObject<HTMLDivElement>) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [winner, setWinner] = useState<EntityType | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startGame = () => {
    if (!boardRef.current) return;
    
    const { width, height } = boardRef.current.getBoundingClientRect();
    setEntities(generateEntities(width, height));
    setWinner(null);
    setIsRunning(true);
  };

  const resetGame = () => {
    setEntities([]);
    setWinner(null);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning || !boardRef.current) return;

    const { width, height } = boardRef.current.getBoundingClientRect();
    let animationFrameId: number;

    const update = () => {
      setEntities(prevEntities => {
        // Move all entities
        let newEntities = prevEntities.map(entity => moveEntity(entity, width, height));

        // Check for collisions and apply game rules
        for (let i = 0; i < newEntities.length; i++) {
          for (let j = i + 1; j < newEntities.length; j++) {
            if (checkCollision(newEntities[i], newEntities[j])) {
              const { winner, loser } = determineWinner(newEntities[i], newEntities[j]);
              if (winner && loser) {
                newEntities = newEntities.map(entity =>
                  entity.id === loser.id ? { ...entity, type: winner.type } : entity
                );
              }
            }
          }
        }

        // Check for game end
        const types = new Set(newEntities.map(e => e.type));
        if (types.size === 1) {
          setWinner(newEntities[0].type);
          setIsRunning(false);
          return newEntities;
        }

        return newEntities;
      });

      if (isRunning) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, boardRef]);

  return { entities, winner, startGame, resetGame };
};

const determineWinner = (entity1: Entity, entity2: Entity) => {
  const rules: Record<EntityType, EntityType> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  if (rules[entity1.type] === entity2.type) {
    return { winner: entity1, loser: entity2 };
  }
  if (rules[entity2.type] === entity1.type) {
    return { winner: entity2, loser: entity1 };
  }
  return { winner: null, loser: null };
};