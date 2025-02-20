import type {
  Character,
  Classes,
  Alignments,
  Races,
  PvPOptions,
  SkillName,
  SkillLevel
} from './types';
import {
  AVAILABLE_SKILLS,
  classStartingSkills,
  MAX_SKILL_POINTS,
  raceClassStats,
} from './constants';

type CharacterCreationParams = {
  race: Races;
  class: Classes;
  alignment: Alignments;
  pvp: PvPOptions;
};

/**
 * Creates a new character with default values based on race, class, and alignment
 */
export function createCharacter({
  race,
  class: characterClass,
  alignment,
  pvp
}: CharacterCreationParams): Character {
  // Initialize all skills as untrained
  const defaultSkills: { [key in SkillName]: { rank: SkillLevel; rankValue: number } } =
    Object.fromEntries(
      AVAILABLE_SKILLS.map((skill) => [skill, { rank: 'Untrained', rankValue: 0 }])
    ) as { [key in SkillName]: { rank: SkillLevel; rankValue: number } };

  // Set base class skills
  classStartingSkills[characterClass].skills.forEach((skill) => {
    defaultSkills[skill.skill] = {
      rank: skill.rank,
      rankValue: skill.rankValue
    };
  });

  // Set alignment-specific magic skills for applicable classes
  if (characterClass === 'adventurer' || characterClass === 'wizard') {
    classStartingSkills[characterClass].magic[alignment].forEach((skill) => {
      defaultSkills[skill.skill] = {
        rank: skill.rank,
        rankValue: skill.rankValue
      };
    });
  }

  // Create and return the character object
  return {
    attributes: {
      availableStatPoints: 8,
      strength: raceClassStats[race][characterClass].strength,
      dexterity: raceClassStats[race][characterClass].dexterity,
      intelligence: raceClassStats[race][characterClass].intelligence,
      endurance: raceClassStats[race][characterClass].endurance
    },
    background: {
      race,
      class: characterClass,
      alignment,
      pvp
    },
    skills: {
      availableSkillPoints: MAX_SKILL_POINTS,
      ...defaultSkills
    }
  };
}

/**
 * Creates a default character with predefined values
 */
export function createDefaultCharacter(): Character {
  return createCharacter({
    race: 'human',
    class: 'adventurer',
    alignment: 'good',
    pvp: 'off'
  });
}

/**
 * Creates a new character while preserving skills if possible
 */
export function createCharacterPreservingSkills(
  oldCharacter: Character,
  newBackground: {
    race: Races;
    class: Classes;
    alignment: Alignments;
    pvp: PvPOptions;
  }
): Character {
  // Create the new character
  const newCharacter = createCharacter(newBackground);

  // Only preserve skills if class and alignment haven't changed
  if (
    oldCharacter.background.class === newBackground.class &&
    oldCharacter.background.alignment === newBackground.alignment
  ) {
    newCharacter.skills = oldCharacter.skills;
  }

  return newCharacter;
}
