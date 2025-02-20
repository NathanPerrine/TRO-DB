<script lang="ts">
  import type { Character } from '../lib/types';
  import { characterToUrlString } from '../lib/urlSave';

  let { character = $bindable() }: { character: Character } = $props();
  let error = $state<string | null>(null);
  let success = $state<boolean>(false);

  async function copyUrl() {
    try {
      const saveString = characterToUrlString(character);
      const url = `${window.location.origin}${window.location.pathname}?save=${saveString}`;
      await navigator.clipboard.writeText(url);
      error = null;
      success = true;

      // Reset success message after 3 seconds
      setTimeout(() => {
        success = false;
      }, 3000);
    } catch (e) {
      error = 'Failed to copy URL to clipboard';
      success = false;
      console.error('Failed to copy URL:', e);
    }
  }
</script>

<div class="share-container">
  <p class="share-text">
    Your character build is automatically saved in the URL. Click the button below to copy a
    shareable link:
  </p>

  {#if error}
    <div class="message error-message" role="alert">
      {error}
    </div>
  {/if}

  {#if success}
    <div class="message success-message" role="status">URL copied to clipboard!</div>
  {/if}

  <div class="button-container">
    <button class="share-button" onclick={copyUrl}>
      Copy Shareable Link
      <span class="tooltiptext">Copy URL to clipboard</span>
    </button>
  </div>

  <p class="note">
    Note: Any changes you make to your character are automatically reflected in the URL. You can
    bookmark this page or share the URL to save your build.
  </p>
</div>

<style lang="scss">
  .share-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .share-text {
    color: var(--color-text);
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  .message {
    margin-top: 8px;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
  }

  .error-message {
    color: var(--color-rarity-red);
    background-color: color-mix(in srgb, var(--color-background) 90%, var(--color-rarity-red));
    border: 1px solid var(--color-rarity-red);
  }

  .success-message {
    color: var(--color-rarity-green);
    background-color: color-mix(in srgb, var(--color-background) 90%, var(--color-rarity-green));
    border: 1px solid var(--color-rarity-green);
  }

  .note {
    font-size: 0.9em;
    color: var(--color-inactive);
    text-align: center;
  }

  .share-button {
    position: relative;
    min-width: 200px;

    &:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }

  .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: color-mix(in srgb, var(--color-background) 95%, black);
    color: var(--color-text);
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -70px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color-border) transparent transparent transparent;
    }
  }
</style>
