<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  <PageHeader description={data.description} />

  <h2>{data.description.name}</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 45%">Name</th>
        <th style="">Directions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.areas as area}
        <tr>
          <td><a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a></td>
          <td>
            <ul class="ul-diamond">
              {#if area.directions}
                {#each area.directions as directions}
                  <li>{directions}</li>
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
</main>
