import { Element } from './base-cards';
// add epic rarity
class Shrine {
  name: string;
  filename: string;
  type: Element;
  hp: number;
  power: number;
  speed: number;
  text: string;
  artist: string;
}

export let shrines: Shrine[] = [
  {
    name: 'Hall of Shadows - Crooked Cornerstone',
    filename: 'hallofshadowscrookedcornerstone',
    type: Element.Dark,
    hp: 19,
    power: 0,
    speed: 0,
    text: 'When you resolve a Dark Card that was played as the first action of the turn, deal 1 damage to all Enemy Structures.',
    artist: 'Isiah Xavier Bradley',
  },
  {
    name: 'Hallowed Ground - Stranger’s First Sighting',
    filename: 'hallowedgroundstrangersfirstsighting',
    type: Element.Light,
    hp: 25,
    power: 0,
    speed: 0,
    text: 'When a Light Structure or Light Item enters your combat zone for the first time each turn, heal 1 damage from this Card.',
    artist: 'Fernando Cordeiro',
  },
  {
    name: 'Mikiri Ravine - First Stronghold',
    filename: 'mikiriravinefirststronghold',
    type: Element.Fire,
    hp: 17,
    power: 0,
    speed: 0,
    text: 'When a Fire Unit enters your combat zone for the first time each turn, take an additional attack action or pass action.',
    artist: 'Arturo Gomez Martinez',
  },
  {
    name: 'Temple in the Skies - Pilgrimage Terminus',
    filename: 'templeintheskiespilgrimageterminus',
    type: Element.Air,
    hp: 21,
    power: 0,
    speed: 0,
    text: 'When an Air Unit enters your combat zone for the first time each turn, draw a Card then discard a Card.',
    artist: 'Kateryna Vitkovska',
  },
  {
    name: 'The Great Oak - Fabled Guardian',
    filename: 'thegreatoakfabledguardian',
    type: Element.Earth,
    hp: 21,
    power: 0,
    speed: 0,
    text: 'When you play an Earth Event for the first time each turn, this Card gains Armor 1 until end of turn.',
    artist: 'Megan Toole',
  },
  {
    name: "Unseen City - D'Marque Control",
    filename: 'unseencitydmarquecontrol',
    type: Element.Water,
    hp: 20,
    power: 0,
    speed: 0,
    text: 'When a Water Unit with Stealth enters your combat zone for the first time each turn, you may deal 1 damage to target Unit.',
    artist: 'James McCully',
  },
];
