<script lang="ts">
    import type { PageData } from './$types';

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
        <td>{spell.spellEffect}</td>
        <td>{spell.mpCost}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/if}
  {/each}
</main>
