type AlignmentInfo = {
  good: string,
  neutral: string,
  evil: string,
}

export const alignmentInfo: AlignmentInfo = {
  good: 'An alignment of <span class="text-emphasis">Good</span> is a good choice for a beginning character.',
  neutral: 'An alignment of <span class="text-emphasis">Neutral</span> is a good choice for a beginning character.',
  evil: 'An alignment of <span class="text-emphasis">Evil</span> is difficult to play as a beginning character since the good creatures of the world will not come to your aid.',
}

type StatInfo = {
  strength: string,
  dexterity: string,
  intelligence: string,
  endurance: string,
}

export type Stats = 'strength' | 'dexterity' | 'intelligence' | 'endurance'

export const statInfo: StatInfo = {
  strength: 'Your strength directly affects your carrying capacity and the amount of melee damage you can inflict.  A higher strength will also make the following skills easier to master: short sword, long sword, two-handed sword, club, axe, maul, mace, unarmed combat, shield use, weaponsmith, and armorsmith.',
  dexterity: 'Your dexterity directly affects your movement rate and the amount of throwing weapon damage you can inflict.  A higher dexterity will also make the following skills easier to master: short sword, long sword, mace, unarmed combat, dagger, throwing weapons, shield use, critical striking, acrobatics, detect/disarm traps, pick pockets, pick locks, weaponsmith, and armorsmith.',
  intelligence: 'Your intelligence directly affects the amount of spell damage you can inflict.  A higher intelligence will also make the following skills easier to master: sorcery, elementalism, mysticism, thaumaturgy, necromancy, theurgism, meditation, critical striking, acrobatics, pick locks, alchemy.',
  endurance: 'Your endurance directly affects the amount of hit points your character has.  A high endurance will also make it easier to master the meditation skill.',
}

type PvPInfo = {
  off: string,
  on: string,
}

export const pvpInfo: PvPInfo = {
  off: 'With player vs. player combat turned off - other players are not permitted to attack you.  This is a good choice for players new to The Realm.  You can always decide to participate in player vs. player combat at a later time.',
  on: 'With player vs. player combat turned on you may be attacked by other players who choose to participate in player vs. player combat.',
}


export const races: Races[] = ['human', 'orc', 'giant', 'elf'];
type Races = 'human' | 'orc' | 'giant' | 'elf';

export const classes: Classes[] = ['adventurer', 'warrior', 'wizard', 'thief']
type Classes = 'adventurer' | 'warrior' | 'wizard' | 'thief';

export const alignments: Alignments[] = ['good', 'neutral', 'evil']
type Alignments = 'good' | 'neutral' | 'evil'

export const pvpOptions: PvPOptions[] = ['off', 'on']
type PvPOptions = 'off' | 'on'


type StatBlock = {
  strength: number;
  dexterity: number;
  intelligence: number;
  endurance: number;
};

type ClassStats = {
  [key in Classes]: StatBlock;
};

type RaceClassStats = {
  [key in Races]: ClassStats;
};


export const raceClassStats: RaceClassStats = {
  human: {
    adventurer: {strength: 10, dexterity: 10, intelligence: 10, endurance: 10},
    warrior: {strength: 12, dexterity: 11, intelligence: 6, endurance: 11},
    wizard: {strength: 6, dexterity: 11, intelligence: 14, endurance: 9},
    thief: {strength: 9, dexterity: 13, intelligence: 8, endurance: 10},
  },
  orc: {
    adventurer: {strength: 11, dexterity: 10, intelligence: 8, endurance: 11},
    warrior: {strength: 13, dexterity: 11, intelligence: 4, endurance: 12},
    wizard: {strength: 7, dexterity: 11, intelligence: 12, endurance: 10},
    thief: {strength: 10, dexterity: 13, intelligence: 6, endurance: 11},
  },
  giant: {
    adventurer: {strength: 14, dexterity: 6, intelligence: 6, endurance: 14},
    warrior: {strength: 16, dexterity: 7, intelligence: 2, endurance: 15},
    wizard: {strength: 10, dexterity: 7, intelligence: 10, endurance: 13},
    thief: {strength: 13, dexterity: 9, intelligence: 4, endurance: 14},
  },
  elf: {
    adventurer: {strength: 7, dexterity: 14, intelligence: 13, endurance: 6},
    warrior: {strength: 9, dexterity: 15, intelligence: 9, endurance: 7},
    wizard: {strength: 3, dexterity: 15, intelligence: 17, endurance: 5},
    thief: {strength: 6, dexterity: 17, intelligence: 11, endurance: 6},
  },
}

export type Character = {
  strength: number,
  dexterity: number,
  intelligence: number,
  endurance: number,
  race: Races,
  class: Classes,
  alignment: Alignments,
  pvp: PvPOptions,
}