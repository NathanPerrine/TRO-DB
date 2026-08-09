<script lang="ts">
  import EquipmentDetail from '$lib/components/ItemDetail/EquipmentDetail.svelte';
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';


  let { data }: { data: PageData } = $props();
</script>

<main>
  <EquipmentDetail equipment={data.equipment} />

  <Notes notes={data.equipment?.notes} />
</main>


