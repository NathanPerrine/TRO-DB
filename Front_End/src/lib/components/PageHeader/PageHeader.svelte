<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { Description } from '$lib/types';
  import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';

  export let description: Description;
  const bulletContext = 'diamond';
</script>

<header>
  <h1>{description.name}</h1>
  {#if description.description}
    <PortableText value={description.description as any} components={{}} />
  {/if}
  {#if description.extras}
    <h3>Extra Info:</h3>
    <PortableText
      value={description.extras as any}
      context={{ bulletContext }}
      components={{
        listItem: {
          normal: UnorderedList
        }
      }}
    />
  {/if}
</header>
