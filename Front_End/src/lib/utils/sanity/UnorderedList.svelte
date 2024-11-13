<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  export let portableText: BlockComponentProps<{ bulletContext?: string }>;
</script>

{#if portableText.global.context.bulletContext === 'note'}
  <li class="ul-note"><slot /></li>
{:else if portableText.global.context.bulletContext === 'diamond'}
  <li class="ul-diamond"><slot /></li>
{:else}
  <li class=""><slot /></li>
{/if}
