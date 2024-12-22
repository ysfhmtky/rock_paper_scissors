export type EntityType = 'rock' | 'paper' | 'scissors';

export interface Entity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  dx: number;
  dy: number;
}