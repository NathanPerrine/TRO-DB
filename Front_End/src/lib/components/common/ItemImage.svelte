<script lang="ts">
  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  import ImageModal from './ImageModal.svelte';

  let { image, alt }: { image: SanityImageSource; alt: string } = $props();

  let isModalOpen = $state(false);
  const toggleModal = () => (isModalOpen = !isModalOpen);
</script>

<button class="image-button" onclick={toggleModal}>
  <img src={urlFor(image).width(300).url()} {alt} />
</button>

{#if isModalOpen}
  <ImageModal isOpen={isModalOpen} imageUrl={urlFor(image).url()} {alt} onClose={toggleModal} />
{/if}

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

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
