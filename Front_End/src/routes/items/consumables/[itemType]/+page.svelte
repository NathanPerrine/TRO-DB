<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  <header>
    <h1>{data.description.name}</h1>
    <PortableText value={data.description.description} components={{}} />
  </header>
  <section>
    <div class="border-gradient"></div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {#each data.scrolls as scroll}
          <tr>
            <td><a href="{data.description.name}/{scroll.slug.current}">{scroll.name}</a></td>
            <td>{scroll.descriptionIdentified}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
