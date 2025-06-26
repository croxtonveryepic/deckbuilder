export enum BaseCardType {
  Unit = 'a',
  Event = 'b',
  ContinuousEvent = 'c',
  Item = 'd',
  Structure = 'e',
  Any = '',
}

export enum Element {
  Air = 'Air', // grey
  Dark = 'Dark', // purple
  Earth = 'Earth', // green
  Fire = 'Fire', // red
  Light = 'Light', // yellow
  Water = 'Water', // blue
  Neutral = 'Neutral',
}

export enum Rarity {
  Common = 'a',
  Uncommon = 'b',
  Rare = 'c',
  Epic = 'd',
  Any = '',
}

export let expansions = new Map<number, string>([
  [0, '2024 Promo'],
  [1, 'A New Way'],
  [2, '2025 Promo'],
  [3, 'Broken Pair']
]);
