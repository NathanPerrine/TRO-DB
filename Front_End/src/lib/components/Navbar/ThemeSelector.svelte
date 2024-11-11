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
  <select on:change={handleThemeChange} value={themeState.theme.name}>
    {#each themes as theme}
      <option value={theme.name}>{theme.name}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .theme-selector {
    margin-top: 20px;
    padding: 0 10px;

    select {
      width: 100%;
      padding: 8px;
      background-color: var(--color-background);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-hover);
      }

      option {
        background-color: var(--color-background);
        color: var(--color-text);
      }
    }
  }
</style>
