<script lang="ts">
  import type { ShopInventoryItem } from '$lib/schemas/shop.server';
  import type { PageData } from './$types';
  import ItemDetail from '$lib/components/ItemDetail/ItemDetail.svelte';
  import EquipmentDetail from '$lib/components/ItemDetail/EquipmentDetail.svelte';
  import BookDetail from '$lib/components/ItemDetail/BookDetail.svelte';
  import { buildItemUrl } from '$lib/utils/buildItemUrl';

  let { data }: { data: PageData } = $props();
  let selectedItem: ShopInventoryItem | null = $state(null);
  let expandedCategories: Record<string, boolean> = $state({});

  function toggleCategory(category: string) {
    expandedCategories[category] = !expandedCategories[category];
  }

  function selectItem(item: ShopInventoryItem) {
    selectedItem = selectedItem?.slug.current === item.slug.current ? null : item;
  }

  const inventoryCategoryLabels: Record<string, string> = {
    accessories: 'Accessories',
    armor: 'Armor',
    weapons: 'Weapons',

    dyes: 'Dyes',
    potions: 'Potions',
    elixirs: 'Elixirs',
    scrolls: 'Scrolls',
    wands: 'Wands',
    orbs: 'Orbs',
    misc: 'Miscellaneous',

    skillsCrafter: 'Skills - Crafter',
    skillsThief: 'Skills - Thief',
    skillsWarrior: 'Skills - Warrior',
    skillsWizard: 'Skills - Wizard',

    spellsSorc: 'Spells - Sorc',
    spellsEle: 'Spells - Ele',
    spellsMyst: 'Spells - Myst',
    spellsThaum: 'Spells - Thaum',
    spellsNecro: 'Spells - Necro'
  };
</script>

<main>
  <header>
    <h1>{data.name}</h1>

    <h2>Directions</h2>
    <ul class="ul-diamond">
      {#if data.directions}
        {#each data.directions as direction}
          {#if direction.town}
            <li>
              <a href="/areas/towns/{direction.town.slug.current}">{direction.town.name}</a>: {direction.directions}
            </li>
          {/if}
        {/each}
      {:else}
        <p>???</p>
      {/if}
    </ul>
  </header>

  <div class="shop-window">
    <!-- Left Panel: Merch -->
    <div class="shop-panel merchandise">
      <h2>Merchandise</h2>
      {#each data.inventory as group}
        <button
          class="category-toggle"
          class:active={expandedCategories[group.category]}
          onclick={() => toggleCategory(group.category)}
        >
          {inventoryCategoryLabels[group.category]}
          <span class="arrow">{expandedCategories[group.category] ? '▾' : '▸'}</span>
        </button>
        {#if expandedCategories[group.category]}
          <ul class="category-item">
            {#each group.items as item}
              <li>
                <button
                  class="item-row"
                  class:selected={selectedItem?.slug.current === item.slug.current}
                  onclick={() => selectItem(item)}
                >
                  <span class="item-name">{item.name}</span>
                  {#if item.buyPrice}<span class="item-price">{item.buyPrice}g</span>{/if}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      {/each}
    </div>

    <!-- RIGHT PANEL: Detail -->
    <div class="shop-panel detail">
      {#if selectedItem}
        {#if selectedItem._type === 'item'}
          <ItemDetail item={selectedItem} />
        {:else if selectedItem._type === 'book'}
          <BookDetail book={selectedItem} />
        {:else}
          <EquipmentDetail equipment={selectedItem} />
        {/if}
        <a href={buildItemUrl(selectedItem)}>View full page</a>
      {:else}
        <h2>Shop Info</h2>
        {#if data.description}
          <p>{data.description}</p>
        {/if}
        {#if data.locations}
          <h3>Locations</h3>
          <ul class="ul-diamond">
            {#each data.locations as location}
              <li>
                <a href="/areas/{location.areaType}/{location.slug.current}">{location.name}</a>
              </li>
            {/each}
          </ul>
        {/if}
        {#if data.npc}
          <h3>Shopkeep</h3>
          <a href="/npcs/{data.npc.slug.current}">{data.npc.name}</a>
        {/if}
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;
  .shop-window {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 2px solid var(--color-border);
    margin-top: 16px;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .shop-panel {
    padding: 1rem;

    h2 {
      text-align: center;
      border-image: none;
      border-color: var(--color-border);
    }
  }

  .category-toggle {
    // style as a full-width row, not a typical button
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;

    &:hover {
      transform: none;
      background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    }

    &.active {
      background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    }
  }

  .category-item {
    margin-left: 10%;
  }

  .item-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;

    &.selected {
      background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    }

    &:hover {
      transform: none;
    }
  }
</style>
