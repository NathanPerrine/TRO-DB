<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';

  export let data: PageData;
</script>

<main>
  <PageHeader description={data.description} />

  <section>
    <h2>Mobs</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 30%">Name</th>
            <th style="width: 15%">Level Range</th>
            <th style="width: 15%">HP Range</th>
            <th style="">Zones / Dungeons</th>
          </tr>
        </thead>
        <tbody>
          {#each data.mobs as mob}
            <tr>
              <td><a href="/mobs/{mob.slug.current}">{mob.name}</a></td>
              <td>{mob.levelRange?.min} - {mob.levelRange?.max}</td>
              <td>{mob.hpRange?.min} - {mob.hpRange?.max}</td>
              <td>
                <ul>
                  {#if mob.inhabitedAreas}
                    {#each mob.inhabitedAreas as area}
                      <li>
                        <a href="/areas/{area.areaType}/{area.slug?.current}">{area.name}</a>
                      </li>
                    {/each}
                  {/if}
                </ul>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
