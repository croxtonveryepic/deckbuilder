export enum BaseCardType {
  Unit = 'a',
  Event = 'b',
  ContinuousEvent = 'c',
  Item = 'd',
  Structure = 'e',
  Any = '',
}

export enum Element {
  Air = 'Air',
  Dark = 'Dark',
  Earth = 'Earth',
  Fire = 'Fire',
  Light = 'Light',
  Water = 'Water',
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
]);
