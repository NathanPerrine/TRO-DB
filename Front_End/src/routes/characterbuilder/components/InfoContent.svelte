<script lang="ts">
  import type { Character, Stats } from '../lib/types';
  import {
    alignmentInfo,
    classInfo,
    classStartingSkills,
    pvpInfo,
    raceClassStats,
    statInfo
  } from '../lib/constants';
  import { getScoreDescription } from '../lib/utils';
  import TextWithEmphasis from '$lib/components/Text/TextWithEmphasis.svelte';

  let { stat, character }: { stat: string; character: Character } = $props();

  function getBaseStat(stat: Stats) {
    return raceClassStats[character.background.race][character.background.class][stat];
  }

  // Get magic skills for the current class
  const magicSkills = $derived(classStartingSkills[character.background.class].magic);

  // Check if the class has any magic skills (for display purposes)
  const hasMagicSkills = $derived(
    magicSkills.good.length > 0 || magicSkills.neutral.length > 0 || magicSkills.evil.length > 0
  );
</script>

<section>
  <!-- Character Base Info section -->
  {#if stat === 'characterInfo'}
    <div class="info-content">
      <p>
        As
        {#if character.background.race === 'human' || character.background.race === 'giant'}a{:else}an{/if}
        <span class="text-emphasis">{character.background.race} {character.background.class}</span>,
        your base attributes are set at Strength
        <span class="text-emphasis">{getBaseStat('strength')}</span>, Dexterity:
        <span class="text-emphasis">{getBaseStat('dexterity')}</span>, Intelligence:
        <span class="text-emphasis">{getBaseStat('intelligence')}</span>, Endurance:
        <span class="text-emphasis">{getBaseStat('endurance')}</span>. Your attribute points may be
        divided in any way among your four base attributes.
      </p>
    </div>

    <!-- Character Stat section -->
  {:else if stat === 'strength' || stat === 'dexterity' || stat === 'intelligence' || stat === 'endurance'}
    <div class="info-content">
      <blockquote class="quote">
        {#if stat === 'strength' || stat === 'dexterity'}A{:else}An{/if}
        {stat} of <span class="text-emphasis">{character.attributes[stat]}</span> is considered
        <span class="text-emphasis">{getScoreDescription(character.attributes[stat])}</span>.
      </blockquote>

      <p>{statInfo[stat]}</p>
    </div>

    <!-- Character Alignment section -->
  {:else if stat === 'alignment'}
    <div class="info-content">
      <p>
        {#if character.background.alignment === 'good'}
          <TextWithEmphasis segments={alignmentInfo.good.segments} />
        {:else if character.background.alignment === 'neutral'}
          <TextWithEmphasis segments={alignmentInfo.neutral.segments} />
        {:else if character.background.alignment === 'evil'}
          <TextWithEmphasis segments={alignmentInfo.evil.segments} />
        {/if}
      </p>
    </div>

    <!-- Character PvP section -->
  {:else if stat === 'pvp'}
    <div class="info-content">
      <p>
        {#if character.background.pvp === 'on'}
          {pvpInfo.on}
        {:else if character.background.pvp === 'off'}
          {pvpInfo.off}
        {/if}
      </p>
    </div>
  {:else if stat === 'class'}
    <div class="info-content">
      <blockquote class="quote capitalize">{character.background.class}</blockquote>
    </div>
    <div class="info-content">
      <p>{classInfo[character.background.class]}</p>
    </div>
    <div class="info-content">
      <p>
        As {#if character.background.class === 'adventurer'}an{:else}a{/if}
        {character.background.class}, you will start with the following skills:
      </p>
      <ul class="ul-diamond">
        {#each classStartingSkills[character.background.class].skills as skill}
          <li>{skill.skill} : {skill.rankValue}</li>
        {/each}
      </ul>
    </div>
    {#if hasMagicSkills}
      <div class="info-content">
        <p>
          <span class="capitalize">{character.background.class}s</span> additionally start with the
          following magic skills, depending on their alignment. <br />
          <span class="text-emphasis">Good</span>:
        </p>
        {#each magicSkills.good as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.rankValue}</li>
          </ul>
        {/each}
        <span class="text-emphasis">Neutral</span>:
        {#each magicSkills.neutral as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.rankValue}</li>
          </ul>
        {/each}
        <span class="text-emphasis">Evil</span>:
        {#each magicSkills.evil as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.rankValue}</li>
          </ul>
        {/each}
      </div>
    {/if}
  {/if}
</section>

<style lang="scss">
  @use 'sass:color';

  .quote {
    background-color: var(--color-background);
  }

  .info-content {
    padding: 10px;
    margin: 8px 0;
    border-left: 3px solid var(--color-border);
    background-color: color-mix(in srgb, var(--color-background) 80%, black);
    font-style: italic;
  }
</style>
