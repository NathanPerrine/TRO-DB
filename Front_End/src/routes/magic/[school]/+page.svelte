<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const bulletContext = 'diamond';
</script>

<main>
  <header>
    <h1>{data.description.name}</h1>
    <p>{data.description.description}</p>
    {#if data.description.extras}
      <h3>Extra Info:</h3>
      <PortableText
        value={data.description.extras}
        context={{ bulletContext }}
        components={{
          listItem: {
            normal: UnorderedList
          }
        }}
      />
    {/if}
  </header>

  {#each Object.entries(data.spells) as [level, spells]}
    {#if spells.length}
      <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Spells</h2>
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
  {/each}
</main>
