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
          {#each data.items as item}
            <tr>
              <td><a href="/items/consumables/{data.slug}/{item.slug.current}">{item.name}</a></td>
              <td>{item.descriptionIdentified}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
