/**
 * Character Save System
 *
 * This file handles saving and loading character builds via URL strings.
 * The save string format is versioned to handle future updates to the skill system.
 *
 * Save String Format:
 * version|attributes|skills|background
 *
 * Example V1 format:
 * "1|0c:0a:08:0b:03|1:2:0:0:1:0:0:0|h,z,g,f"
 *
 * Sections:
 * - version: Indicates save string format version (e.g. "1")
 * - attributes: Colon-separated hex values for str:dex:int:end:points
 * - skills: Colon-separated hex values for skill ranks in order of AVAILABLE_SKILLS_V1
 * - background: Comma-separated initials for race,class,alignment,pvp
 *
 * IMPORTANT: Version Management
 * - AVAILABLE_SKILLS array order must never change to maintain compatibility
 * - When adding new skills:
 *   1. Create AVAILABLE_SKILLS_V2 including all V1 skills plus new ones
 *   2. Add createCharacterFromV2Format handler
 *   3. Update characterToUrlString to use V2 format
 *   4. Add new version case in createCharacterFromUrl switch
 */

import type {
  Character,
  Races,
  Classes,
  Alignments,
  PvPOptions,
  SkillName,
  SkillLevel
} from './types';
import { createCharacter } from './factories';
import {
  SKILL_LEVELS,
  AVAILABLE_SKILLS,
  races,
  classes,
  alignments,
  pvpOptions,
  raceClassStats,
  MAX_SKILL_POINTS
} from './constants';

function validateCharacter(character: Character): void {
  const errors: string[] = [];

  // Validate background
  if (!races.includes(character.background.race)) {
    errors.push(`Invalid race: ${character.background.race}`);
  }
  if (!classes.includes(character.background.class)) {
    errors.push(`Invalid class: ${character.background.class}`);
  }
  if (!alignments.includes(character.background.alignment)) {
    errors.push(`Invalid alignment: ${character.background.alignment}`);
  }
  if (!pvpOptions.includes(character.background.pvp)) {
    errors.push(`Invalid PvP setting: ${character.background.pvp}`);
  }

  // Validate attributes
  const baseStats = raceClassStats[character.background.race][character.background.class];

  // Check base stat requirements
  if (character.attributes.strength < baseStats.strength) {
    errors.push(`Strength cannot be lower than base value: ${baseStats.strength}`);
  }
  if (character.attributes.dexterity < baseStats.dexterity) {
    errors.push(`Dexterity cannot be lower than base value: ${baseStats.dexterity}`);
  }
  if (character.attributes.intelligence < baseStats.intelligence) {
    errors.push(`Intelligence cannot be lower than base value: ${baseStats.intelligence}`);
  }
  if (character.attributes.endurance < baseStats.endurance) {
    errors.push(`Endurance cannot be lower than base value: ${baseStats.endurance}`);
  }

  // Calculate total points spent
  const pointsSpent =
    character.attributes.strength -
    baseStats.strength +
    character.attributes.dexterity -
    baseStats.dexterity +
    character.attributes.intelligence -
    baseStats.intelligence +
    character.attributes.endurance -
    baseStats.endurance;

  // Initial points available is 8
  const INITIAL_STAT_POINTS = 8;
  if (pointsSpent > INITIAL_STAT_POINTS) {
    errors.push(
      `Too many attribute points spent. Used ${pointsSpent} out of ${INITIAL_STAT_POINTS} available points`
    );
  }

  // Validate available points remaining matches what should be left
  const expectedAvailablePoints = INITIAL_STAT_POINTS - pointsSpent;
  if (character.attributes.availableStatPoints !== expectedAvailablePoints) {
    errors.push(
      `Available stat points (${character.attributes.availableStatPoints}) does not match expected value (${expectedAvailablePoints})`
    );
  }

  // Validate skills
  const skillEntries = Object.entries(character.skills).filter(
    (entry): entry is [SkillName, { rank: SkillLevel; rankValue: number }] =>
      entry[0] !== 'availableSkillPoints' && typeof entry[1] === 'object'
  );

  // Validate each skill's level and rankValue
  for (const [skillName, info] of skillEntries) {
    // Check if rankValue is valid
    if (info.rankValue < 0 || info.rankValue >= SKILL_LEVELS.length) {
      errors.push(
        `Invalid rank value ${info.rankValue} for skill ${skillName}. Must be between 0 and ${SKILL_LEVELS.length - 1}`
      );
    }

    // Check if rank matches rankValue
    const expectedRank = SKILL_LEVELS[info.rankValue];
    if (info.rank !== expectedRank) {
      errors.push(
        `Skill ${skillName} rank (${info.rank}) does not match its rank value (${info.rankValue}, should be ${expectedRank})`
      );
    }
  }

  // Validate total skill points
  const totalSkillPoints = skillEntries.reduce((total, [, info]) => total + info.rankValue, 0);
  if (totalSkillPoints > MAX_SKILL_POINTS) {
    errors.push(
      `Total skill points (${totalSkillPoints}) exceeds maximum allowed (${MAX_SKILL_POINTS})`
    );
  }

  if (errors.length > 0) {
    throw new Error(`Invalid character configuration:\n\n${errors.join('\n')}`);
  }
}

/**
 * Converts a character to a URL-friendly save string
 */
export function characterToUrlString(character: Character): string {
  try {
    // Validate character before saving
    validateCharacter(character);

    // Convert attributes to hex values and pad with zeros
    const attrs = [
      character.attributes.strength,
      character.attributes.dexterity,
      character.attributes.intelligence,
      character.attributes.endurance,
      character.attributes.availableStatPoints
    ]
      .map((num) => num.toString(16).padStart(2, '0'))
      .join(':');

    // Convert all skills to hex values using version 1 skill list
    const skills = AVAILABLE_SKILLS.map((skillName) => {
      const skill = character.skills[skillName];
      return skill.rankValue.toString(16);
    }).join(':');

    // Create background string
    const background = [
      character.background.race.charAt(0),
      character.background.class.slice(0, 2),
      character.background.alignment.charAt(0),
      character.background.pvp === 'on' ? 'n' : 'f'
    ].join(',');

    // Version 1 format: "1|attributes|skills|background"
    return ['1', attrs, skills, background].join('|');
  } catch (error) {
    // throw new Error(`Invalid character configuration:\n\n${errors.join('\n')}`);
    console.error('Error creating URL string:', error);
    throw new Error(`Failed to create URL save string:\n\n${error}`);
  }
}

/**
 * Creates a character from a URL save string
 */
export function createCharacterFromUrl(saveString: string): Character {
  const [version, ...parts] = saveString.split('|');

  switch (version) {
    case '1':
      return createCharacterFromV1Format(parts);
    // Add future version handlers here
    // case '2':
    //   return createCharacterFromV2Format(parts);
    default:
      throw new Error(`Invalid URL save string: unsupported version "${version}"`);
  }
}

function createCharacterFromV1Format(parts: string[]): Character {
  if (parts.length !== 3) {
    throw new Error('Invalid v1 format: wrong number of sections');
  }

  const [attrs, skills, backgroundStr] = parts;

  const attrValues = attrs.split(':').map((hex) => parseInt(hex, 16));
  const [str, dex, int, end, points] = attrValues;

  const skillValues = skills.split(':').map((hex) => parseInt(hex, 16));
  const [race, cls, align, pvp] = backgroundStr.split(',');

  const character = createCharacter({
    race: getRaceFromInitial(race),
    class: getClassFromInitial(cls),
    alignment: getAlignmentFromInitial(align),
    pvp: getPvpFromInitial(pvp)
  });

  character.attributes = {
    strength: str,
    dexterity: dex,
    intelligence: int,
    endurance: end,
    availableStatPoints: points
  };

  AVAILABLE_SKILLS.forEach((skillName, index) => {
    if (index < skillValues.length) {
      const rankValue = skillValues[index];
      character.skills[skillName] = {
        rank: SKILL_LEVELS[rankValue],
        rankValue: rankValue
      };
    }
  });

  validateCharacter(character);
  return character;
}

// Helper functions for converting initials to full values
const raceMap = new Map<string, Races>([
  ['h', 'human'],
  ['o', 'orc'],
  ['g', 'giant'],
  ['e', 'elf']
]);

function getRaceFromInitial(initial: string): Races {
  const race = raceMap.get(initial);
  if (!race) {
    throw new Error(`Invalid race code: "${initial}"`);
  }
  return race;
}

const classMap = new Map<string, Classes>([
  ['ad', 'adventurer'],
  ['wa', 'warrior'],
  ['wi', 'wizard'],
  ['th', 'thief']
]);

function getClassFromInitial(initial: string): Classes {
  const characterClass = classMap.get(initial);
  if (!characterClass) {
    throw new Error(`Invalid class code: "${initial}"`);
  }
  return characterClass;
}

const alignmentMap = new Map<string, Alignments>([
  ['g', 'good'],
  ['n', 'neutral'],
  ['e', 'evil']
]);

function getAlignmentFromInitial(initial: string): Alignments {
  const alignment = alignmentMap.get(initial);
  if (!alignment) {
    throw new Error(`Invalid alignment code: "${initial}"`);
  }
  return alignment;
}

const pvpMap = new Map<string, PvPOptions>([
  ['o', 'on'],
  ['f', 'off']
]);

function getPvpFromInitial(initial: string): PvPOptions {
  const pvp = pvpMap.get(initial);
  if (!pvp) {
    throw new Error(`Invalid PvP code: "${initial}"`);
  }
  return pvp;
}
