import { ShrineSlot } from '../cardlists/shrines';
import { createContext } from 'react';

export class DecklistContext {
  shrine: ShrineSlot;
  cards: Map<number, number>;
  essences: Map<number, number>;
  epics: Set<string>;

  constructor(
    shrine = new ShrineSlot(null, null),
    cards = new Map<number, number>(),
    essences = new Map<number, number>(),
    epics = new Set<string>()
  ) {
    this.shrine = shrine;
    this.cards = cards;
    this.essences = essences;
    this.epics = epics;
  }
}
export const DeckContext = createContext(new DecklistContext());
