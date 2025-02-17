<script lang="ts">
  import type { Character, Stats } from '../lib/types';
  import { races, classes, alignments, pvpOptions, raceClassStats } from '../lib/constants';
  import { createCharacter } from '../lib/factories';

  type StatType = Stats | 'availablePoints' | 'race' | 'class' | 'alignment' | 'pvp';
  type BackgroundKey = 'race' | 'class' | 'alignment' | 'pvp';

  let { character = $bindable(), stat }: { character: Character; stat: StatType } = $props();

  function updateStat(amount: number) {
    if (isAttributeStat(stat)) {
      // Increase
      if (character.attributes.availableStatPoints > 0 && amount > 0) {
        character.attributes.availableStatPoints -= amount;
        character.attributes[stat] += amount;
      }
      // Decrease
      else if (amount < 0) {
        const baseStatValue =
          raceClassStats[character.background.race][character.background.class][stat];
        if (character.attributes[stat] > baseStatValue) {
          character.attributes.availableStatPoints -= amount;
          character.attributes[stat] += amount;
        }
      }
    }
  }

  // Type guard to check if a stat is an attribute stat
  function isAttributeStat(stat: StatType): stat is Stats {
    return ['strength', 'dexterity', 'intelligence', 'endurance'].includes(stat);
  }

  // Type guard to check if a stat is a background stat
  function isBackgroundStat(stat: StatType): stat is BackgroundKey {
    return ['race', 'class', 'alignment', 'pvp'].includes(stat);
  }

  const changeSelection = (attribute: BackgroundKey, direction: number) => {
    let currentChoices: readonly string[];
    switch (attribute) {
      case 'race':
        currentChoices = races;
        break;
      case 'class':
        currentChoices = classes;
        break;
      case 'alignment':
        currentChoices = alignments;
        break;
      case 'pvp':
        currentChoices = pvpOptions;
        break;
    }

    const currentIndex = currentChoices.indexOf(character.background[attribute]);
    const newIndex = (currentIndex + direction + currentChoices.length) % currentChoices.length;
    const newValue = currentChoices[newIndex];

    character = createCharacter({
      ...character.background,
      [attribute]: newValue
    });
  };
</script>

{#if isAttributeStat(stat)}
  <div class="stat-container">
    <h3 class="stat capitalize text-center">{stat}</h3>
    <div class="stat-selectors">
      <button class="stat-minus" onclick={() => updateStat(-1)}>-</button>
      <div class="sphere stat-value">{character.attributes[stat]}</div>
      <button class="stat-plus" onclick={() => updateStat(1)}>+</button>
    </div>
  </div>
{:else if stat === 'availablePoints'}
  <div class="stat-container">
    <h3 class="stat text-center">Available Points</h3>
    <div class="stat-selectors">
      <div class="sphere stat-value">{character.attributes.availableStatPoints}</div>
    </div>
  </div>
{:else if isBackgroundStat(stat)}
  <div class="stat-container">
    <h3 class="stat capitalize text-center">{stat}</h3>
    <div class="stat-selectors">
      <button class="stat-minus arrow-left" onclick={() => changeSelection(stat, -1)}>←</button>
      <div class="stat-value capitalize text-md">
        {character.background[stat]}
      </div>
      <button class="stat-plus arrow-right" onclick={() => changeSelection(stat, 1)}>→</button>
    </div>
  </div>
{/if}

<style lang="scss">
  button {
    padding: 0;
  }

  .stat-container {
    display: flex;
    flex-direction: column;
    width: 175px;

    .stat-selectors {
      width: 175px;
      margin-top: 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .stat-value {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 50px;
      font-size: 24px;
    }

    .text-md {
      font-size: 18px;
    }

    .sphere {
      height: 50px;
      width: 50px;
      background-color: var(--color-accent-hover);
      color: var(--color-text);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      box-shadow: inset 0 0 10px var(--color-accent);
      position: relative;

      &::after {
        background-color: var(--color-text);
        content: '';
        height: 30%;
        width: 15%;
        left: 18%;
        top: 10%;
        position: absolute;
        border-radius: 50%;
        transform: rotate(45deg);
      }
    }

    .stat-minus,
    .stat-plus {
      width: 24px;
      height: 24px;
    }
  }
</style>
