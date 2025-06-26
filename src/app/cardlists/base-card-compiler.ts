import { aNewWay } from './01-a-new-way';
import { brokenPair } from './02-broken-pair';
import { BaseCard } from './base-cards';
import { essences } from './essences';

export const baseCards: BaseCard[] = aNewWay.concat(brokenPair).map((c) => {
  let m = new Set<number>();
  essences.forEach((e) => {
    if (c.ccc + e.ccc <= 6 && c.isValidEssence(e) && e.isValidBase(c)) {
      m.add(e.id);
    }
  });
  return { ...c, validEssences: m };
});
