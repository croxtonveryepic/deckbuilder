import { ShrineSlot } from '../cardlists/shrines';
import { createContext } from 'react';

export class DecklistContext {
  shrine: ShrineSlot;
  cards: Map<number, number>;
  essences: Map<number, number>;

  constructor(
    shrine = new ShrineSlot(null, null),
    cards = new Map<number, number>(),
    essences = new Map<number, number>()
  ) {
    this.shrine = shrine;
    this.cards = cards;
    this.essences = essences;
  }
}
export const DeckContext = createContext(new DecklistContext());
