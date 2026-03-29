<script lang="ts">
  import type { PageData } from './$types';
	import Notes from '$lib/components/Notes/Notes.svelte';
  import ItemDetail from '$lib/components/ItemDetail/ItemDetail.svelte';

  let { data }: { data: PageData } = $props();
</script>

<main>
  <ItemDetail item={data.item} />

  <Notes notes={data.item.notes} />
</main>