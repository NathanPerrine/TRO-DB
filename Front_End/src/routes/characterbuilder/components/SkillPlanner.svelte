<script lang="ts">
  import type { Character, SkillLevel, SkillName } from '../lib/types';
  import { SKILL_LEVELS, SKILL_COSTS } from '../lib/constants';
  import {
    getCumulativeCost,
    getNextLevel,
    isStartingSkill,
    isDecreaseDisabled,
    isIncreaseDisabled
  } from '../lib/utils';

  let { character = $bindable() }: { character: Character } = $props();

  // Calculate total points used
  let totalPoints = $derived(
    Object.entries(character.skills)
      .filter(
        (entry): entry is [SkillName, { rank: SkillLevel; rankValue: number }] =>
          entry[0] !== 'availableSkillPoints'
      )
      .reduce((total, [_, skillInfo]) => {
        return total + getCumulativeCost(skillInfo.rank);
      }, 0)
  );

  let remainingPoints = $derived(character.skills.availableSkillPoints - totalPoints);

  function increaseSkill(skillName: SkillName) {
    const currentLevel = character.skills[skillName].rank;
    const nextLevel = getNextLevel(currentLevel);

    if (!nextLevel) return;

    const newTotal = totalPoints + SKILL_COSTS[nextLevel];
    if (newTotal > character.skills.availableSkillPoints) return;

    character.skills = {
      ...character.skills,
      [skillName]: {
        rank: nextLevel,
        rankValue: SKILL_LEVELS.indexOf(nextLevel)
      }
    };
  }

  function decreaseSkill(skillName: SkillName) {
    const currentLevel = character.skills[skillName].rank;

    // Don't allow decreasing if disabled
    if (
      isDecreaseDisabled(
        skillName,
        currentLevel,
        character.background.class,
        character.background.alignment
      )
    ) {
      return;
    }

    character.skills = {
      ...character.skills,
      [skillName]: {
        rank: SKILL_LEVELS[SKILL_LEVELS.indexOf(currentLevel) - 1],
        rankValue: SKILL_LEVELS.indexOf(currentLevel) - 1
      }
    };
  }

  // Group skills by category
  const SKILL_CATEGORIES: Record<string, SkillName[]> = {
    Melee: [
      'Light Piercing',
      'Light One-Handed',
      'Light Two-Handed',
      'Heavy Two-Handed',
      'Shield Usage',
      'Critical Strikes'
    ],
    Crafting: ['Armorsmith', 'Weaponsmith', 'Leatherworker', 'Seamster'],
    Magic: ['Sorcery', 'Elementalism', 'Mysticism', 'Thaumaturgy', 'Necromancy', 'Theurgism'],
    Utility: ['Healing', 'Acrobatics', 'Meditation', 'Alchemy'],
    Thievery: ['Pickpocketing', 'Disarm Traps', 'Lockpicking']
  } as const;
</script>

<div class="skill-planner">
  <div class="points-container">
    <h3>Skill Points: {remainingPoints} / {character.skills.availableSkillPoints}</h3>
    <div class="progress-bar">
      <div
        class="progress"
        style="width: {(totalPoints / character.skills.availableSkillPoints) * 100}%"
        class:warning={remainingPoints < 50}
        class:danger={remainingPoints < 20}
      ></div>
    </div>
  </div>

  {#each Object.entries(SKILL_CATEGORIES) as [category, skills]}
    <div class="skill-category">
      <h3>{category}</h3>
      <div class="skills-grid">
        {#each skills as skillName}
          {@const currentLevel = character.skills[skillName].rank}
          {@const starting = isStartingSkill(
            skillName,
            character.background.class,
            character.background.alignment
          )}
          {@const isActive = currentLevel !== 'Untrained'}
          <div class="skill-item" class:starting-skill={starting} class:active-skill={isActive}>
            <div class="skill-header">
              <span>{skillName}</span>
              <span class="skill-level">{currentLevel}</span>
            </div>
            <div class="skill-progress">
              {#each SKILL_LEVELS.slice(1) as level, i}
                {@const isActive = SKILL_LEVELS.indexOf(currentLevel) > i}
                <div
                  class="level-indicator"
                  class:active={isActive}
                  title={`${level} (${SKILL_COSTS[level]} points)`}
                ></div>
              {/each}
            </div>
            <div class="skill-controls">
              <button
                class="decrease"
                disabled={isDecreaseDisabled(
                  skillName,
                  currentLevel,
                  character.background.class,
                  character.background.alignment
                )}
                onclick={() => decreaseSkill(skillName)}>-</button
              >
              <button
                class="increase"
                disabled={isIncreaseDisabled(
                  currentLevel,
                  totalPoints,
                  character.skills.availableSkillPoints
                )}
                onclick={() => increaseSkill(skillName)}>+</button
              >
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .skill-planner {
    padding: 20px;

    .points-container {
      position: sticky;
      top: 0;
      z-index: 10;
      margin-bottom: 20px;
      padding: 15px;
      background-color: color-mix(in srgb, var(--color-background) 90%, transparent);
      backdrop-filter: blur(5px);
      border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;

      .progress-bar {
        margin-top: 10px;
        height: 10px;
        background-color: var(--color-accent);
        border-radius: 5px;
        overflow: hidden;

        .progress {
          height: 100%;
          background-color: var(--color-text-accent);
          transition: width 0.3s ease;

          &.warning {
            background-color: var(--color-rarity-orange);
          }

          &.danger {
            background-color: var(--color-rarity-red);
          }
        }
      }
    }

    .skill-category {
      margin-bottom: 20px;

      h3 {
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid var(--color-border);
        color: var(--color-header);
      }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
    }

    .skill-item {
      position: relative;
      padding: 15px;
      background-color: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      transition: border-color 0.2s ease;

      &.starting-skill {
        border-color: var(--color-rarity-green);

        &::before {
          content: 'Starting Skill';
          position: absolute;
          top: 2px;
          right: 5px;
          font-size: 0.7em;
          color: var(--color-rarity-green);
        }
      }

      &.active-skill {
        border-color: var(--color-text-accent);
      }

      .skill-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .skill-level {
        font-style: italic;
        color: var(--color-text-accent);
      }

      .skill-progress {
        display: flex;
        gap: 4px;
        margin-bottom: 10px;

        .level-indicator {
          flex: 1;
          height: 6px;
          background-color: var(--color-accent);
          border-radius: 3px;
          transition: background-color 0.2s ease;

          &.active {
            background-color: var(--color-text-accent);
          }
        }
      }

      .skill-controls {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        button {
          width: 24px;
          height: 24px;
          padding: 0;
          background-color: var(--color-button-bg);
          color: var(--color-button-text);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;

          &:disabled {
            cursor: not-allowed;
          }

          &:hover:not(:disabled) {
            background-color: var(--color-button-hover);
            transform: scale(1.05);
          }

          &:active:not(:disabled) {
            transform: scale(0.9);
          }
        }
      }
    }
  }
</style>
