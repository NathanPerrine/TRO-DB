<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  <PageHeader description={data.description} />

  <h2>{data.description.name}</h2>
  {#if data.areas[0].areaType === 'town'}
    <ul class="ul-diamond">
      {#each data.areas as area}
        <li>
          <a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 45%">Name</th>
            <th style="">Directions</th>
            <th>Level Range</th>
          </tr>
        </thead>
        <tbody>
          {#each data.areas as area}
            <tr>
              <td><a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a></td>
              <td>
                <ul class="ul-diamond">
                  {#if area.directions}
                    {#each area.directions as direction}
                      <li>
                        <a href="/areas/towns/{direction.town.slug.current}"
                          >{direction.town.name}</a
                        >: {direction.directions}
                      </li>
                    {/each}
                  {:else}
                    <p>???</p>
                  {/if}
                </ul>
              </td>
              <td>{area.levelRange?.min} - {area.levelRange?.max}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>
