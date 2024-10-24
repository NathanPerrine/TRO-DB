<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
</script>

<main>
  {#if data.description}
    <PageHeader description={data.description} />
  {/if}

  <h2>Amulets</h2>
  <h2>Baldrics</h2>
  <h2>Backpacks</h2>
  <h2>Belts</h2>
  <h2>Rings</h2>
</main>
