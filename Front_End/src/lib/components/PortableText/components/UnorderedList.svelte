<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  import type { Snippet } from 'svelte';

  let { portableText, children } = $props<{
    portableText: BlockComponentProps<{ bulletContext?: string }>;
    children: Snippet;
  }>();
</script>

{#if portableText.global.context.bulletContext === 'note'}
  <li class="ul-note">{@render children()}</li>
{:else if portableText.global.context.bulletContext === 'diamond'}
  <li class="ul-diamond">{@render children()}</li>
{:else}
  <li>{@render children()}</li>
{/if}
