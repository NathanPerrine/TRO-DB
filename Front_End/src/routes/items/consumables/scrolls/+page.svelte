<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main>
  <header>
    <h1>Scrolls</h1>
    <p>
      Scrolls are magical single-use items that contain a variety of effects, ranging from powerful buff spells to summoning monsters in combat.
      They can be found from monster loot or occasionally sold in magic shops.
    </p>
  </header>

  <section>
    <h3></h3>
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
            <td><a href="{scroll.slug.current}">{scroll.name}</a></td>
            <td>{scroll.descriptionIdentified}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>