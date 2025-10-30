<script lang="ts">
  import type { Snippet } from 'svelte';

  let { portableText, children } = $props<{
    portableText: {
      value: {
        page: string;
      };
    };
    children: Snippet;
  }>();

  const href = portableText.value.page;
</script>

<a {href} class="page-link" data-sveltekit-preload-data>
  {@render children()}
</a>

<style lang="scss">
  .page-link {
    color: var(--color-text-accent);
    text-decoration: none;
    border-bottom: 1px solid var(--color-text-accent);
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      color: var(--color-header);
      border-bottom-color: var(--color-header);
    }
  }
</style>
