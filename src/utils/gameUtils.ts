import { Entity, EntityType } from '../types';

export const generateEntities = (width: number, height: number): Entity[] => {
  const entities: Entity[] = [];
  const types: EntityType[] = ['rock', 'paper', 'scissors'];
  
  types.forEach(type => {
    for (let i = 0; i < 10; i++) {
      entities.push({
        id: `${type}-${i}`,
        type,
        x: Math.random() * (width - 32),
        y: Math.random() * (height - 32),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
      });
    }
  });
  
  return entities;
};

export const moveEntity = (entity: Entity, width: number, height: number): Entity => {
  let { x, y, dx, dy } = entity;
  
  // Update position
  x += dx;
  y += dy;
  
  // Bounce off walls
  if (x <= 0 || x >= width - 32) {
    dx = -dx;
    x = x <= 0 ? 0 : width - 32;
  }
  if (y <= 0 || y >= height - 32) {
    dy = -dy;
    y = y <= 0 ? 0 : height - 32;
  }
  
  return { ...entity, x, y, dx, dy };
};

export const checkCollision = (entity1: Entity, entity2: Entity): boolean => {
  const distance = Math.sqrt(
    Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
  );
  return distance < 32; // 32 is the size of the entity (including padding)
};