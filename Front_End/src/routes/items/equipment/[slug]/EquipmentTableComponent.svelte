<script lang="ts">
  import type { PickedArmor, PickedWeapon } from '$lib';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  export let equipmentList: PickedArmor[] | PickedWeapon[];
  export let header: string;

  const DEFAULT_DURATION = 500;

  let filteredEquipmentList: (PickedArmor | PickedWeapon)[] = [];
  $: filteredEquipmentList = equipmentList;
  let attributeTags: string[] = [];
  let selectedAttributes: string[] = [];

  $: {
    attributeTags = [];
    filteredEquipmentList.forEach((equipment) => {
      if (equipment.attributes) {
        equipment.attributes.forEach((attr) => {
          if (!attributeTags.includes(attr)) {
            attributeTags.push(attr);
          }
        });
      }
    });
    attributeTags = attributeTags.sort();
  }

  filteredEquipmentList = filteredEquipmentList.sort(
    (a, b) => a.levelRequirement - b.levelRequirement
  );
  let expanded: boolean = true;
  let currentSortField: keyof PickedArmor | keyof PickedWeapon = 'levelRequirement';
  let sortDirection: 'asc' | 'desc' = 'desc';
  handleSort('levelRequirement');

  type SortableFields = 'rarity' | 'identifiedName' | 'levelRequirement';
  function handleSort(field: SortableFields) {
    if (currentSortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortField = field;
      sortDirection = 'asc';
    }

    filteredEquipmentList.sort((a, b) => {
      const fieldA = a[field] ?? '';
      const fieldB = b[field] ?? '';

      const comparison =
        typeof fieldA === 'string' && typeof fieldB === 'string'
          ? fieldA.localeCompare(fieldB)
          : (fieldA as number) > (fieldB as number)
            ? 1
            : -1;

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    filteredEquipmentList = filteredEquipmentList;
  }

  function handleAttributeClick(attr: string) {
    if (selectedAttributes.includes(attr)) {
      const index = selectedAttributes.indexOf(attr);
      selectedAttributes.splice(index, 1);
    } else {
      selectedAttributes = [...selectedAttributes, attr];
    }

    selectedAttributes = selectedAttributes;
    filterEquipment();
  }

  function filterEquipment() {
    filteredEquipmentList = selectedAttributes.length
      ? equipmentList.filter((equipmentPiece) =>
          selectedAttributes.every((selectedAttr) =>
            equipmentPiece.attributes?.includes(selectedAttr)
          )
        )
      : equipmentList;

    filteredEquipmentList = filteredEquipmentList;
  }
</script>

<h2>
  <button
    class="header-button"
    class:expanded
    on:click={() => (expanded = !expanded)}
    aria-expanded={expanded}
  >
    <span>{header}</span>
    <span class="arrow">▶</span>
  </button>
</h2>
{#if expanded}
  <section class="tag-container">
    {#each attributeTags as tag (tag)}
      <button
        class="tag"
        class:active={selectedAttributes.includes(tag)}
        on:click={() => handleAttributeClick(tag)}
        animate:flip={{ duration: DEFAULT_DURATION }}
        transition:fade={{ duration: 300 }}
      >
        {tag}
      </button>
    {/each}
  </section>
  <table>
    <thead>
      <tr>
        <th>
          <button class="header-button" on:click={() => handleSort('identifiedName')}>
            <span>Item</span>
            <span
              class="arrow"
              class:arrow-asc={currentSortField === 'identifiedName' && sortDirection === 'asc'}
              class:arrow-desc={currentSortField === 'identifiedName' && sortDirection === 'desc'}
              >▶</span
            >
          </button>
        </th>
        <th>
          <button class="header-button" on:click={() => handleSort('rarity')}>
            <span>Rarity</span>
            <span
              class="arrow"
              class:arrow-asc={currentSortField === 'rarity' && sortDirection === 'asc'}
              class:arrow-desc={currentSortField === 'rarity' && sortDirection === 'desc'}>▶</span
            >
          </button>
        </th>
        <th>
          <button class="header-button" on:click={() => handleSort('levelRequirement')}>
            <span>Level</span>
            <span
              class="arrow"
              class:arrow-asc={currentSortField === 'levelRequirement' && sortDirection === 'asc'}
              class:arrow-desc={currentSortField === 'levelRequirement' && sortDirection === 'desc'}
              >▶</span
            >
          </button>
        </th>
        <th>Attributes</th>
        <th>Drop Area</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredEquipmentList as equipmentPiece (equipmentPiece)}
        <tr animate:flip={{ duration: DEFAULT_DURATION }} transition:fade={{ duration: 300 }}>
          <td>
            {#if equipmentPiece.armorWeapon}
              <a href="/items/equipment/{equipmentPiece.armorWeapon}/{equipmentPiece.slug.current}">
                {equipmentPiece.identifiedName}
              </a>
            {:else}
              <a href="/items/equipment/accessories/{equipmentPiece.slug.current}">
                {equipmentPiece.identifiedName}
              </a>
            {/if}
          </td>
          <td>
            {#if equipmentPiece.rarity}
              <span class="capitalize rarity-{equipmentPiece.rarity}">{equipmentPiece.rarity}</span>
            {/if}
          </td>
          <td>
            {#if equipmentPiece.levelRequirement != null}
              {equipmentPiece.levelRequirement}
            {/if}
          </td>
          <td>
            <ul class="ul-diamond">
              {#if equipmentPiece.attributes}
                {#each equipmentPiece.attributes as attribute}
                  <li>{attribute}</li>
                {/each}
              {/if}
            </ul>
          </td>
          <td>
            <ul class="ul-diamond">
              {#if equipmentPiece.dropArea}
                {#each equipmentPiece.dropArea as area}
                  <li>
                    <a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a>
                  </li>
                {/each}
              {:else}
                <li>Unknown</li>
              {/if}
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style lang="scss">
  .header-button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;

    display: flex;
    justify-content: start;
    align-items: center;

    .arrow {
      font-size: 16px;
      padding-left: 8px;
      transition: transform 0.3s ease;
      display: block;
    }
    .arrow-asc {
      transform: rotate(-90deg);
    }
    .arrow-desc {
      transform: rotate(90deg);
    }
    &.expanded .arrow {
      transform: rotate(90deg);
    }
  }

  .tag-container {
    padding: 8px 0;

    .active {
      color: $color-text-accent;
      font-weight: bold;
    }
  }
</style>
