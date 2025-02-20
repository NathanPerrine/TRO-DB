<script lang="ts">
  import { createCharacter, createDefaultCharacter } from './lib/factories';
  import type { Character } from './lib/types';
  import ImportExport from './components/ImportExport.svelte';
  import InfoContent from './components/InfoContent.svelte';
  import SkillPlanner from './components/SkillPlanner.svelte';
  import StatContainer from './components/StatContainer.svelte';
  import { characterToUrlString, createCharacterFromUrl } from './lib/urlSave';
  import { browser } from '$app/environment';
  import { replaceState } from '$app/navigation';

  let character: Character = $state(
    createCharacter({
      race: 'human',
      class: 'adventurer',
      alignment: 'good',
      pvp: 'off'
    })
  );

  const validTabs = ['statInfo', 'classInfo', 'skills', 'saveLoad'] as const;
  type TabType = (typeof validTabs)[number];

  let activeTab = $state<TabType>('statInfo');

  $effect(() => {
    const hash = window.location.hash.slice(1);
    if (validTabs.includes(hash as TabType)) {
      activeTab = hash as TabType;
    } else {
      window.location.hash = activeTab;
    }
  });

  function setActiveTab(tab: TabType) {
    activeTab = tab;
    window.location.hash = tab;
  }

  // Listen for hash changes, allows back / forward navigation.
  $effect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (validTabs.includes(hash as TabType)) {
        activeTab = hash as TabType;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });

  // Initial URL load
  $effect(() => {
    const params = new URLSearchParams(window.location.search);
    const saveString = params.get('save');
    if (saveString) {
      try {
        const loadedCharacter = createCharacterFromUrl(saveString);
        character = loadedCharacter;
      } catch (e) {
        console.error('Failed to load character from URL:', e);
        alert(e instanceof Error ? e.message : 'Failed to load character from URL');
      }
    }
  });

  // Update URL when character changes
  $effect(() => {
    if (!browser) return;

    try {
      const saveString = characterToUrlString(character);
      const newUrl = `${window.location.pathname}?save=${saveString}`;

      // Only update if the URL actually changed
      if (window.location.search !== `?save=${saveString}`) {
        replaceState(newUrl, {});
      }
    } catch (e) {
      console.error('Failed to update URL:', e);
    }
  });

  function reset() {
    character = createDefaultCharacter();
  }
</script>

<main>
  <div class="builder-container">
    <div class="stat-columns">
      <div class="attribute-column">
        <StatContainer stat="strength" bind:character />
        <StatContainer stat="dexterity" bind:character />
        <StatContainer stat="intelligence" bind:character />
        <StatContainer stat="endurance" bind:character />
        <StatContainer stat="availablePoints" bind:character />
      </div>

      <div class="background-column">
        <StatContainer stat="race" bind:character />
        <StatContainer stat="class" bind:character />
        <StatContainer stat="alignment" bind:character />
        <StatContainer stat="pvp" bind:character />
        <button onclick={reset}>Reset</button>
      </div>
    </div>

    <div class="info-column">
      <div class="tabs">
        <button
          class="tab-button"
          class:active={activeTab === 'statInfo'}
          onclick={() => setActiveTab('statInfo')}>Stat Info</button
        >
        <button
          class="tab-button"
          class:active={activeTab === 'classInfo'}
          onclick={() => setActiveTab('classInfo')}>Class Info</button
        >
        <button
          class="tab-button"
          class:active={activeTab === 'skills'}
          onclick={() => setActiveTab('skills')}>Skill builder</button
        >
        <button
          class="tab-button"
          class:active={activeTab === 'saveLoad'}
          onclick={() => setActiveTab('saveLoad')}>Save / Load</button
        >
      </div>

      <div class="info-container" class:hidden={activeTab !== 'statInfo'}>
        <InfoContent stat="characterInfo" {character} />
        <InfoContent stat="strength" {character} />
        <InfoContent stat="dexterity" {character} />
        <InfoContent stat="intelligence" {character} />
        <InfoContent stat="endurance" {character} />
        <InfoContent stat="alignment" {character} />
        <InfoContent stat="pvp" {character} />
      </div>

      <div class="skill-container" class:hidden={activeTab !== 'classInfo'}>
        <InfoContent stat="class" {character} />
      </div>

      <div class="skill-container" class:hidden={activeTab !== 'skills'}>
        <SkillPlanner bind:character />
      </div>

      <div class="saveLoad-container" class:hidden={activeTab !== 'saveLoad'}>
        <ImportExport bind:character />
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .builder-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;

    @include mobile {
      flex-direction: column;
    }
  }

  .stat-columns {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-grow: 1;
    flex-basis: 0;

    @include mobile {
      flex-direction: row;
      gap: 10px;
    }
  }

  .attribute-column,
  .background-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    @include mobile {
      flex: 1;
    }
  }

  .info-column {
    position: relative;
    flex-grow: 3;
    flex-basis: 0;
    background-color: var(--color-background);
    border: 2px solid var(--color-border);
    padding: 20px;
    margin: 20px 0;
    height: 80vh;
    z-index: 1;
    font-family: 'IM Fell English', serif;
    font-size: 1.2rem;
    line-height: 1.8;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

    @include mobile {
      margin: 45px 0 0 0;
      height: auto;
      min-height: 80vh;
    }

    .info-container,
    .skill-container {
      height: 100%;
      overflow: auto;

      @include mobile {
        height: auto;
        max-height: 80vh;
      }
    }
  }

  .tabs {
    position: absolute;
    top: -45px;
    left: 10px;
    display: flex;
    gap: 8px;
    z-index: -1;

    @include mobile {
      left: 0;
      right: 0;
      justify-content: center;
      gap: 4px;
    }

    .tab-button {
      border: 2px solid var(--color-border);
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.2s ease;
      position: relative;
      text-wrap: nowrap;
      width: 110px;
      height: 40px;
      margin-top: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      @include mobile {
        width: auto;
        padding: 8px 12px;
        font-size: 12px;
      }

      &:not(.active) {
        &::after {
          content: '';
          position: absolute;
          width: 104%;
          right: -2px;
          height: 40%;
          background: var(--color-background);
          top: 73%;
        }
      }

      &.active {
        font-weight: bold;
        transform: scale(1.05);
      }

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .hidden {
    display: none;
  }
</style>
