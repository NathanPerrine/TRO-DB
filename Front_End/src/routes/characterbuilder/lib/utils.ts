import type { SkillLevel, SkillName, StartingSkill } from './types';
import { SKILL_LEVELS, SKILL_COSTS, classStartingSkills } from './constants';

/**
 * Calculates the total cost to reach a given skill level
 */
export function getCumulativeCost(targetLevel: SkillLevel): number {
  let cost = 0;
  for (const level of SKILL_LEVELS) {
    cost += SKILL_COSTS[level];
    if (level === targetLevel) break;
  }
  return cost;
}

/**
 * Gets the next available skill level, if any
 */
export function getNextLevel(currentLevel: SkillLevel | null): SkillLevel | null {
  if (!currentLevel) return 'Familiar';
  const currentIndex = SKILL_LEVELS.indexOf(currentLevel);
  return currentIndex < SKILL_LEVELS.length - 1 ? SKILL_LEVELS[currentIndex + 1] : null;
}

/**
 * Gets the previous skill level, if any
 */
export function getPreviousLevel(currentLevel: SkillLevel | null): SkillLevel | null {
  if (!currentLevel) return null;
  const currentIndex = SKILL_LEVELS.indexOf(currentLevel);
  return currentIndex > 0 ? SKILL_LEVELS[currentIndex - 1] : null;
}

/**
 * Gets the starting level for a skill based on class and alignment
 */
export function getStartingLevel(
  skillName: SkillName,
  characterClass: keyof typeof classStartingSkills,
  alignment: 'good' | 'neutral' | 'evil'
): StartingSkill | null {
  // Check base class skills
  const baseSkill = classStartingSkills[characterClass].skills.find((s) => s.skill === skillName);
  if (baseSkill) return baseSkill;

  // Check magic skills for applicable classes
  if (characterClass === 'adventurer' || characterClass === 'wizard') {
    const magicSkills = classStartingSkills[characterClass].magic[alignment];
    const magicSkill = magicSkills.find((s) => s.skill === skillName);
    if (magicSkill) return magicSkill;
  }

  return null;
}

/**
 * Returns a description of a skill score
 */
export function getScoreDescription(score: number): string {
  if (score <= 5) return 'Terrible';
  if (score <= 8) return 'Poor';
  if (score <= 13) return 'Average';
  if (score <= 17) return 'Good';
  if (score <= 21) return 'Excellent';
  return 'Fantastic';
}

/**
 * Checks if a skill is a starting skill for a given class and alignment
 */
export function isStartingSkill(
  skillName: SkillName,
  characterClass: keyof typeof classStartingSkills,
  alignment: 'good' | 'neutral' | 'evil'
): boolean {
  const classSkills = classStartingSkills[characterClass].skills;
  const hasSkill = classSkills.some((s) => s.skill === skillName);

  if (characterClass === 'adventurer' || characterClass === 'wizard') {
    const magicSkills = classStartingSkills[characterClass].magic[alignment];
    return hasSkill || magicSkills.some((s) => s.skill === skillName);
  }

  return hasSkill;
}

/**
 * Checks if a skill level can be decreased (not below starting level)
 */
export function isDecreaseDisabled(
  skillName: SkillName,
  currentLevel: SkillLevel,
  characterClass: keyof typeof classStartingSkills,
  alignment: 'good' | 'neutral' | 'evil'
): boolean {
  if (currentLevel === 'Untrained') return true;

  const startingSkill = getStartingLevel(skillName, characterClass, alignment);
  if (!startingSkill) return false;

  return SKILL_LEVELS.indexOf(currentLevel) <= SKILL_LEVELS.indexOf(startingSkill.rank);
}

/**
 * Checks if a skill level can be increased (based on available points)
 */
export function isIncreaseDisabled(
  currentLevel: SkillLevel,
  totalPoints: number,
  availableSkillPoints: number
): boolean {
  const nextLevel = getNextLevel(currentLevel);
  return !nextLevel || totalPoints + SKILL_COSTS[nextLevel] > availableSkillPoints;
}
