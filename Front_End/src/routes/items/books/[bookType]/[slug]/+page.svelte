<script lang="ts">
    import BookDetail from '$lib/components/ItemDetail/BookDetail.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<main>
  <BookDetail book={data.book} />
</main>