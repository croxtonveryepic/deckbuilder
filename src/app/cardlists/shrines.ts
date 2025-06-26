import { Element } from './enums';
import { Rarity } from './enums';
import { CardType } from '../components/card';
import { ShrineImprovement } from './shrine-improvements';
export class Shrine {
  name: string;
  filename: string;
  id: number;
  identity: Element;
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
    id: 0,
    identity: Element.Dark,
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
    id: 1,
    identity: Element.Light,
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
    id: 2,
    identity: Element.Fire,
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
    id: 3,
    identity: Element.Air,
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
    id: 4,
    identity: Element.Earth,
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
    id: 5,
    identity: Element.Water,
    hp: 20,
    power: 0,
    speed: 0,
    text: 'When a Water Unit with Stealth enters your combat zone for the first time each turn, you may deal 1 damage to target Unit.',
    artist: 'James McCully',
    rarity: Rarity.Epic,
    type: CardType.Shrine,
  },
  // {
  //   name: "Abyss Hideout - Szofh's Domain",
  //   filename: 'AbyssHideoutSzofh_sDomain',
  //   id: 6,
  //   identity: Element.Dark,
  //   hp: 20,
  //   power: 0,
  //   speed: 0,
  //   text: '(C): Use this ability ounce per turn; (1): All (S) non-Continuous Dark Events you control gain +1 Pwr until end of turn. When you resolve an Event for the third time this turn, draw a Card.',
  //   artist: 'Fernando Cordeiro',
  //   rarity: Rarity.Epic,
  //   type: CardType.Shrine,
  // },
  // {
  //   name: 'BryMarEstates - Ruins of the Old World',
  //   filename: 'BryMarEstatesRuinsOfTheOldWorld',
  //   id: 7,
  //   identity: Element.Earth,
  //   hp: 20,
  //   power: 0,
  //   speed: 0,
  //   text: '(C): Use this ability once per turn; (1): Target (C) Knight gains Steadfast until end of turn. If you control a (C) King and twelve (C) Knights, you win the game.',
  //   artist: 'Kateryna Vitkovska',
  //   rarity: Rarity.Epic,
  //   type: CardType.Shrine,
  // },
  // {
  //   name: 'Storm Peak - Cloud Veiled Castle',
  //   filename: 'StormPeakCloudVeiledCastle',
  //   id: 8,
  //   identity: Element.Air,
  //   hp: 18,
  //   power: 0,
  //   speed: 0,
  //   text: '(C): Use this ability once per turn; (1), Discard a card: Daze target (C) Unit.',
  //   artist: 'Romar Adriano Olasiman',
  //   rarity: Rarity.Epic,
  //   type: CardType.Shrine,
  // },
];
export class ShrineSlot {
  shrine: Shrine | null;
  shrineImprovement: ShrineImprovement | null;

  constructor(shrine: Shrine | null, improvement: ShrineImprovement | null) {
    this.shrine = shrine;
    this.shrineImprovement = improvement;
  }
}
