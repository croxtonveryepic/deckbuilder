import { CardType } from '../components/card';
// add stats
export class ShrineImprovement {
  name: string;
  filename: string;
  text: string;
  type: CardType;
}
export const shrineImprovements: ShrineImprovement[] = [
  {
    name: 'Arsenal',
    filename: 'arsenal-1',
    text: '© : You may play Items as if they were Continuous Events until end of turn.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Gardens',
    filename: 'gardens-1',
    text: '© : Surge 1.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Great Hall',
    filename: 'greathall-1',
    text: '© : Use this ability once per turn; Exhaust a © Knight: Target © Knight gains +1Spd and +1Pwr until end of turn.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Hidden Passageways',
    filename: 'hiddenpassageways-1',
    text: '© : Use this ability once per turn; Exhaust a © Assassin or © Tactician: Deal 1 damage to target © Shrine.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Infirmary',
    filename: 'infirmary-1',
    text: '© : Use this ability once per turn; Exhaust a © Cleric: Heal 2 damage from target © Unit.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Inner Sanctum',
    filename: 'innersanctum-1',
    text: '© : All non-Continuous Events you control gain +1Pwr until end of turn.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Intruder Alarm',
    filename: 'intruderalarm-1',
    text: '© : Target © Unit loses Stealth until end of turn.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Kennels',
    filename: 'kennels-1',
    text: '© : Use this ability once per turn; Exhaust a © Soldier with cost 3 or greater: Place a “War Kitten” token into your combat zone.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Library',
    filename: 'library-1',
    text: '© : Draw a Card then discard a Card.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Observation Point',
    filename: 'observationpoint-1',
    text: '',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'War Room',
    filename: 'warroom-1',
    text: '© : Increase your starting hand size by 1.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Research Facility',
    filename: 'researchfacility-1',
    text: '© : Once per turn, during an opponent’s action, you may play a non-Continuous Event with 0 Spd as if it had 1 Spd.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Secret Academy',
    filename: 'secretacademy-1',
    text: '© : Use this ability once per turn; Exhaust a © Unit with Stealth and cost 3 or greater: Deal 1 damage to target © Unit if it doesn’t have Stealth.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Sparring Ring',
    filename: 'sparringring-1',
    text: '© : Use this ability once per turn; Exhaust a © Barbarian or © Warrior: Exhaust target non-Epic © Unit.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Spiked Walls',
    filename: 'spikedwalls-1',
    text: '© : When a Unit deals combat damage to this Card for the first time each turn, deal 1 damage to that Unit.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Thick Walls',
    filename: 'thickwalls-1',
    text: '',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Throne Room',
    filename: 'throneroom-1',
    text: '© : All © Units you control with cost 5 or greater gain +1Pwr.',
    type: CardType.ShrineImprovement,
  },
  {
    name: 'Training Facility',
    filename: 'trainingfacility-1',
    text: '© : Target © Unit gains +1Pwr until end of turn.',
    type: CardType.ShrineImprovement,
  },
];
