import { CardType } from '../components/card';
import { BaseCardType, Element, expansions, Rarity } from './enums';
import { Essence, essences } from './essences';
export class BaseCardFilters {
  private type: (supertype: BaseCardType) => boolean;
  private identity: (pips: Element[]) => boolean;
  private cost: (cost: number) => boolean;
  private query: (fields: string[]) => boolean;
  private rarity: (rarity: Rarity) => boolean;
  private ccc: (ccc: number) => boolean;
  private set: (set: number) => boolean;
  // speed: (speed: number) => boolean;

  constructor({
    typeChoice,
    elementChoices,
    elementOperator,
    costChoiceOne,
    costChoiceTwo,
    costOperator,
    cccChoice,
    cccOperator,
    query,
    rarityFilter,
    setFilter: set,
  }: {
    typeChoice: BaseCardType;
    elementChoices: Element[];
    elementOperator: boolean | undefined;
    costChoiceOne: number;
    costChoiceTwo: number;
    costOperator: string;
    cccChoice: number;
    cccOperator: string;
    query: string;
    rarityFilter: Rarity;
    setFilter: string;
  }) {
    this.type =
      typeChoice === BaseCardType.Any
        ? (supertype: BaseCardType) => true
        : (supertype: BaseCardType) => {
            return typeChoice === supertype;
          };
    if (elementChoices.length > 0) {
      switch (elementOperator) {
        case undefined: // or
          this.identity = (pips: Element[]) => {
            return elementChoices.some((el) => pips.includes(el));
          };
          break;
        case false: // and
          this.identity = (pips: Element[]) => {
            return elementChoices.every((el) => pips.includes(el));
          };
          break;
        case true: // only
          this.identity = (pips: Element[]) => {
            return pips.every((el) => elementChoices.includes(el));
          };
      }
    } else {
      this.identity = (pips: Element[]) => true;
    }
    if (costChoiceOne) {
      switch (costOperator) {
        case '=':
          this.cost = (cost: number) => costChoiceOne === cost;
          break;
        case '<=':
          this.cost = (cost: number) => cost <= costChoiceOne;
          break;
        case '>=':
          this.cost = (cost: number) => cost >= costChoiceOne;
          break;
        case '<=>':
          if (costChoiceTwo) {
            this.cost = (cost: number) => {
              const diff = Math.abs(costChoiceOne - costChoiceTwo);
              return (
                diff >= Math.abs(costChoiceOne - cost) &&
                diff >= Math.abs(costChoiceTwo - cost)
              );
            };
          } else {
            // can't apply 'between' filter until there are two numbers, default to 'equals' filter
            this.cost = (cost: number) => cost === costChoiceOne;
          }
          break;
        default:
          console.warn('Invalid cost filter operator');
      }
    } else {
      this.cost = (cost: number) => true;
    }
    if (Number.isNaN(cccChoice)) {
      this.ccc = (ccc: number) => true;
    } else {
      switch (cccOperator) {
        case '<=':
          this.ccc = (ccc: number) => ccc <= cccChoice;
          break;
        case '=':
          this.ccc = (ccc: number) => ccc === cccChoice;
          break;
        case '>=':
          this.ccc = (ccc: number) => ccc >= cccChoice;
          break;
        default:
          console.warn('Invalid cost filter operator');
      }
    }
    this.query = query
      ? (fields: string[]) =>
          fields.some((s) => {
            return s.toLocaleLowerCase().includes(query.toLocaleLowerCase());
          })
      : (fields: string[]) => true;
    this.rarity =
      rarityFilter === Rarity.Any
        ? (rarity: Rarity) => true
        : (rarity: Rarity) => rarity === rarityFilter;
    this.set =
      set === ''
        ? (s: number) => true
        : (s: number) => s === (set as unknown as number);
  }

  keep(c: BaseCard): boolean {
    return (
      this.set(c.set) &&
      this.type(c.supertype) &&
      this.identity(c.pips) &&
      this.cost(c.cost) &&
      this.ccc(c.ccc) &&
      this.query([
        c.name,
        ...c.subtype,
        c.text,
        c.artist,
        expansions.get(c.set)!,
      ]) &&
      this.rarity(c.rarity)
    );
  }
}

export class UncalculatedBaseCard {
  set: number;
  name: string;
  filename: string;
  id: number;
  epic: string | null;
  supertype: BaseCardType;
  subtype: string[];
  cost: number;
  pips: Element[];
  hp: number;
  power: number;
  speed: number;
  text: string;
  ccc: number;
  artist: string;
  rarity: Rarity;
  type: CardType;
  isValidEssence: (e: Essence) => boolean;
}

export class BaseCard {
  set: number;
  name: string;
  filename: string;
  id: number;
  epic: string | null;
  supertype: BaseCardType;
  subtype: string[];
  cost: number;
  pips: Element[];
  hp: number;
  power: number;
  speed: number;
  text: string;
  ccc: number;
  artist: string;
  rarity: Rarity;
  type: CardType;
  isValidEssence: (e: Essence) => boolean;
  validEssences: Set<number>;
}

