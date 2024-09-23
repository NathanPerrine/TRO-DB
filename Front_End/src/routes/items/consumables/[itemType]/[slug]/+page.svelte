<script lang="ts">
  import type { PageData } from './$types';
	import Notes from '$lib/components/Notes/Notes.svelte';

  export let data: PageData;

</script>

<main>
  <header>
    <h1>{data.item.name}</h1>
    <h3>Description:</h3>
    <p>{data.item.description}</p>
    <h3>Description (Identified):</h3>
    {#if data.item.descriptionIdentified}
      {data.item.descriptionIdentified}
    {/if}
  </header>

  <section>
    <h2>Item Details</h2>
    <ul class="ul-diamond">
      <li><strong>Weight:</strong>
        {#if data.item.weight}
          {data.item.weight}
        {/if}
      </li>
      <li><strong>Condition:</strong>
        {#if data.item.condition}
          {data.item.condition}
        {/if}
      </li>
      <li><strong>Buy Price:</strong>
        {#if data.item.buyPrice}
          {data.item.buyPrice}
        {/if}
      </li>
      <li><strong>Sell Price:</strong>
        {#if data.item.sellPrice}
          {data.item.sellPrice}
        {/if}
      </li>
      {#if data.item.charges}
        <li><strong>Charges:</strong>
          {data.item.charges}
        </li>
      {/if}
    </ul>
  </section>

  <Notes notes={data.item.notes} />
</main>