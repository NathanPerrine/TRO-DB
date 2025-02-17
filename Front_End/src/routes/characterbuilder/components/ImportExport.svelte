<script lang="ts">
  import type { Character } from '../lib/types';
  import { characterToSaveString, createCharacterFromSave } from '../lib/factories';

  let { character = $bindable() }: { character: Character } = $props();

  let code = $state(characterToSaveString(character));
  let error = $state<string | null>(null);

  $effect(() => {
    try {
      code = characterToSaveString(character);
      error = null;
    } catch (e) {
      error = 'Failed to generate save code';
    }
  });

  function importBuild() {
    try {
      const newCharacter = createCharacterFromSave(code);
      character = newCharacter;

      error = null;
      code = characterToSaveString(character);
    } catch (e) {
      error = 'Invalid character save code';
      console.error('Failed to import character:', e);
    }
  }

  async function exportBuild() {
    try {
      await navigator.clipboard.writeText(code);
      error = null;
    } catch (e) {
      error = 'Failed to copy to clipboard';
      console.error('Failed to copy to clipboard:', e);
    }
  }
</script>

<div class="saveLoad-container">
  <textarea rows="4" oninput={() => error = null} bind:value={code} class:error={error !== null} aria-label="Character save code"
  ></textarea>

  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}

  <div class="button-container tooltip">
    <button class="import-button" onclick={importBuild} disabled={error !== null}> Import </button>
    <button class="export-button" onclick={exportBuild} disabled={error !== null}>
      Export
      <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
    </button>
  </div>

  <p class="note">
    Note: There is currently minimal validation in place. If in doubt hit reset and try to recreate the character from scratch.
  </p>
</div>

<style lang="scss">
  .saveLoad-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .button-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  textarea.error {
    border-color: var(--color-rarity-red);
  }

  .error-message {
    margin-top: 8px;
    padding: 8px;
    color: var(--color-rarity-red);
    background-color: color-mix(in srgb, var(--color-background) 90%, var(--color-rarity-red));
    border: 1px solid var(--color-rarity-red);
    border-radius: 4px;
  }

  .note {
    margin-top: 16px;
    font-size: 0.9em;
    color: var(--color-inactive);
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: color-mix(in srgb, var(--color-background) 95%, black);
    color: var(--color-text);
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--color-border) transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
