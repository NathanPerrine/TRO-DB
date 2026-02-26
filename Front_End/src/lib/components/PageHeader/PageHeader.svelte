<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { Description } from '$lib/types';
  import UnorderedList from '$lib/components/PortableText/components/UnorderedList.svelte';
  import PortableTextRenderer, { portableTextComponents } from '$lib/components/PortableText';

  let { description } = $props<{ description: Description }>();
  const bulletContext = 'diamond';
</script>

<header>
  <h1>{description.name}</h1>
  {#if description.description}
    <PortableTextRenderer value={description.description} />
  {/if}
  {#if description.extras}
    <h3>Extra Info:</h3>
    <PortableText
      value={description.extras as any}
      context={{ bulletContext }}
      components={{
        ...portableTextComponents,
        listItem: {
          normal: UnorderedList
        }
      }}
    />
  {/if}
</header>
