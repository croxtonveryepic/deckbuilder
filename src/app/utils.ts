import { BaseCard } from './cardlists/base-cards';
import { Essence } from './cardlists/essences';
import { CardType } from './components/card';
import { DecklistContext } from './components/decklist-context';
import { AnyCard } from './components/drag-context';
import { Element } from './cardlists/enums';
export function idGenerator() {
  let i = 0;
  return function () {
    return i++;
  };
}

export function isAtMax(
  decklist: DecklistContext,
  c: AnyCard | undefined
): boolean {
  if (!c) {
    return false;
  }
  switch (c.type) {
    case CardType.BaseCard:
      let count = decklist.cards.get(c.id) || 0;
      return (c as BaseCard).epic
        ? decklist.epics.has((c as BaseCard).epic!)
        : count === 3;
    case CardType.Essence:
      return (
        (decklist.essences.get(c.id) || 0) === 3 && !(c as Essence).unlimited
      );
    case CardType.Shrine:
      return decklist.shrine.shrine?.id === c.id;
    case CardType.ShrineImprovement:
      return decklist.shrine.shrineImprovement?.id === c.id;
    default:
      return false;
  }
}

export function handleElementFilterClicked(
  e: Element,
  currentFilters: Element[],
  setFilters: (a: Element[]) => void
) {
  if (currentFilters.includes(e)) {
    setFilters(currentFilters.filter((el) => el !== e));
  } else {
    setFilters([...currentFilters, e]);
  }
}

function getCardByFilename(filename: string, list: any[]) {
  return list.find((obj) => {
    return obj.filename === filename;
  });
}
