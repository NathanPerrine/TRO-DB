<script lang="ts">
  import type { ItemDetail } from '$lib/schemas/item.server';
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  import ImageModal from '../common/ImageModal.svelte';

  let isModalOpen = $state(false);
  const toggleModal = () => (isModalOpen = !isModalOpen);

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
    <button class="image-button" onclick={toggleModal}>
      <img src={urlFor(item.image).width(300).url()} alt={item.name} />
    </button>

    {#if isModalOpen}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={urlFor(item.image).url()}
        alt={item.name}
        onClose={toggleModal}
      />
    {/if}
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

  .image-button {
    flex-shrink: 0;
    width: 300px;
    max-width: 100%;

    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    @include tablet-and-up {
      width: 360px;
    }
  }
</style>
