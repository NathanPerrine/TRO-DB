<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import EquipmentTable from './EquipmentTable.svelte';

  export let data: PageData;
</script>

<main>
  {#if data.description}
    <PageHeader description={data.description} />
    <EquipmentTable equipmentType={data.description.name} equipmentList={data.equipment} />
  {/if}
</main>
