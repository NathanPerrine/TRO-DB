<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';

  export let data: PageData;

  // Create ordered map of spells
  $: spellsMap = new Map([
    ['familiar', data.spells.familiar],
    ['proficient', data.spells.proficient],
    ['expert', data.spells.expert],
    ['master', data.spells.master],
    ['grandmaster', data.spells.grandmaster],
    ['supreme-master', data.spells['supreme-master']]
  ]);
</script>

<main>
  <PageHeader description={data.description} />

  {#each Array.from(spellsMap) as [level, spells]}
    {#if spells.length}
      <h2>{level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')} Spells</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width:20%">Spell</th>
              <th style="width:5%">Mana</th>
              <th>Effect</th>
              <th style="width:15%">Drop Only</th>
            </tr>
          </thead>
          <tbody>
            {#each spells as spell}
              <tr>
                <td><a href="{spell.spellSchool}/{spell.slug.current}">{spell.title}</a></td>
                <td>{spell.mpCost}</td>
                <td>{spell.spellEffect}</td>
                <td>
                  {#if spell.dropOnly}
                    <span class="check">&#10003;</span>
                  {:else}
                    <span class="cross">&#10007;</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/each}
</main>
