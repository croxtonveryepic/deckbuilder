import { createContext } from 'react';
import { CardType } from './card';
import { Shrine } from '../cardlists/shrines';
import { ShrineImprovement } from '../cardlists/shrine-improvements';
import { BaseCard } from '../cardlists/base-cards';
import { Essence } from '../cardlists/essences';

export class Placeholder {
  type: CardType.Placeholder;
  filename: '';
  name: '';

  constructor() {
    this.type = CardType.Placeholder;
    this.filename = '';
    this.name = '';
  }
}

export type AnyCard =
  | Shrine
  | ShrineImprovement
  | BaseCard
  | Essence
  | Placeholder;
export type HeldCard = { card: AnyCard; id: number } | null;

// export const disam = {
//   isShrine: (c: HeldCard): c is Shrine => {
//     return c?.type === CardType.Shrine;
//   },
//   isShrineImprovement: (c: HeldCard): c is ShrineImprovement => {
//     return c?.type === CardType.ShrineImprovement;
//   },
//   isBaseCard: (c: HeldCard): c is BaseCard => {
//     return c?.type === CardType.BaseCard;
//   },
//   isEssence: (c: HeldCard): c is Essence => {
//     return c?.type === CardType.Essence;
//   },
// };

export const AlertPickup = createContext((c: HeldCard) => {});
