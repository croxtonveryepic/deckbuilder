import { CardType } from '../components/card';
export class ShrineImprovement {
  name: string;
  filename: string;
  id: number;
  text: string;
  hp: number;
  power: number;
  speed: number;
  type: CardType;
}

export class ShrineImprovementFilters {
  private query: (fields: string[]) => boolean;

  constructor({ query }: { query: string }) {
    this.query = query
      ? (fields: string[]) =>
          fields.some((s) => {
            return (
              s.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0
            );
          })
      : (fields: string[]) => true;
  }
  keep(si: ShrineImprovement): boolean {
    return this.query([si.name, si.text]);
  }
}

export const shrineImprovements: ShrineImprovement[] = [
  {
    name: 'Arsenal',
    filename: 'arsenal-1',
    id: 0,
    text: '(Combat): (Exhaust): You may play Items as if they were Continuous Events until end of turn.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Gardens',
    filename: 'gardens-1',
    id: 1,
    text: '(Combat): (Exhaust): Surge 1.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Great Hall',
    filename: 'greathall-1',
    id: 2,
    text: '(Combat): Use this ability once per turn; Exhaust a (Combat) Knight: Target (Combat) Knight gains +1Spd and +1Pwr until end of turn.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Hidden Passageways',
    filename: 'hiddenpassageways-1',
    id: 3,
    text: '(Combat): Use this ability once per turn; Exhaust a (Combat) Assassin or (Combat) Tactician: Deal 1 damage to target (Combat) Shrine.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Infirmary',
    filename: 'infirmary-1',
    id: 4,
    text: '(Combat): Use this ability once per turn; Exhaust a (Combat) Cleric: Heal 2 damage from target (Combat) Unit.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Inner Sanctum',
    filename: 'innersanctum-1',
    id: 5,
    text: '(Combat): (Exhaust): All non-Continuous Events you control gain +1Pwr until end of turn.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Intruder Alarm',
    filename: 'intruderalarm-1',
    id: 6,
    text: '(Combat): (Exhaust): Target (Combat) Unit loses Stealth until end of turn.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Kennels',
    filename: 'kennels-1',
    id: 7,
    text: '(Combat): Use this ability once per turn; Exhaust a (Combat) Soldier with cost 3 or greater: Place a "War Kitten" token into your combat zone.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Library',
    filename: 'library-1',
    id: 8,
    text: '(Combat): (Exhaust): Draw a Card then discard a Card.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Observation Point',
    filename: 'observationpoint-1',
    id: 9,
    text: '',
    hp: 0,
    power: 0,
    speed: 1,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Research Facility',
    filename: 'researchfacility-1',
    id: 10,
    text: "(Combat): Once per turn, during an opponent's action, you may play a non-Continuous Event with 0 Spd as if it had 1 Spd.",
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Secret Academy',
    filename: 'secretacademy-1',
    id: 11,
    text: "(Combat): Use this ability once per turn; Exhaust a (Combat) Unit with Stealth and cost 3 or greater: Deal 1 damage to target (Combat) Unit if it doesn't have Stealth.",
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Sparring Ring',
    filename: 'sparringring-1',
    id: 12,
    text: '(Combat): Use this ability once per turn; Exhaust a (Combat) Barbarian or (Combat) Warrior: Exhaust target non-Epic (Combat) Unit.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Spiked Walls',
    filename: 'spikedwalls-1',
    id: 13,
    text: '(Combat): When a Unit deals combat damage to this Card for the first time each turn, deal 1 damage to that Unit.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Thick Walls',
    filename: 'thickwalls-1',
    id: 14,
    text: '',
    hp: 4,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Throne Room',
    filename: 'throneroom-1',
    id: 15,
    text: '(Combat): All (Combat) Units you control with cost 5 or greater gain +1Pwr.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Training Facility',
    filename: 'trainingfacility-1',
    id: 16,
    text: '(Combat): (Exhaust): Target (Combat) Unit gains +1Pwr until end of turn.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
  {
    name: 'War Room',
    filename: 'warroom-1',
    id: 17,
    text: '(Combat): Increase your starting hand size by 1.',
    hp: 0,
    power: 0,
    speed: 0,
    type: CardType.ShrineImprovement,
  },
];
