import type {
  Character,
  Classes,
  Alignments,
  Races,
  PvPOptions,
  SkillName,
  SkillLevel
} from './types';
import { AVAILABLE_SKILLS, classStartingSkills, raceClassStats } from './constants';

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
      availableSkillPoints: 200,
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

/**
 * Converts a character object to a safe string representation
 */
export function characterToSaveString(character: Character): string {
  try {
    // Convert character to JSON string
    const jsonString = JSON.stringify(character);

    // Convert JSON string to Uint8Array using TextEncoder
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(jsonString);

    // Convert binary data to base64url string
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
    // Convert base64url string to Uint8Array
    const binaryData = base64urlToArrayBuffer(saveString);

    // Convert Uint8Array to JSON string using TextDecoder
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(binaryData);

    // Parse JSON string to character object
    const character = JSON.parse(jsonString);

    // Validate character structure
    if (!isValidCharacter(character)) {
      throw new Error('Invalid character data structure');
    }

    return character;
  } catch (error) {
    console.error('Error deserializing character:', error);
    throw new Error('Invalid character save string');
  }
}

/**
 * Converts an ArrayBuffer to a URL-safe base64 string
 */
function arrayBufferToBase64url(buffer: Uint8Array): string {
  // Convert to regular base64
  const base64 = btoa(String.fromCharCode(...buffer));

  // Make URL-safe by replacing non-URL-safe characters
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Converts a URL-safe base64 string to an ArrayBuffer
 */
function base64urlToArrayBuffer(base64url: string): Uint8Array {
  // Convert from URL-safe to regular base64
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');

  // Add padding if needed
  const padding = base64.length % 4;
  const paddedBase64 = padding ? base64 + '='.repeat(4 - padding) : base64;

  // Convert to binary
  const binaryString = atob(paddedBase64);

  // Convert to Uint8Array
  const buffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }

  return buffer;
}

/**
 * Type guard to validate character structure
 */
// Define a type for the expected shape of raw character data
type RawCharacterData = {
  attributes?: {
    availableStatPoints?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
    endurance?: number;
  };
  background?: {
    race?: string;
    class?: string;
    alignment?: string;
    pvp?: string;
  };
  skills?: {
    availableSkillPoints?: number;
    [key: string]: unknown;
  };
};

function isValidCharacter(obj: RawCharacterData): obj is Character {
  return (
    obj &&
    typeof obj === 'object' &&
    'attributes' in obj &&
    'background' in obj &&
    'skills' in obj &&
    typeof obj.attributes === 'object' &&
    typeof obj.background === 'object' &&
    typeof obj.skills === 'object' &&
    'availableStatPoints' in obj.attributes &&
    'strength' in obj.attributes &&
    'dexterity' in obj.attributes &&
    'intelligence' in obj.attributes &&
    'endurance' in obj.attributes &&
    'race' in obj.background &&
    'class' in obj.background &&
    'alignment' in obj.background &&
    'pvp' in obj.background &&
    'availableSkillPoints' in obj.skills
  );
}
