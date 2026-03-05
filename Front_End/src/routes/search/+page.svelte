<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    // TODO: Make sure search is in mobile
    // Filters for doc types to filter results
</script>

<main>
  <h2>{data.searchTerm}</h2>
</main>
