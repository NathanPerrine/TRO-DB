<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';
	import { portableTextComponents } from '$lib/components/PortableText';
  export let notes: any[] | undefined | null;

  const bulletContext = 'note'
</script>

<h2>Notes</h2>
{#if notes}
  <PortableText
    value={notes}
    context={{ bulletContext }}
    components={{
      ...portableTextComponents,
      listItem: {
        normal: UnorderedList
      },
    }}
  />
{:else}
  <ul class="ul-note">
    <li></li>
  </ul>
{/if}