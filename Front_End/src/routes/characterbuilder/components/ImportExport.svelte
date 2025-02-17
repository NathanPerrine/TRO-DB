<script lang="ts">
  import type { Character } from '../lib/types';
  import { characterToSaveString, createCharacterFromSave } from '../lib/factories';

  let { character = $bindable() }: { character: Character } = $props();

  let code = $state(characterToSaveString(character));

  $effect(() => {
    code = characterToSaveString(character);
  });

  function importBuild() {
    try {
      const newCharacter = createCharacterFromSave(code);
      character = newCharacter;
    } catch (error) {
      console.error('Failed to import character:', error);
    }
  }

  function exportBuild() {
    navigator.clipboard.writeText(code);
  }
</script>

<div class="saveLoad-container">
  <textarea rows="4" bind:value={code}></textarea>
  <div class="button-container tooltip">
    <button class="import-button" onclick={importBuild}>Import</button>
    <button class="export-button" onclick={exportBuild}>
      Export
      <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
    </button>
  </div>
  <p>
    Note: This currently has no validation. If in doubt, reset the character race/class and try to recreate it yourself.
  </p>
</div>

<style lang="scss">
  @use 'sass:color';

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
