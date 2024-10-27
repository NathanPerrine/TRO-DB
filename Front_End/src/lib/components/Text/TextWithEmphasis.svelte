<!--
  @component
  # TextWithEmphasis

  A component that renders text with optional emphasized segments. It accepts an array of text segments where each segment can be either a plain string or an object specifying text with emphasis.

  ## Props
  ### segments
  - Type: Array<string | { text: string, emphasis: boolean }>
  - Required: Yes
  - Description: Array of text segments to render. Each segment can be either a plain
    string or an object with text and emphasis properties.

  ## Usage

  ```ts
  import TextWithEmphasis from './TextWithEmphasis.svelte';

  const segments = [
    'Normal text, ',
    { text: 'emphasized text', emphasis: true },
    ' and more normal text.'
  ];

  <TextWithEmphasis segments={segments} />
  ```
-->
<script lang="ts">
  /**
   * @description
   * test test test
   */
  type TextSegment = string | { text: string; emphasis: boolean };

  export let segments: TextSegment[];
</script>

{#each segments as segment}
  {#if typeof segment === 'string'}
    {segment}
  {:else}
    <span class="text-emphasis">{segment.text}</span>
  {/if}
{/each}
