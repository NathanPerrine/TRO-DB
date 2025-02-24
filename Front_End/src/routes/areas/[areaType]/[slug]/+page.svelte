<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PageData } from './$types';
  import Notes from '$lib/components/Notes/Notes.svelte';
  import { Skull } from 'lucide-svelte';

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

    {#if data.area.areaType === 'dungeon'}
      <h2>Walkthrough</h2>
      <PortableText value={data.area.walkthrough} components={{}} />
    {/if}

    <Notes notes={data.area.notes} />

    {#if data.area.areaType !== 'town'}
      <h2>Drops</h2>
      {#if data.area.drops}
        <h3>Books:</h3>
        {#if data.area.drops.books?.length > 0}
          <ul class="ul-diamond">
            {#each data.area.drops.books as book}
              <li><a href="/items/books/{book.bookType}/{book.slug.current}">{book.name}</a></li>
            {/each}
          </ul>
        {:else}
          <p>No known book drops in this area.</p>
        {/if}

        {#if data.area.drops}
          <h3>Equipment</h3>

          {#if data.area.drops.armors?.length > 0}
            <h4>Armor</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Slot</th>
                    <th>Material</th>
                    <th>Armor</th>
                    <th>Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {#each data.area.drops.armors as armor}
                    <tr>
                      <td>
                        <div class="name-container">
                          <span class="unidentified">{armor.name}</span>
                          <a
                            class="rarity-{armor.rarity}"
                            href="/items/equipment/armor/{armor.slug.current}"
                          >
                            {armor.identifiedName}
                          </a>
                        </div>
                      </td>
                      <td>{armor.levelRequirement}</td>
                      <td class="capitalize">{armor.armorAttributes.armorType}</td>
                      <td class="capitalize">{armor.armorAttributes.material || '-'}</td>
                      <td>{armor.armorAttributes.armorRating} AC</td>
                      <td>
                        {#if armor.attributes}
                          <ul class="attribute-list">
                            {#each armor.attributes as attribute}
                              <li>{attribute}</li>
                            {/each}
                          </ul>
                        {:else}
                          -
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <p>No known armor drops.</p>
          {/if}

          {#if data.area.drops.weapons?.length > 0}
            <h4>Weapons</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Type</th>
                    <th>Damage</th>
                    <th>Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {#each data.area.drops.weapons as weapon}
                    <tr>
                      <td>
                        <div class="name-container">
                          <span class="unidentified">{weapon.name}</span>
                          <a
                            class="rarity-{weapon.rarity}"
                            href="/items/equipment/weapon/{weapon.slug.current}"
                          >
                            {weapon.identifiedName}
                          </a>
                        </div>
                      </td>
                      <td>{weapon.levelRequirement}</td>
                      <td class="capitalize">{weapon.weaponAttributes.weaponType?.name}</td>
                      <td>
                        {weapon.weaponAttributes.damage?.min}-{weapon.weaponAttributes.damage?.max}
                      </td>
                      <td>
                        {#if weapon.attributes}
                          <ul class="attribute-list">
                            {#each weapon.attributes as attribute}
                              <li>{attribute}</li>
                            {/each}
                          </ul>
                        {:else}
                          -
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <p>No known weapon drops.</p>
          {/if}
        {/if}

        <h3>Accessories:</h3>
        {#if data.area.drops.accessories?.length > 0}
          <ul class="ul-diamond">
            {#each data.area.drops.accessories as accessory}
              <li>
                <a href="/items/equipment/accessories/{accessory.slug.current}">
                  {accessory.identifiedName}
                </a>
              </li>
            {/each}
          </ul>
        {:else}
          <p>No known accessory drops in this area.</p>
        {/if}
      {/if}
    {:else}
      <p>No known drops in this area.</p>
    {/if}

    {#if data.area.areaType !== 'town'}
      <h2>Mobs in this area</h2>
      {#if data.area.mobs}
        <div class="table-container">
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
                  <td>
                    <div class="mob-name-cell">
                      <a href="/mobs/{mob.slug.current}">{mob.name}</a>
                      {#if mob.boss}
                        <span class="icon"><Skull size={24} /></span>
                      {/if}
                    </div>
                  </td>
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
        </div>
      {/if}
    {/if}

    <h2>Connected Areas</h2>
    <ul class="ul-diamond">
      {#if data.area.connectedAreas}
        {#each data.area.connectedAreas as connectedArea}
          <li>
            <a href="/areas/{connectedArea.areaType}/{connectedArea.slug.current}">
              {connectedArea.name}
            </a>
          </li>
        {/each}
      {/if}
    </ul>
  </section>
</main>

<style lang="scss">
  .mob-name-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    color: var(--color-text-accent);
    display: flex;
    align-items: center;
  }

  .material {
    color: var(--color-inactive);
    font-size: 0.9em;
    margin-left: 4px;
  }

  .attribute-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 2px 0;

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }
    }
  }

  .name-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .unidentified {
      color: var(--color-inactive);
      font-size: 0.9em;
    }

    a {
      width: fit-content;
    }
  }
</style>
