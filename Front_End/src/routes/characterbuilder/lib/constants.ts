import type {
  AlignmentInfo,
  ClassInfo,
  ClassSkills,
  PvPInfo,
  RaceClassStats,
  SkillLevel,
  SkillName,
  StatInfo
} from './types';

// Basic Game Constants
export const races = ['human', 'orc', 'giant', 'elf'] as const;
export const classes = ['adventurer', 'warrior', 'wizard', 'thief'] as const;
export const alignments = ['good', 'neutral', 'evil'] as const;
export const pvpOptions = ['off', 'on'] as const;

// Skill System Constants
export const SKILL_LEVELS: SkillLevel[] = [
  'Untrained',
  'Familiar',
  'Proficient',
  'Expert',
  'Master',
  'Grandmaster',
  'Supreme-Master'
];

export const SKILL_COSTS: Record<SkillLevel, number> = {
  Untrained: 0,
  Familiar: 1,
  Proficient: 2,
  Expert: 4,
  Master: 7,
  Grandmaster: 10,
  'Supreme-Master': 13
};

export const MAX_LEVEL = 200;
export const BASE_SKILL_POINTS = 10;
export const INITIAL_FREE_POINTS = 3;

export const MAX_SKILL_POINTS = (() => {
  let total = BASE_SKILL_POINTS + INITIAL_FREE_POINTS;
  total += 99; // 99 points from levels 2-100
  const highLevelIntervals = Math.floor((MAX_LEVEL - 100) / 25);
  total += highLevelIntervals * 10;
  return total;
})();

// Version 1 skill list - must never change order to maintain compatibility for loading old characters
// When new skills are added, create a v2 list that includes all v1 skills plus new ones IF the order changes
// const AVAILABLE_SKILLS_V2: SkillName[] = [];
export const AVAILABLE_SKILLS: SkillName[] = [
  'Light Piercing',
  'Light One-Handed',
  'Light Two-Handed',
  'Heavy Two-Handed',
  'Armorsmith',
  'Weaponsmith',
  'Leatherworker',
  'Seamster',
  'Healing',
  'Acrobatics',
  'Sorcery',
  'Elementalism',
  'Mysticism',
  'Thaumaturgy',
  'Necromancy',
  'Theurgism',
  'Alchemy',
  'Pickpocketing',
  'Disarm Traps',
  'Lockpicking',
  'Meditation',
  'Critical Strikes',
  'Shield Usage'
];

// Race and Class Base Stats
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

// Starting Skills
export const classStartingSkills: ClassSkills = {
  adventurer: {
    skills: [
      { skill: 'Light One-Handed', rank: 'Proficient', rankValue: 2 },
      { skill: 'Healing', rank: 'Familiar', rankValue: 1 },
      { skill: 'Acrobatics', rank: 'Familiar', rankValue: 1 },
      { skill: 'Meditation', rank: 'Familiar', rankValue: 1 },
      { skill: 'Shield Usage', rank: 'Familiar', rankValue: 1 }
    ],
    magic: {
      good: [{ skill: 'Thaumaturgy', rank: 'Proficient', rankValue: 2 }],
      neutral: [{ skill: 'Elementalism', rank: 'Proficient', rankValue: 2 }],
      evil: [{ skill: 'Necromancy', rank: 'Proficient', rankValue: 2 }]
    }
  },
  warrior: {
    skills: [
      { skill: 'Light One-Handed', rank: 'Familiar', rankValue: 1 },
      { skill: 'Light Two-Handed', rank: 'Proficient', rankValue: 2 },
      { skill: 'Heavy Two-Handed', rank: 'Proficient', rankValue: 2 },
      { skill: 'Healing', rank: 'Familiar', rankValue: 1 },
      { skill: 'Acrobatics', rank: 'Familiar', rankValue: 1 },
      { skill: 'Shield Usage', rank: 'Familiar', rankValue: 1 }
    ],
    magic: {
      good: [],
      neutral: [],
      evil: []
    }
  },
  wizard: {
    skills: [
      { skill: 'Light Piercing', rank: 'Familiar', rankValue: 1 },
      { skill: 'Theurgism', rank: 'Familiar', rankValue: 1 },
      { skill: 'Meditation', rank: 'Proficient', rankValue: 2 }
    ],
    magic: {
      good: [
        { skill: 'Sorcery', rank: 'Familiar', rankValue: 1 },
        { skill: 'Mysticism', rank: 'Familiar', rankValue: 1 },
        { skill: 'Thaumaturgy', rank: 'Proficient', rankValue: 2 }
      ],
      neutral: [
        { skill: 'Sorcery', rank: 'Familiar', rankValue: 1 },
        { skill: 'Elementalism', rank: 'Proficient', rankValue: 2 },
        { skill: 'Mysticism', rank: 'Familiar', rankValue: 1 }
      ],
      evil: [
        { skill: 'Sorcery', rank: 'Familiar', rankValue: 1 },
        { skill: 'Mysticism', rank: 'Familiar', rankValue: 1 },
        { skill: 'Necromancy', rank: 'Proficient', rankValue: 2 }
      ]
    }
  },
  thief: {
    skills: [
      { skill: 'Light Piercing', rank: 'Familiar', rankValue: 1 },
      { skill: 'Light One-Handed', rank: 'Familiar', rankValue: 1 },
      { skill: 'Healing', rank: 'Familiar', rankValue: 1 },
      { skill: 'Acrobatics', rank: 'Proficient', rankValue: 2 },
      { skill: 'Disarm Traps', rank: 'Familiar', rankValue: 1 },
      { skill: 'Critical Strikes', rank: 'Proficient', rankValue: 2 }
    ],
    magic: {
      good: [],
      neutral: [],
      evil: []
    }
  }
};

// Game Text and Information
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

export const statInfo: StatInfo = {
  strength:
    'Your strength directly affects your carrying capacity and the amount of melee damage you can inflict. A higher strength will also make the following skills easier to master: short sword, long sword, two-handed sword, club, axe, maul, mace, unarmed combat, shield use, weaponsmith, and armorsmith.',
  dexterity:
    'Your dexterity directly affects your movement rate and the amount of throwing weapon damage you can inflict. A higher dexterity will also make the following skills easier to master: short sword, long sword, mace, unarmed combat, dagger, throwing weapons, shield use, critical striking, acrobatics, detect/disarm traps, pick pockets, pick locks, weaponsmith, and armorsmith.',
  intelligence:
    'Your intelligence directly affects the amount of spell damage you can inflict. A higher intelligence will also make the following skills easier to master: sorcery, elementalism, mysticism, thaumaturgy, necromancy, theurgism, meditation, critical striking, acrobatics, pick locks, alchemy.',
  endurance:
    'Your endurance directly affects the amount of hit points your character has. A high endurance will also make it easier to master the meditation skill.'
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

export const pvpInfo: PvPInfo = {
  off: 'With player vs. player combat turned off - other players are not permitted to attack you. This is a good choice for players new to The Realm. You can always decide to participate in player vs. player combat at a later time.',
  on: 'With player vs. player combat turned on you may be attacked by other players who choose to participate in player vs. player combat.'
};
