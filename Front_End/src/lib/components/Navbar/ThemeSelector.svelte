<script lang="ts">
  import { themes } from '$lib/scss/themes/themes';
  import { themeState } from '$lib/scss/themes/theme.svelte';

  function handleThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedTheme = themes.find((theme) => theme.name === select.value);
    if (selectedTheme) {
      themeState.setTheme(selectedTheme);
    }
  }
</script>

<div class="theme-selector">
  <div class="select-wrapper">
    <select on:change={handleThemeChange} value={themeState.theme.name}>
      {#each themes as theme}
        <option value={theme.name}>{theme.name}</option>
      {/each}
    </select>
    <span class="arrow">▶</span>
  </div>
</div>

<style lang="scss">
  .theme-selector {
    margin-top: 20px;
    padding: 0 10px;

    .select-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;

      select {
        width: 100%;
        padding: 8px;
        padding-right: 24px;
        background-color: var(--color-background);
        color: var(--color-text);
        font-weight: bold;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        cursor: pointer;

        &:hover {
          background-color: var(--color-hover);
        }

        option {
          background-color: var(--color-background);
          color: var(--color-text);
        }
      }

      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: var(--color-text);
        pointer-events: none;
        transition: transform 0.3s ease;
      }

      select:focus + .arrow {
        transform: translateY(-50%) rotate(90deg);
      }
    }
  }
</style>
