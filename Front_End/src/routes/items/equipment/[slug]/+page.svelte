<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import EquipmentTable from './EquipmentTable.svelte';
  import { CLASS_LIST, type PlayerClassType } from './types';
  import { CLASS_ATTRIBUTES } from './utils';
  import './equipment.scss';

  let { data }: { data: PageData } = $props();

  let playerClass = $state<PlayerClassType>(null);

  // Get active class attributes for display
  let activeClassAttributes = $derived(
    playerClass ? CLASS_ATTRIBUTES[playerClass] : []
  );

  function setPlayerClass(className: PlayerClassType) {
    playerClass === className ? (playerClass = null) : (playerClass = className);
  }
</script>

<main>
  {#if data.description}
    <PageHeader description={data.description} />

    <section id="class-list">
      <h2>Classes</h2>
      <div class="tag-container">
        {#each CLASS_LIST as className}
          <button
            class="tag"
            class:active={playerClass === className}
            onclick={() => (setPlayerClass(className))}
          >
            {className}
          </button>
        {/each}
      </div>
      {#if playerClass && activeClassAttributes.length > 0}
        <div class="active-filters">
          <span class="filter-label">Class filters:</span>
          {#each activeClassAttributes as attribute}
            <span class="tag tag-filter">{attribute}</span>
          {/each}
        </div>
      {/if}
    </section>

    <EquipmentTable equipmentType={data.description.name} equipmentList={data.equipment} {playerClass} />
  {/if}
</main>
