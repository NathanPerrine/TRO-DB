<script lang="ts">
  import type { PageData } from './$types';
  import { PortableText } from '@portabletext/svelte';
  import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';

  export let data: PageData;
  const bulletContext = 'diamond';
</script>

<main>
  <header>
    <h1>{data.description.name}</h1>
    <PortableText
      value={data.description.description}
      components={{}}
    />
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

  <section>
    <h2>Mobs</h2>
    <table>
      <thead>
        <tr>
          <th style="">Name</th>
          <th style="width: 30%">Level Range</th>
          <th style="width: 30%">HP Range</th>
        </tr>
      </thead>
      <tbody>
        {#each data.mobs as mob}
          <tr>
            <td><a href="/mobs/{mob.slug.current}">{mob.name}</a></td>
            <td>{mob.levelRange?.min} - {mob.levelRange?.max}</td>
            <td>{mob.hpRange?.min} - {mob.hpRange?.max}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
