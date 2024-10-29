<script lang="ts">
  import type { Character } from './characterBuilder';

  export let character: Character;

  let code: string = '';

  // This function is only provided for compatibility with legacy web platform APIs and should never be used in new code, because they use strings to represent binary data and predate the introduction of typed arrays in JavaScript. For code running using Node.js APIs, converting between base64-encoded strings and binary data should be performed using Buffer.from(str, 'base64') and buf.toString('base64').

  $: code = btoa(JSON.stringify(character));

  function importBuild() {
    character = JSON.parse(atob(code));
  }

  function exportBuild() {
    navigator.clipboard.writeText(code);
  }
</script>

<div class="saveLoad-container">
  <textarea rows="4" bind:value={code}></textarea>
  <div class="button-container tooltip">
    <button class="import-button" on:click={importBuild}>Import</button>
    <button class="export-button" on:click={exportBuild}>
      Export
      <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
    </button>
  </div>
  <p>
    Note: This currently has no validation. If in doubt reset the character race / class and try to
    recreate it yourself.
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
    background-color: color.adjust($color-background, $lightness: -5%);
    color: $color-text;
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
    border-color: $color-border transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
