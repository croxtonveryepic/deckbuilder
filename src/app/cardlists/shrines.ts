import { Element } from './base-cards';
import { Rarity } from './base-cards';
import { CardType } from '../components/card';
export class Shrine {
  name: string;
  filename: string;
  indentity: Element;
  hp: number;
  power: number;
  speed: number;
  text: string;
  artist: string;
  rarity: Rarity;
  type: CardType;
}

export let shrines: Shrine[] = [
  {
    name: 'Hall of Shadows - Crooked Cornerstone',
    filename: 'hallofshadowscrookedcornerstone',
    indentity: Element.Dark,
    hp: 19,
    power: 0,
    speed: 0,
    text: 'When you resolve a Dark Card that was played as the first action of the turn, deal 1 damage to all Enemy Structures.',
    artist: 'Isiah Xavier Bradley',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  {
    name: "Hallowed Ground - Stranger's First Sighting",
    filename: 'hallowedgroundstrangersfirstsighting',
    indentity: Element.Light,
    hp: 25,
    power: 0,
    speed: 0,
    text: 'When a Light Structure or Light Item enters your combat zone for the first time each turn, heal 1 damage from this Card.',
    artist: 'Fernando Cordeiro',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  {
    name: 'Mikiri Ravine - First Stronghold',
    filename: 'mikiriravinefirststronghold',
    indentity: Element.Fire,
    hp: 17,
    power: 0,
    speed: 0,
    text: 'When a Fire Unit enters your combat zone for the first time each turn, take an additional attack action or pass action.',
    artist: 'Arturo Gomez Martinez',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  {
    name: 'Temple in the Skies - Pilgrimage Terminus',
    filename: 'templeintheskiespilgrimageterminus',
    indentity: Element.Air,
    hp: 21,
    power: 0,
    speed: 0,
    text: 'When an Air Unit enters your combat zone for the first time each turn, draw a Card then discard a Card.',
    artist: 'Kateryna Vitkovska',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  {
    name: 'The Great Oak - Fabled Guardian',
    filename: 'thegreatoakfabledguardian',
    indentity: Element.Earth,
    hp: 21,
    power: 0,
    speed: 0,
    text: 'When you play an Earth Event for the first time each turn, this Card gains Armor 1 until end of turn.',
    artist: 'Megan Toole',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  {
    name: "Unseen City - D'Marque Control",
    filename: 'unseencitydmarquecontrol',
    indentity: Element.Water,
    hp: 20,
    power: 0,
    speed: 0,
    text: 'When a Water Unit with Stealth enters your combat zone for the first time each turn, you may deal 1 damage to target Unit.',
    artist: 'James McCully',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
];
