<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PageData } from './$types';
  import Notes from '$lib/components/Notes/Notes.svelte';

  export let data: PageData;
</script>

<main>
  <header>
    <h1>{data.area.name}</h1>
    <p>{data.area.description}</p>
  </header>

  <section>
    <h2>Map</h2>
    <p>{data.area.map}</p>

    <h2>Directions</h2>
    <ul class="ul-diamond">
      {#if data.area.directions}
        {#each data.area.directions as direction}
          <li>
            <a href="/areas/towns/{direction.town.slug.current}">{direction.town.name}</a>: {direction.directions}
          </li>
        {/each}
      {:else}
        <p>???</p>
      {/if}
    </ul>

    {#if data.area.areaType == 'dungeon'}
      <h2>Walkthrough</h2>
      <PortableText value={data.area.walkthrough} components={{}} />
    {/if}

    <Notes notes={data.area.notes} />

    {#if data.area.areaType != 'town'}
      <h2>Notable Drops</h2>
      {#if data.area.notableDrops}
        {#if data.area.notableDrops.books}
          <h3>Books:</h3>
          <ul class="ul-diamond">
            {#each data.area.notableDrops.books as book}
              <li><a href="/items/books/{book.bookType}/{book.slug.current}">{book.name}</a></li>
            {/each}
          </ul>
        {:else}
          <p>No known notable book drops.</p>
        {/if}
        {#if data.area.notableDrops.equipment}
          <h3>Armors / Weapons:</h3>
          <ul class="ul-diamond">
            {#each data.area.notableDrops.equipment as equipment}
              <li>
                <a
                  class="rarity-{equipment.rarity}"
                  href="/items/equipment/{equipment.armorWeapon}/{equipment.slug.current}"
                  >{equipment.identifiedName}</a
                >
              </li>
            {/each}
          </ul>
        {:else}
          <p>No known notable armor or weapon drops.</p>
        {/if}
        {#if data.area.notableDrops.accessories}
          <h3>Accessories:</h3>
          <ul class="ul-diamond">
            {#each data.area.notableDrops.accessories as accessory}
              <li>
                <a href="/items/equipment/accessory/{accessory.slot}/{accessory.slug.current}"
                  >{accessory.identifiedName}</a
                >
              </li>
            {/each}
          </ul>
        {:else}
          <p>No known notable accessory drops.</p>
        {/if}
      {/if}
    {:else}
      <p>No known notable drops in this area.</p>
    {/if}

    {#if data.area.areaType != 'town'}
      <h2>Mobs in this area</h2>
      {#if data.area.mobs}
        <table>
          <thead>
            <tr>
              <th style="width: 30%">Name</th>
              <th style="">Level Range</th>
              <th style="">HP Range</th>
              <th style="">Area Boss</th>
            </tr>
          </thead>
          <tbody>
            {#each data.area.mobs as mob}
              <tr>
                <td><a href="/mobs/{mob.slug.current}">{mob.name}</a></td>
                <td>{mob.levelRange?.min} - {mob.levelRange?.max}</td>
                <td>{mob.hpRange?.min} - {mob.hpRange?.max}</td>
                <td>
                  {#if mob.boss}
                    <span class="check">&#10003</span>
                  {:else}
                    <span class="cross">&#10007</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    {/if}

    <h2>Connected Areas</h2>
    <ul class="ul-diamond">
      {#if data.area.connectedAreas}
        {#each data.area.connectedAreas as connectedArea}
          <li>
            <a href="/areas/{connectedArea.areaType}/{connectedArea.slug.current}"
              >{connectedArea.name}</a
            >
          </li>
        {/each}
      {/if}
    </ul>
  </section>
</main>
