<script lang="ts">
  import type { Snippet } from 'svelte';

  let { portableText, children } = $props<{
    portableText: {
      value: {
        href: string;
        blank?: boolean;
      };
    };
    children: Snippet;
  }>();

  const href = portableText.value.href;
  const blank = portableText.value.blank ?? true;
</script>

<a
  {href}
  target={blank ? '_blank' : undefined}
  rel={blank ? 'noopener noreferrer' : undefined}
  class="external-link"
>
  {@render children()}
</a>

<style lang="scss">
  .external-link {
    color: var(--color-text-accent);
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-header);
      border-bottom-color: var(--color-header);
    }
  }
</style>
