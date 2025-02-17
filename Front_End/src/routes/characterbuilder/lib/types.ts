export type TextSegment = {
  segments: (string | { text: string; emphasis: boolean })[];
};

export type AlignmentInfo = {
  good: TextSegment;
  neutral: TextSegment;
  evil: TextSegment;
};

export type ClassInfo = {
  adventurer: string;
  warrior: string;
  wizard: string;
  thief: string;
};

export type StatInfo = {
  strength: string;
  dexterity: string;
  intelligence: string;
  endurance: string;
};

export type PvPInfo = {
  off: string;
  on: string;
};

export type Stats = 'strength' | 'dexterity' | 'intelligence' | 'endurance';

export type Character = {
  attributes: {
    availableStatPoints: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    endurance: number;
  };
  background: {
    race: Races;
    class: Classes;
    alignment: Alignments;
    pvp: PvPOptions;
  };
  skills: {
    availableSkillPoints: number;
  } & {
    [key in SkillName]: {
      rank: SkillLevel;
      rankValue: number;
    };
  };
};

export type Races = 'human' | 'orc' | 'giant' | 'elf';
export type Classes = 'adventurer' | 'warrior' | 'wizard' | 'thief';
export type Alignments = 'good' | 'neutral' | 'evil';
export type PvPOptions = 'off' | 'on';

export type SkillLevel =
  | 'Untrained'
  | 'Familiar'
  | 'Proficient'
  | 'Expert'
  | 'Master'
  | 'Grandmaster'
  | 'Supreme-Master';

export type SkillName =
  | 'Light Piercing'
  | 'Light One-Handed'
  | 'Light Two-Handed'
  | 'Heavy Two-Handed'
  | 'Armorsmith'
  | 'Weaponsmith'
  | 'Leatherworker'
  | 'Seamster'
  | 'Healing'
  | 'Acrobatics'
  | 'Sorcery'
  | 'Elementalism'
  | 'Mysticism'
  | 'Thaumaturgy'
  | 'Necromancy'
  | 'Theurgism'
  | 'Alchemy'
  | 'Pickpocketing'
  | 'Disarm Traps'
  | 'Lockpicking'
  | 'Meditation'
  | 'Critical Strikes'
  | 'Shield Usage';

export type StartingSkill = {
  skill: SkillName;
  rank: SkillLevel;
  rankValue: number;
};

export type MagicStartingSkill = {
  good: StartingSkill[];
  neutral: StartingSkill[];
  evil: StartingSkill[];
};

export type ClassSkills = {
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

export type StatBlock = {
  strength: number;
  dexterity: number;
  intelligence: number;
  endurance: number;
};

export type ClassStats = {
  [key in Classes]: StatBlock;
};

export type RaceClassStats = {
  [key in Races]: ClassStats;
};
