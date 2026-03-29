<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const inventoryTypeLabels: Record<string, string> = {
    general: 'General',
    clothing: 'Clothing',
    armorWeapons: 'Armor & Weapons',
    magicItems: 'Magic (Potions & Scrolls)',
    magicSpellBooks: 'Magic (Spell Books)',
    trainerCrafting: 'Trainer - Crafting',
    trainerWarrior: 'Trainer - Warrior',
    trainerThief: 'Trainer - Thief',
    trainerWizard: 'Trainer - Wizard'
  }
</script>

<main>
  <PageHeader description={data.description} />
  <h2>Shops</h2>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th style="">Name</th>
          <th style="">Inventory</th>
          <th style="">Location</th>
          <th style="">Directions</th>
        </tr>
      </thead>
      <tbody>
        {#each data.shops as shop}
          <tr>
            <td><a href="/shops/{shop.slug.current}">{shop.name}</a></td>
            <td>
              {#if shop.inventoryType}
                {#each shop.inventoryType as inventoryType }
                  <ul class="">
                    <li>{inventoryTypeLabels[inventoryType]}</li>
                  </ul>
                {/each}
              {/if}
            </td>
            <td>
              <ul class="ul-diamond">
                {#if shop.locations}
                  {#each shop.locations as location}
                    <li>
                      <a href="/areas/{location.areaType}/{location.slug.current}">{location.name}</a>
                    </li>
                  {/each}
                {/if}
              </ul>
            </td>
            <td>
              <ul class="ul-diamond">
                {#if shop.directions}
                  {#each shop.directions as direction}
                    {#if direction.town}
                      <li>
                        <a href="/areas/towns/{direction.town.slug.current}"
                          >{direction.town.name}</a
                        >: {direction.directions}
                      </li>
                    {/if}
                  {/each}
                {:else}
                  <p>???</p>
                {/if}
              </ul>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
