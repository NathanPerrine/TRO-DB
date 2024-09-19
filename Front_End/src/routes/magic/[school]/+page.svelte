<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main>
  <header>
    <h1>{data.description.name}</h1>
    <p>{data.description.description}</p>
  </header>

  {#each Object.entries(data.spells) as [level, spells]}
  {#if spells.length}
  <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Spells</h2>
  <table>
    <thead>
      <tr>
        <th style="width:20%">Title</th>
        <th style="width:5%">Mana</th>
        <th style="width:75%">Effect</th>
      </tr>
    </thead>
    <tbody>
      {#each spells as spell}
      <tr>
        <td><a href="{spell.spellSchool}/{spell.slug.current}">{spell.title}</a></td>
        <td>{spell.mpCost}</td>
        <td>{spell.spellEffect}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/if}
  {/each}
</main>
