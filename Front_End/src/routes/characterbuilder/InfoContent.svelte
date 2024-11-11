<script lang="ts">
  import type { Character, Stats } from './characterBuilder';
  import {
    alignmentInfo,
    classInfo,
    classSkills,
    pvpInfo,
    raceClassStats,
    statInfo
  } from './characterBuilder';
  import TextWithEmphasis from '$lib/components/Text/TextWithEmphasis.svelte';

  export let stat: string;
  export let character: Character;

  function getScoreDescription(score: number) {
    /**
     * @description
     * test test test
     */
    if (score <= 5) {
      return 'Terrible';
    } else if (score <= 8) {
      return 'Poor';
    } else if (score <= 13) {
      return 'Average';
    } else if (score <= 17) {
      return 'good';
    } else if (score <= 21) {
      return 'Excellent';
    } else {
      return 'Fantastic';
    }
  }

  function getBaseStat(stat: Stats) {
    return raceClassStats[character.race][character.class][stat];
  }
</script>

<section>
  <!-- Character Base Info section -->
  {#if stat === 'characterInfo'}
    <div class="info-content">
      <p>
        As
        {#if character.race === 'human' || character.race === 'giant'}a{:else}an{/if}
        <span class="text-emphasis">{character.race} {character.class}</span>, your base attributes
        are set at Strength <span class="text-emphasis">{getBaseStat('strength')}</span>, Dexterity:
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
        {stat} of <span class="text-emphasis">{character[stat]}</span> is considered
        <span class="text-emphasis">{getScoreDescription(character[stat])}</span>.
      </blockquote>

      <p>{statInfo[stat]}</p>
    </div>

    <!-- Character Alignment section -->
  {:else if stat === 'alignment'}
    <div class="info-content">
      <p>
        {#if character.alignment === 'good'}
          <TextWithEmphasis segments={alignmentInfo.good.segments} />
        {:else if character.alignment === 'neutral'}
          <TextWithEmphasis segments={alignmentInfo.neutral.segments} />
        {:else if character.alignment === 'evil'}
          <TextWithEmphasis segments={alignmentInfo.evil.segments} />
        {/if}
      </p>
    </div>

    <!-- Character PvP section -->
  {:else if stat === 'pvp'}
    <div class="info-content">
      <p>
        {#if character.pvp === 'on'}
          {pvpInfo.on}
        {:else if character.pvp === 'off'}
          {pvpInfo.off}
        {/if}
      </p>
    </div>
  {:else if stat === 'class'}
    <div class="info-content">
      <blockquote class="quote capitalize">{character.class}</blockquote>
    </div>
    <div class="info-content">
      <p>{classInfo[character.class]}</p>
    </div>
    <div class="info-content">
      <p>
        As {#if character.class === 'adventurer'}an{:else}a{/if}
        {character.class}, you will start with the following skills:
      </p>
      <ul class="ul-diamond">
        {#each classSkills[character.class].skills as skill}
          <li>{skill.skill} : {skill.level}</li>
        {/each}
      </ul>
    </div>
    {#if character.class === 'adventurer' || character.class === 'wizard'}
      <div class="info-content">
        <p>
          <span class="capitalize">{character.class}s</span> additionally start with the following
          magic skills, depending on their alignment. <br />
          <span class="text-emphasis">Good</span>:
        </p>
        {#each classSkills[character.class].magic.good as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.level}</li>
          </ul>
        {/each}
        <span class="text-emphasis">Neutral</span>:
        {#each classSkills[character.class].magic.neutral as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.level}</li>
          </ul>
        {/each}
        <span class="text-emphasis">Evil</span>:
        {#each classSkills[character.class].magic.evil as magicSkill}
          <ul class="ul-diamond">
            <li>{magicSkill.skill} : {magicSkill.level}</li>
          </ul>
        {/each}
      </div>
    {/if}
  {/if}
</section>

<style lang="scss">
  @use 'sass:color';

  .quote {
    background-color: $color-background;
  }

  .info-content {
    padding: 10px;
    margin: 8px 0;
    border-left: 3px solid $color-border;
    background-color: color-mix(in srgb, var(--color-background) 80%, black);
    font-style: italic;
  }
</style>
