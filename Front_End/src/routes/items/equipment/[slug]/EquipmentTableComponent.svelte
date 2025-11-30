<script lang="ts">
  import type {
    ArmorListItem,
    WeaponListItem,
    AccessoryListItem
  } from '$lib/schemas/equipment.server';
  import type { PlayerClassType } from './types';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import './equipment.scss';
  import {
    normalizeAttributes,
    extractAttributeTags,
    sortEquipment,
    filterByClass,
    isWeapon,
    isArmor,
    isAccessory
  } from './utils';

  let {
    equipmentList,
    header,
    playerClass = null
  }: {
    equipmentList: (ArmorListItem | WeaponListItem | AccessoryListItem)[];
    header: string;
    playerClass?: PlayerClassType;
  } = $props();

  const DEFAULT_DURATION = 500;

  // State
  let expanded = $state(true);
  let selectedAttributes = $state<string[]>([]);
  let currentSortField = $state<'rarity' | 'identifiedName' | 'levelRequirement'>('levelRequirement');
  let sortDirection = $state<'asc' | 'desc'>('asc');

  // Derived: Apply class filter first, then attribute filter
  let classFilteredList = $derived(filterByClass(equipmentList, playerClass));

  let attributeTags = $derived(extractAttributeTags(classFilteredList));

  let filteredEquipmentList = $derived.by(() => {
    const baseList = classFilteredList;

    // Apply attribute filters if any are selected
    if (selectedAttributes.length === 0) {
      return sortEquipment(baseList, currentSortField, sortDirection);
    }

    const filtered = baseList.filter((equipmentPiece) =>
      selectedAttributes.every((selectedAttr) =>
        equipmentPiece.attributes?.some((attr) => normalizeAttributes(attr) === selectedAttr)
      )
    );

    return sortEquipment(filtered, currentSortField, sortDirection);
  });

  function handleSort(field: 'rarity' | 'identifiedName' | 'levelRequirement') {
    if (currentSortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortField = field;
      sortDirection = 'asc';
    }
  }

  function handleAttributeClick(attr: string) {
    if (selectedAttributes.includes(attr)) {
      selectedAttributes = selectedAttributes.filter((a) => a !== attr);
    } else {
      selectedAttributes = [...selectedAttributes, attr];
    }
  }
</script>

<h2 id={header.toLowerCase().split(' ').join('-')}>
  <button
    class="header-button"
    class:expanded
    onclick={() => (expanded = !expanded)}
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
        onclick={() => handleAttributeClick(tag)}
        animate:flip={{ duration: DEFAULT_DURATION }}
        transition:fade={{ duration: 300 }}
      >
        {tag}
      </button>
    {/each}
  </section>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>
            <button class="header-button" onclick={() => handleSort('identifiedName')}>
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
            <button class="header-button" onclick={() => handleSort('rarity')}>
              <span>Rarity</span>
              <span
                class="arrow"
                class:arrow-asc={currentSortField === 'rarity' && sortDirection === 'asc'}
                class:arrow-desc={currentSortField === 'rarity' && sortDirection === 'desc'}
                >▶</span
              >
            </button>
          </th>
          <th>
            <button class="header-button" onclick={() => handleSort('levelRequirement')}>
              <span>Level</span>
              <span
                class="arrow"
                class:arrow-asc={currentSortField === 'levelRequirement' && sortDirection === 'asc'}
                class:arrow-desc={currentSortField === 'levelRequirement' &&
                  sortDirection === 'desc'}>▶</span
              >
            </button>
          </th>
          {#if isWeapon(filteredEquipmentList[0])}
            <th>Damage</th>
          {:else if isArmor(filteredEquipmentList[0])}
            <th>Armor Rating</th>
          {/if}
          <th>Attributes</th>
          <th>Drop Area</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredEquipmentList as equipmentPiece (equipmentPiece)}
          <tr animate:flip={{ duration: DEFAULT_DURATION }} transition:fade={{ duration: 300 }}>
            <td>
              {#if isWeapon(equipmentPiece)}
                <a href="/items/equipment/weapons/{equipmentPiece.slug.current}">
                  {equipmentPiece.identifiedName}
                </a>
              {:else if isArmor(equipmentPiece)}
                <a href="/items/equipment/armor/{equipmentPiece.slug.current}">
                  {equipmentPiece.identifiedName}
                </a>
              {:else if isAccessory(equipmentPiece)}
                <a href="/items/equipment/accessories/{equipmentPiece.slug.current}">
                  {equipmentPiece.identifiedName}
                </a>
              {/if}
            </td>
            <td>
              {#if equipmentPiece.rarity}
                <span class="capitalize rarity-{equipmentPiece.rarity}"
                  >{equipmentPiece.rarity}</span
                >
              {/if}
            </td>
            <td>
              {#if equipmentPiece.levelRequirement != null}
                {equipmentPiece.levelRequirement}
              {/if}
            </td>
            {#if isWeapon(equipmentPiece)}
              <td>
                {#if equipmentPiece.weaponAttributes?.damage}
                  {equipmentPiece.weaponAttributes.damage.min} - {equipmentPiece.weaponAttributes.damage.max}
                {:else}
                  ? - ?
                {/if}
              </td>
            {:else if isArmor(equipmentPiece)}
              <td>
                {#if equipmentPiece.armorAttributes?.armorRating}
                  {equipmentPiece.armorAttributes?.armorRating}
                {:else}
                  ?
                {/if}
              </td>
            {/if}
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
  </div>
{/if}
