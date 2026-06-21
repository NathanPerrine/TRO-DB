<script lang="ts">
  import ImageModal from '$lib/components/common/ImageModal.svelte';
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const imgUrl = $derived(urlFor(data.image).auto('format').url());
  const relatedItemUrl = $derived.by(() => {
    if (data.relatedAccessory) {
      let label = data.relatedAccessory.identifiedName;
      let href = `/items/equipment/accessories/${data.relatedAccessory.slug.current}`;
      return { label, href };
    } else if (data.relatedEquipment) {
      let label = data.relatedEquipment.identifiedName;
      let armorWeapon = data.relatedEquipment.armorWeapon;
      let href = `/items/equipment/${armorWeapon === 'weapon' ? 'weapons' : 'armor'}/${data.relatedEquipment.slug.current}`;
      return { label, href };
    } else if (data.relatedItem) {
      let label = data.relatedItem.name;
      let href = `/items/consumables/dyes/${data.relatedItem.slug.current}`;
      return { label, href };
    } else {
      return null;
    }
  });

  let isModalOpen = $state(false);
  const toggleModal = () => (isModalOpen = !isModalOpen);
</script>

<main>
  <div class="detail-layout">
    <div class="image-panel">
      <button class="image-button" onclick={toggleModal}>
        <img src={imgUrl} alt={data.alt ?? data.title} />
      </button>
    </div>
    <div>
      <h1>{data.title}</h1>
      <p class="meta-label">{data.category}</p>
      {#if data.description}
        <p>{data.description}</p>
      {/if}
      {#if data.tags && data.tags.length}
        <p class="meta-label">Tags</p>
        <div class="tag-list">
          {#each data.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      {#if relatedItemUrl}
        <hr />
        <p class="meta-label">Related Item</p>
        <a class="related-link" href={relatedItemUrl.href}>{relatedItemUrl.label} &rarr;</a>
      {/if}
    </div>
  </div>

  {#if isModalOpen}
    <ImageModal
      isOpen={isModalOpen}
      imageUrl={urlFor(data.image).url()}
      alt={data.alt ?? data.title}
      onClose={toggleModal}
    />
  {/if}
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .detail-layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 1.5rem;
    align-items: start;

    @include tablet-and-up {
      grid-template-columns: 1fr; // stack on narrow screens
    }
  }

  .image-panel {
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    background-color: var(--color-accent);

    img {
      image-rendering: pixelated;
      max-width: 100%;
      height: auto;
    }
  }

  .meta-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-inactive);
    margin-bottom: 0.5rem;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.125rem 0.625rem;
    border-radius: 4px;
    background-color: var(--color-accent);
    border: 1px solid var(--color-border);
    color: var(--color-inactive);
  }

  .related-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    color: var(--color-text-accent);
  }
</style>
