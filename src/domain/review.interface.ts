import type { UUID } from 'node:crypto';
import type { Score } from './score.interface.js';

export interface Review {
  id: UUID;
  score: Score;
  cardId: UUID;
  userId: UUID;
  createdAt: Date;
  nextReview: Date;
}
