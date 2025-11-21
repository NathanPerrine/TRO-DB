<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';

  let { data }: { data: PageData } = $props();
</script>

<main>
  <PageHeader description={data.description} />

  <section>
    <div class="border-gradient"></div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each data.items as scroll}
            <tr>
              <td><a href="{data.description.name.toLowerCase()}/{scroll.slug.current}">{scroll.name}</a></td>
              <td>{scroll.descriptionIdentified}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
