<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  export let portableText: BlockComponentProps<{bulletContext?: string}>;
</script>

{#if portableText.global.context.bulletContext === 'note'}
  <ul class="ul-note"><slot /></ul>
{:else if portableText.global.context.bulletContext === 'diamond'}
  <ul class="ul-diamond"><slot /></ul>
{:else}
  <ul class=""><slot /></ul>
{/if}