<script lang="ts">
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  import type { GalleryListItem } from '$lib/schemas/gallery.server';
  let { item }: { item: GalleryListItem } = $props();
  let imgUrl = $derived(urlFor(item.image).width(200).height(300).fit('crop').auto('format').url())
</script>

<a href="/gallery/{item.slug.current}" class="gallery-card">
  <div class="img-wrapper">
    <img src={imgUrl} alt={item.alt ?? item.title} loading="lazy">
  </div>
  <div class="card-info">
    <p class="card-title">{item.title}</p>
    <p class="card-category">{item.category}</p>
  </div>
</a>


<style lang="scss">
  .gallery-card {
    display: block;
    text-decoration: none;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--color-accent);
    transition: transform 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: var(--color-text-accent);
    }
  }

  .img-wrapper {
    aspect-ratio: 1;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .card-info {
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }

  .card-title {
    font-size: 0.875rem;
    color: var(--color-header);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-category {
    font-size: 0.75rem;
    color: var(--color-inactive);
    text-transform: capitalize;
    flex-shrink: 0;
  }
</style>