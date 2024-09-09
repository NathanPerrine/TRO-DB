<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';

    export let data: PageData;
</script>

<main>


  {#each Object.entries(data.spells) as [level, spells]}
  {#if spells.length}
  <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Spells</h2>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Effect</th>
        <th>Mana</th>
      </tr>
    </thead>
    <tbody>
      {#each spells as spell}
      <tr>
        <td><a href="{spell.spellSchool}/{spell.slug.current}">{spell.title}</a></td>
        <!-- <td>{spell.spellEffect}</td> -->
        <td>{spell.spellSchool}</td>
        <td>{spell.mpCost}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/if}
  {/each}

</main>




<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
  th {
    background-color: #fdf4df;
    color: #9c2c2f;
  }
  td {
    background-color: #f9f9f9;
  }
</style>