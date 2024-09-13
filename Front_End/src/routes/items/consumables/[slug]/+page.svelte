<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
    import type { PageData } from './$types';
	import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';

    export let data: PageData;
    const bulletContext = 'note'

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
      <li><strong>Charges:</strong>
        {#if data.item.charges}
          {data.item.charges}
        {/if}
      </li>
    </ul>
  </section>

  <h2>Notes</h2>
  {#if data.item.notes}
    <PortableText
      value={data.item.notes}
      context={{ bulletContext }}
      components={{
        listItem: {
          normal: UnorderedList
        },
      }}
    />
  {:else}
    <ul class="ul-note">
      <li></li>
    </ul>
  {/if}
</main>