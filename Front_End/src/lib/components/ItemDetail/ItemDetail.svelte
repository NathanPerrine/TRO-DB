<script lang="ts">
  import type { ItemDetail } from '$lib/schemas/item.server';
  import ItemImage from '../common/ItemImage.svelte';

  let { item }: { item: Omit<ItemDetail, 'type' | 'slug' | 'notes'> } = $props();
</script>

<header>
  <div class="header-info">
    <h1>{item.name}</h1>
    <h3>Description:</h3>
    {#if item.description}
      <p>{item.description}</p>
    {/if}
    <h3>Description (Identified):</h3>
    {#if item.descriptionIdentified}
      {item.descriptionIdentified}
    {/if}
  </div>

  {#if item.image}
    <ItemImage image={item.image} alt={item.name} />
  {/if}
</header>

<section>
  <h2>Item Details</h2>
  <ul class="ul-diamond">
    <li>
      <strong>Weight:</strong>
      {#if item.weight}
        {item.weight}
      {/if}
    </li>
    <li>
      <strong>Condition:</strong>
      {#if item.condition}
        {item.condition}
      {/if}
    </li>
    <li>
      <strong>Buy Price:</strong>
      {#if item.buyPrice}
        {item.buyPrice}
      {/if}
    </li>
    <li>
      <strong>Sell Price:</strong>
      {#if item.sellPrice}
        {item.sellPrice}
      {/if}
    </li>
    {#if item.charges}
      <li>
        <strong>Charges:</strong>
        {item.charges}
      </li>
    {/if}
  </ul>
</section>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  header {
    display: flex;
    gap: 24px;
    align-items: flex-start;

    @include tablet-and-up {
      flex-direction: column;
      align-items: center;
    }
  }

  .header-info {
    flex: 1;
    min-width: 0;
  }
</style>
