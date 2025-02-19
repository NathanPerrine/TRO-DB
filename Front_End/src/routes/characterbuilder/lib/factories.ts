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
  races,
  classes,
  alignments,
  pvpOptions,
  SKILL_LEVELS
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

type SkillEntry = { rank: SkillLevel; rankValue: number };
type CharacterSkillsEntry = [string, SkillEntry | number];

function isSkillEntry(entry: CharacterSkillsEntry): entry is [SkillName, SkillEntry] {
  return (
    entry[0] !== 'availableSkillPoints' &&
    typeof entry[1] === 'object' &&
    entry[1] !== null &&
    'rank' in entry[1]
  );
}

/**
 * Converts a character object to a compact string representation
 */
export function characterToSaveString(character: Character): string {
  try {
    // Pack attributes into comma-separated string
    const attrs = [
      character.attributes.strength,
      character.attributes.dexterity,
      character.attributes.intelligence,
      character.attributes.endurance,
      character.attributes.availableStatPoints
    ].join(',');

    // Pack skills into compact format, skipping Untrained skills
    const skills = Object.entries(character.skills)
      .filter(
        (entry): entry is [SkillName, SkillEntry] =>
          isSkillEntry(entry) && entry[1].rank !== 'Untrained'
      )
      .map(([skill, info]) => `${skill}:${info.rank}`)
      .join(',');

    // Combine all parts with delimiter
    const parts = [
      'v1',
      character.background.race,
      character.background.class,
      character.background.alignment,
      character.background.pvp,
      attrs,
      skills
    ].join('|');

    // Convert to base64url for safe transport
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(parts);
    return arrayBufferToBase64url(binaryData);
  } catch (error) {
    console.error('Error serializing character:', error);
    throw new Error('Failed to serialize character data');
  }
}

/**
 * Creates a character from a save string
 * @throws Will throw an error if the string is invalid
 */
export function createCharacterFromSave(saveString: string): Character {
  try {
    // Decode base64url to string
    const binaryData = base64urlToArrayBuffer(saveString);
    const decoder = new TextDecoder();
    const parts = decoder.decode(binaryData).split('|');

    // Validate version
    if (parts[0] !== 'v1') throw new Error('Unsupported save version');

    // Extract basic info
    const [, race, characterClass, alignment, pvp, attrs, skillData] = parts;

    // Validate background data
    if (!isValidRace(race)) throw new Error(`Invalid race: ${race}`);
    if (!isValidClass(characterClass)) throw new Error(`Invalid class: ${characterClass}`);
    if (!isValidAlignment(alignment)) throw new Error(`Invalid alignment: ${alignment}`);
    if (!isValidPvP(pvp)) throw new Error(`Invalid PvP setting: ${pvp}`);

    // Parse attributes
    const [str, dex, int, end, points] = attrs.split(',').map(Number);

    // Create base character with background
    const character = createCharacter({
      race: race as Races,
      class: characterClass as Classes,
      alignment: alignment as Alignments,
      pvp: pvp as PvPOptions
    });

    // Update attributes
    character.attributes = {
      strength: str,
      dexterity: dex,
      intelligence: int,
      endurance: end,
      availableStatPoints: points
    };

    // Parse skill data
    if (skillData) {
      skillData.split(',').forEach((pair) => {
        const [skillName, level] = pair.split(':');
        if (isValidSkill(skillName) && isValidSkillLevel(level)) {
          character.skills[skillName as SkillName] = {
            rank: level as SkillLevel,
            rankValue: SKILL_LEVELS.indexOf(level as SkillLevel)
          };
        }
      });
    }

    return character;
  } catch (error) {
    console.error('Error deserializing character:', error);
    throw new Error('Invalid character save string');
  }
}

// Type guards for validation
function isValidRace(race: string): race is Races {
  return races.includes(race as Races);
}

function isValidClass(characterClass: string): characterClass is Classes {
  return classes.includes(characterClass as Classes);
}

function isValidAlignment(alignment: string): alignment is Alignments {
  return alignments.includes(alignment as Alignments);
}

function isValidPvP(pvp: string): pvp is PvPOptions {
  return pvpOptions.includes(pvp as PvPOptions);
}

function isValidSkill(skill: string): skill is SkillName {
  return AVAILABLE_SKILLS.includes(skill as SkillName);
}

function isValidSkillLevel(level: string): level is SkillLevel {
  return SKILL_LEVELS.includes(level as SkillLevel);
}

/**
 * Converts an ArrayBuffer to a URL-safe base64 string
 */
function arrayBufferToBase64url(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Converts a URL-safe base64 string to an ArrayBuffer
 */
function base64urlToArrayBuffer(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64;
  const binaryString = atob(paddedBase64);
  const buffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}
