import { BaseCard, BaseCardType, Element } from './base-cards';
import { CardType } from '../components/card';
export class Essence {
  name: string;
  filename: string;
  cost: Element[];
  text: string;
  resources: Element[];
  unlimited: boolean;
  ccc: number;
  hp: number;
  power: number;
  speed: number;
  type: CardType;
  isValidBase: (c: BaseCard) => boolean;
}

export const essences: Essence[] = [
  {
    name: 'Advanced Essence',
    filename: 'advancedessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): When this Card resolves, Surge 1.\n (C): +2 Initiative.',
    resources: [Element.Dark, Element.Earth],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Air Essence',
    filename: 'airessence-1',
    cost: [],
    text: '',
    resources: [Element.Air],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Blinding Essence',
    filename: 'blindingessence-1',
    cost: [],
    text: '',
    resources: [Element.Air],
    unlimited: false,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 3,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Air) >= 0;
    },
  },
  {
    name: 'Brackish Essence',
    filename: 'brackishessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): Eventbound: Evasion 1.\n (C): Evasion 1.\n (C): +2 Initiative.',
    resources: [Element.Water, Element.Dark],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Bright Essence',
    filename: 'brightessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.',
    resources: [Element.Fire, Element.Light],
    unlimited: false,
    ccc: 2,
    hp: 1,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Brisk Essence',
    filename: 'briskessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.',
    resources: [Element.Light, Element.Air],
    unlimited: false,
    ccc: 2,
    hp: 1,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Burgeoning Essence',
    filename: 'burgeoningessence-1',
    cost: [],
    text: "(S): When this Card resolves, Surge 1.\n (S): When this Card resolves, move up to one target (D) Card to the bottom of its owner's deck.",
    resources: [Element.Earth],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Chilled Essence',
    filename: 'chilledessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): Eventbound: Evasion 1.\n (C): Evasion 1.',
    resources: [Element.Air, Element.Water],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Clandestine Essence',
    filename: 'clandestineessence-1',
    cost: [Element.Dark],
    text: '(C): Stealth 3.',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Clouded Essence',
    filename: 'cloudedessence-1',
    cost: [],
    text: '(S): When this Card resolves, draw a Card then discard a Card.',
    resources: [Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Compelling Essence',
    filename: 'compellingessence-1',
    cost: [Element.Water],
    text: '(S): This Card cannot be negated.',
    resources: [Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Dark Essence',
    filename: 'darkessence-1',
    cost: [],
    text: '',
    resources: [Element.Dark],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Earth Essence',
    filename: 'earthessence-1',
    cost: [],
    text: '',
    resources: [Element.Earth],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Air and Dark',
    filename: 'essenceofairanddark-1',
    cost: [Element.Dark, Element.Air],
    text: '',
    resources: [Element.Dark, Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Air and Earth',
    filename: 'essenceofairandearth-1',
    cost: [Element.Earth, Element.Air],
    text: '',
    resources: [Element.Earth, Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Air and Light',
    filename: 'essenceofairandlight-1',
    cost: [Element.Light, Element.Air],
    text: '',
    resources: [Element.Light, Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Combat',
    filename: 'essenceofcombat-1',
    cost: [Element.Fire],
    text: '',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 1,
    power: 1,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Dark and Fire',
    filename: 'essenceofdarkandfire-1',
    cost: [Element.Dark, Element.Fire],
    text: '',
    resources: [Element.Dark, Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Dark and Light',
    filename: 'essenceofdarkandlight-1',
    cost: [Element.Dark, Element.Light],
    text: '',
    resources: [Element.Dark, Element.Light],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Dark and Water',
    filename: 'essenceofdarkandwater-1',
    cost: [Element.Dark, Element.Water],
    text: '',
    resources: [Element.Dark, Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Earth and Dark',
    filename: 'essenceofearthanddark-1',
    cost: [Element.Earth, Element.Dark],
    text: '',
    resources: [Element.Earth, Element.Dark],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Earth and Light',
    filename: 'essenceofearthandlight-1',
    cost: [Element.Earth, Element.Light],
    text: '',
    resources: [Element.Earth, Element.Light],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Eternity',
    filename: 'essenceofeternity-1',
    cost: [Element.Light],
    text: '(C): Regenerate 2.',
    resources: [Element.Light],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Evasion',
    filename: 'essenceofevasion-1',
    cost: [],
    text: '(S): Eventbound: Evasion 2.\n (C): Evasion 2.',
    resources: [Element.Water],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Fire and Air',
    filename: 'essenceoffireandair-1',
    cost: [Element.Fire, Element.Air],
    text: '',
    resources: [Element.Fire, Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Fire and Earth',
    filename: 'essenceoffireandearth-1',
    cost: [Element.Fire, Element.Earth],
    text: '',
    resources: [Element.Fire, Element.Earth],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Fire and Water',
    filename: 'essenceoffireandwater-1',
    cost: [Element.Fire, Element.Water],
    text: '',
    resources: [Element.Fire, Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Life',
    filename: 'essenceoflife-1',
    cost: [Element.Light],
    text: '',
    resources: [Element.Light],
    unlimited: false,
    ccc: 4,
    hp: 2,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Light and Fire',
    filename: 'essenceoflightandfire-1',
    cost: [Element.Light, Element.Fire],
    text: '',
    resources: [Element.Light, Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Light and Water',
    filename: 'essenceoflightandwater-1',
    cost: [Element.Light, Element.Water],
    text: '',
    resources: [Element.Light, Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Might',
    filename: 'essenceofmight-1',
    cost: [Element.Fire],
    text: '',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 2,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Opportunity',
    filename: 'essenceofopportunity-1',
    cost: [],
    text: '(C): +4 Initiative.',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Precision',
    filename: 'essenceofprecision-1',
    cost: [],
    text: '(S)(C): Accuracy.',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Stealth',
    filename: 'essenceofstealth-1',
    cost: [],
    text: '(C): Stealth 1.',
    resources: [Element.Water],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: -1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Surprise',
    filename: 'essenceofsurprise-1',
    cost: [],
    text: '(R): You may play this Card as the first action of the turn.',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Swiftness',
    filename: 'essenceofswiftness-1',
    cost: [],
    text: '',
    resources: [Element.Air],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 2,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of the Bounty',
    filename: 'essenceofthebounty-1',
    cost: [],
    text: '(S): When this Card resolves, Surge 2.',
    resources: [Element.Earth],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of the Guardian',
    filename: 'essenceoftheguardian-1',
    cost: [],
    text: '(C): Armor 1.\n (C): While defending, this Card gains Armor 1.',
    resources: [Element.Earth],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Water and Air',
    filename: 'essenceofwaterandair-1',
    cost: [],
    text: '',
    resources: [Element.Water, Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Essence of Water and Earth',
    filename: 'essenceofwaterandearth-1',
    cost: [],
    text: '',
    resources: [Element.Water, Element.Earth],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Fire Essence',
    filename: 'fireessence-1',
    cost: [],
    text: '',
    resources: [Element.Fire],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Frenzied Essence',
    filename: 'frenziedessence-1',
    cost: [],
    text: 'This Card gains the subtype Barbarian. (C): When you discard a Card, this Card gains +1 Pwr until the end of turn.',
    resources: [Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.supertype === BaseCardType.Unit;
    },
  },
  {
    name: 'Fresh Essence',
    filename: 'freshessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): When this Card resolves, Surge 1.',
    resources: [Element.Light, Element.Earth],
    unlimited: false,
    ccc: 2,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Gloomy Essence',
    filename: 'gloomyessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (C): +2 Initiative.',
    resources: [Element.Dark, Element.Air],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Hostile Essence',
    filename: 'hostileessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): When this Card resolves, Surge 1.',
    resources: [Element.Earth, Element.Fire],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Air Essence',
    filename: 'infusedairessence-1',
    cost: [],
    text: '',
    resources: [Element.Air],
    unlimited: true,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Dark Essence',
    filename: 'infuseddarkessence-1',
    cost: [],
    text: '(C): +2 Initiative.',
    resources: [Element.Dark],
    unlimited: true,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Earth Essence',
    filename: 'infusedearthessence-1',
    cost: [],
    text: '(S): When this Card resolves, Surge 1.',
    resources: [Element.Earth],
    unlimited: true,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Fire Essence',
    filename: 'infusedfireessence-1',
    cost: [],
    text: '',
    resources: [Element.Fire],
    unlimited: true,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Light Essence',
    filename: 'infusedlightessence-1',
    cost: [],
    text: '',
    resources: [Element.Light],
    unlimited: true,
    ccc: 2,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Infused Water Essence',
    filename: 'infusedwateressence-1',
    cost: [],
    text: '(S): Eventbound: Evasion 1.\n (C): Evasion 1.',
    resources: [Element.Water],
    unlimited: true,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Ingenious Essence',
    filename: 'ingeniousessence-1',
    cost: [],
    text: '',
    resources: [Element.Light],
    unlimited: false,
    ccc: 1,
    hp: 1,
    power: 1,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return (
        c.supertype === BaseCardType.Structure ||
        c.supertype === BaseCardType.Item
      );
    },
  },
  {
    name: 'Light Essence',
    filename: 'lightessence-1',
    cost: [],
    text: '',
    resources: [Element.Light],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Loyal Essence',
    filename: 'loyalessence-1',
    cost: [],
    text: 'This Card gains the subtype Knight.',
    resources: [Element.Earth],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.supertype === BaseCardType.Unit;
    },
  },
  {
    name: 'Martial Essence',
    filename: 'martialessence-1',
    cost: [],
    text: '(S): When this Card resolves, you may Link target (C) Item you control to target (C) Unit.',
    resources: [Element.Light],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Pure Air Essence',
    filename: 'pureairessence-1',
    cost: [],
    text: '(S): When this Card resolves, you may discard a Card, if you do, exhaust target (C) Unit.',
    resources: [Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Air) >= 0;
    },
  },
  {
    name: 'Pure Dark Essence',
    filename: 'puredarkessence-1',
    cost: [],
    text: '(S): When this Card resolves, if it was played as the first action of the turn, draw a Card.\n (C): +2 Initiative.',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Dark) >= 0;
    },
  },
  {
    name: 'Pure Earth Essence',
    filename: 'pureearthessence-1',
    cost: [],
    text: '(S): When this Card resolves, Surge 1.\n (C): When this Card is destroyed, place it into your resource zone exhausted.',
    resources: [Element.Earth],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Earth) >= 0;
    },
  },
  {
    name: 'Pure Fire Essence',
    filename: 'purefireessence-1',
    cost: [],
    text: '(S): When this Card resolves, deal 1 damage to target (C) Structure.',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Fire) >= 0;
    },
  },
  {
    name: 'Pure Light Essence',
    filename: 'purelightessence-1',
    cost: [],
    text: '(S): When this Card resolves, heal 2 damage from target (C) Card.',
    resources: [Element.Light],
    unlimited: false,
    ccc: 3,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Light) >= 0;
    },
  },
  {
    name: 'Pure Water Essence',
    filename: 'purewateressence',
    cost: [],
    text: "(S): Eventbound: Evasion 3 during your action.\n (C): Evasion 3 during opponents' actions.",
    resources: [Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.pips.indexOf(Element.Water) >= 0;
    },
  },
  {
    name: 'Razing Essence',
    filename: 'razingessence-1',
    cost: [],
    text: '(S)(C): Damage dealt to an Enemy Shrine by this Card is increased by 2.',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Rebellious Essence',
    filename: 'rebelliousessence-1',
    cost: [],
    text: '(C): Sworn Enemy Soldier: +1 Spd and +1 Pwr.',
    resources: [Element.Fire],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Reflective Essence',
    filename: 'reflectiveessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): Eventbound: Evasion 1.\n (C): Evasion 1.',
    resources: [Element.Water, Element.Light],
    unlimited: false,
    ccc: 2,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Rushing Essence',
    filename: 'rushingessence-1',
    cost: [Element.Water],
    text: '',
    resources: [Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.supertype === BaseCardType.Event;
    },
  },
  {
    name: 'Shadowy Essence',
    filename: 'shadowyessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (C): +2 Initiative.',
    resources: [Element.Light, Element.Dark],
    unlimited: false,
    ccc: 2,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Slick Essence',
    filename: 'slickessence-1',
    cost: [],
    text: '(C): +1 Initiative.',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Smoldering Essence',
    filename: 'smolderingessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (C): +2 Initiative.',
    resources: [Element.Fire, Element.Dark],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Soulful',
    filename: 'soulful-1',
    cost: [],
    text: 'This Essence is all Elements.\n (R): (tap): Produce a Soul that any other Card in your resource zone could produce.',
    resources: [],
    unlimited: false,
    ccc: 4,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Soulless',
    filename: 'soulless-1',
    cost: [],
    text: 'This Card has no Element.\n (S): When this Card resolves, an opponent of your choice may draw a Card.',
    resources: [Element.Neutral],
    unlimited: false,
    ccc: 5,
    hp: 1,
    power: 1,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Staunch Essence',
    filename: 'staunchessence',
    cost: [],
    text: 'This Card gains the subtype Soldier.\n (C): Evasion 1.\n (C): When this Card is destroyed, you may deal 1 damage to target (C) Unit.',
    resources: [Element.Water],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return c.supertype === BaseCardType.Unit;
    },
  },
  {
    name: 'Steaming Essence',
    filename: 'steamingessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): Eventbound: Evasion 1.\n (C): Evasion 1.',
    resources: [Element.Water, Element.Fire],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Thriving Essence',
    filename: 'thrivingessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): When this Card resolves, Surge 1.\n (S): Eventbound: Evasion 1.\n(C): Evasion 1.',
    resources: [Element.Earth, Element.Water],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Timeworn Essence',
    filename: 'timewornessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.\n (S): When this Card resolves, Surge 1.',
    resources: [Element.Earth, Element.Air],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Torrid Essence',
    filename: 'torridessence-1',
    cost: [Element.Neutral],
    text: '(R): Enters exhausted.',
    resources: [Element.Air, Element.Fire],
    unlimited: false,
    ccc: 2,
    hp: 0,
    power: 1,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Vehement Essence',
    filename: 'vehementessence-1',
    cost: [Element.Earth],
    text: '(S): When this Card resolves, recover up to one target (C) Unit.',
    resources: [Element.Earth],
    unlimited: false,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Warding Essence',
    filename: 'wardingessence-1',
    cost: [],
    text: '(C): This Card may defend as if it had Stealth 1.',
    resources: [Element.Light],
    unlimited: false,
    ccc: 3,
    hp: 1,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Water Essence',
    filename: 'wateressence-1',
    cost: [],
    text: '',
    resources: [Element.Water],
    unlimited: true,
    ccc: 0,
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Whispering Essence',
    filename: 'whisperingessence-1',
    cost: [Element.Air],
    text: '(S): When this Card resolves, draw a Card.',
    resources: [Element.Air],
    unlimited: false,
    ccc: 3,
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return true;
    },
  },
  {
    name: 'Wicked Essence',
    filename: 'wickedessence-1',
    cost: [],
    text: '',
    resources: [Element.Dark],
    unlimited: false,
    ccc: 1,
    hp: 0,
    power: 1,
    speed: 1,
    type: CardType.Essence,
    isValidBase: (c) => {
      return (
        c.supertype === BaseCardType.Event && c.pips.indexOf(Element.Dark) >= 0
      );
    },
  },
];
