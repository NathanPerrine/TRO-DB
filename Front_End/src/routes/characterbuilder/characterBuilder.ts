type TextSegment = {
  segments: (string | { text: string; emphasis: boolean })[];
};

type AlignmentInfo = {
  good: TextSegment;
  neutral: TextSegment;
  evil: TextSegment;
};

export const alignmentInfo: AlignmentInfo = {
  good: {
    segments: [
      'An alignment of ',
      { text: 'Good', emphasis: true },
      ' is a good choice for a beginning character.'
    ]
  },
  neutral: {
    segments: [
      'An alignment of ',
      { text: 'Neutral', emphasis: true },
      ' is a good choice for a beginning character.'
    ]
  },
  evil: {
    segments: [
      'An alignment of ',
      { text: 'Evil', emphasis: true },
      ' is difficult to play as a beginning character since the good creatures of the world will not come to your aid.'
    ]
  }
};

type StatInfo = {
  strength: string;
  dexterity: string;
  intelligence: string;
  endurance: string;
};

export type Stats = 'strength' | 'dexterity' | 'intelligence' | 'endurance';

export const statInfo: StatInfo = {
  strength:
    'Your strength directly affects your carrying capacity and the amount of melee damage you can inflict.  A higher strength will also make the following skills easier to master: short sword, long sword, two-handed sword, club, axe, maul, mace, unarmed combat, shield use, weaponsmith, and armorsmith.',
  dexterity:
    'Your dexterity directly affects your movement rate and the amount of throwing weapon damage you can inflict.  A higher dexterity will also make the following skills easier to master: short sword, long sword, mace, unarmed combat, dagger, throwing weapons, shield use, critical striking, acrobatics, detect/disarm traps, pick pockets, pick locks, weaponsmith, and armorsmith.',
  intelligence:
    'Your intelligence directly affects the amount of spell damage you can inflict.  A higher intelligence will also make the following skills easier to master: sorcery, elementalism, mysticism, thaumaturgy, necromancy, theurgism, meditation, critical striking, acrobatics, pick locks, alchemy.',
  endurance:
    'Your endurance directly affects the amount of hit points your character has.  A high endurance will also make it easier to master the meditation skill.'
};

type ClassInfo = {
  adventurer: string;
  warrior: string;
  wizard: string;
  thief: string;
};

export const classInfo: ClassInfo = {
  adventurer:
    "Adventurers are versatile individuals, capable of both fighting and casting magic, though not as proficient as dedicated warriors or wizards in their respective areas. Their adaptability allows them to fill multiple roles, making them good at almost anything, even if they don't excel at any one specialty. Adventurers are invaluable in diverse situations, thriving on their resourcefulness and ability to tackle a wide variety of challenges.",
  warrior:
    "Warriors are weapon masters known for their high damage output and formidable health. Their exceptional strength allows them to wield heavy weapons and don thick armor without being slowed, making them resilient and powerful on the battlefield. Specializing in physical combat, warriors excel in close-quarters engagements, where their brute force and endurance make them unstoppable forces against any foe. While a warrior can learn to cast magic with enough training, it doesn't come easily.",
  wizard:
    'Wizards are highly intelligent casters, mastering various schools of magic with unparalleled skill. While their magical prowess is immense, their physical frailty makes them vulnerable in combat. Struggling to wear even medium armor, wizards must avoid direct confrontation, as they can fall quickly if targeted. However, their mystical support or devastating spells can turn the tide of battle when used strategically.',
  thief:
    'Thieves are swift and nimble fighters, adept at wearing medium armor while relying on their agility to evade attacks rather than absorb them. Masters of stealth and precision, they prefer to strike quickly and decisively, catching enemies off-guard. Whether in close combat with blades or at range with throwing daggers, thieves excel at delivering lethal damage from unexpected angles. Their speed and cunning allow them to outmaneuver foes, making them deadly when they strike and elusive when pursued.'
};

type StartingSkill = {
  skill: string;
  level: number;
};

type MagicStartingSkill = {
  good: StartingSkill[];
  neutral: StartingSkill[];
  evil: StartingSkill[];
};

type ClassSkills = {
  adventurer: {
    skills: StartingSkill[];
    magic: MagicStartingSkill;
  };
  warrior: {
    skills: StartingSkill[];
  };
  wizard: {
    skills: StartingSkill[];
    magic: MagicStartingSkill;
  };
  thief: {
    skills: StartingSkill[];
  };
};

export const classSkills: ClassSkills = {
  adventurer: {
    skills: [
      { skill: 'Light One-Handed', level: 2 },
      { skill: 'Healing', level: 1 },
      { skill: 'Acrobatics', level: 1 },
      { skill: 'Meditation', level: 1 },
      { skill: 'Shield Usage', level: 1 }
    ],
    magic: {
      good: [{ skill: 'Thaumaturgy', level: 2 }],
      neutral: [{ skill: 'Elementalism', level: 2 }],
      evil: [{ skill: 'Necromancy', level: 2 }]
    }
  },
  warrior: {
    skills: [
      { skill: 'Light One-Handed', level: 1 },
      { skill: 'Light Two-Handed', level: 2 },
      { skill: 'Heavy Two-Handed', level: 2 },
      { skill: 'Healing', level: 1 },
      { skill: 'Acrobatics', level: 1 },
      { skill: 'Shield Usage', level: 1 }
    ]
  },
  wizard: {
    skills: [
      { skill: 'Light Piercing', level: 1 },
      { skill: 'Theurgism', level: 1 },
      { skill: 'Meditation', level: 2 }
    ],
    magic: {
      good: [
        { skill: 'Sorcery', level: 1 },
        { skill: 'Mysticism', level: 1 },
        { skill: 'Thaumaturgy', level: 2 }
      ],
      neutral: [
        { skill: 'Sorcery', level: 1 },
        { skill: 'Elementalism', level: 2 },
        { skill: 'Mysticism', level: 1 }
      ],
      evil: [
        { skill: 'Sorcery', level: 1 },
        { skill: 'Mysticism', level: 1 },
        { skill: 'Necromancy', level: 2 }
      ]
    }
  },
  thief: {
    skills: [
      { skill: 'Light Piercing', level: 1 },
      { skill: 'Light One-Handed', level: 1 },
      { skill: 'Healing', level: 1 },
      { skill: 'Acrobatics', level: 2 },
      { skill: 'Disarm Traps', level: 1 },
      { skill: 'Critical Strike', level: 2 }
    ]
  }
};

type PvPInfo = {
  off: string;
  on: string;
};

export const pvpInfo: PvPInfo = {
  off: 'With player vs. player combat turned off - other players are not permitted to attack you.  This is a good choice for players new to The Realm.  You can always decide to participate in player vs. player combat at a later time.',
  on: 'With player vs. player combat turned on you may be attacked by other players who choose to participate in player vs. player combat.'
};

export const races: Races[] = ['human', 'orc', 'giant', 'elf'];
type Races = 'human' | 'orc' | 'giant' | 'elf';

export const classes: Classes[] = ['adventurer', 'warrior', 'wizard', 'thief'];
type Classes = 'adventurer' | 'warrior' | 'wizard' | 'thief';

export const alignments: Alignments[] = ['good', 'neutral', 'evil'];
type Alignments = 'good' | 'neutral' | 'evil';

export const pvpOptions: PvPOptions[] = ['off', 'on'];
type PvPOptions = 'off' | 'on';

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
    adventurer: { strength: 10, dexterity: 10, intelligence: 10, endurance: 10 },
    warrior: { strength: 12, dexterity: 11, intelligence: 6, endurance: 11 },
    wizard: { strength: 6, dexterity: 11, intelligence: 14, endurance: 9 },
    thief: { strength: 9, dexterity: 13, intelligence: 8, endurance: 10 }
  },
  orc: {
    adventurer: { strength: 11, dexterity: 10, intelligence: 8, endurance: 11 },
    warrior: { strength: 13, dexterity: 11, intelligence: 4, endurance: 12 },
    wizard: { strength: 7, dexterity: 11, intelligence: 12, endurance: 10 },
    thief: { strength: 10, dexterity: 13, intelligence: 6, endurance: 11 }
  },
  giant: {
    adventurer: { strength: 14, dexterity: 6, intelligence: 6, endurance: 14 },
    warrior: { strength: 16, dexterity: 7, intelligence: 2, endurance: 15 },
    wizard: { strength: 10, dexterity: 7, intelligence: 10, endurance: 13 },
    thief: { strength: 13, dexterity: 9, intelligence: 4, endurance: 14 }
  },
  elf: {
    adventurer: { strength: 7, dexterity: 14, intelligence: 13, endurance: 6 },
    warrior: { strength: 9, dexterity: 15, intelligence: 9, endurance: 7 },
    wizard: { strength: 3, dexterity: 15, intelligence: 17, endurance: 5 },
    thief: { strength: 6, dexterity: 17, intelligence: 11, endurance: 6 }
  }
};

export type Character = {
  strength: number;
  dexterity: number;
  intelligence: number;
  endurance: number;
  race: Races;
  class: Classes;
  alignment: Alignments;
  pvp: PvPOptions;
  availablePoints: number;
};
