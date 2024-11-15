<script lang="ts">
  import { urlFor } from '$lib/utils/sanity/sanityImage';

  type ImageValue = {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alignment?: 'left' | 'right' | 'center';
    width?: number;
    alt?: string;
  };

  type PortableTextImage = {
    value: ImageValue;
    index: number;
    isInline: boolean;
  };

  let { portableText }: { portableText: PortableTextImage } = $props();

  const alignment = portableText.value.alignment || 'center';
  const width = portableText.value.width || 400;

  let imageUrl = $state(
    urlFor(portableText.value).sharpen(100).width(width).fit('scale').auto('format').url()
  );
</script>

<figure
  class="image-wrapper"
  class:left={alignment === 'left'}
  class:right={alignment === 'right'}
  class:center={alignment === 'center'}
>
  <img src={imageUrl} alt={portableText.value.alt} style="max-width: {width}px;" />
  {#if portableText.value.alt}
    <figcaption>
      {portableText.value.alt}
    </figcaption>
  {/if}
</figure>

<style>
  .image-wrapper {
    margin: 2rem 0;
    max-width: 100%;
  }

  .image-wrapper.left {
    float: left;
    margin: 0.5rem 2rem 0.5rem 0;
    max-width: 50%;
  }

  .image-wrapper.right {
    float: right;
    margin: 0.5rem 0 0.5rem 2rem;
    max-width: 50%;
  }

  .image-wrapper.center {
    clear: both;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  figcaption {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    text-align: center;
  }
</style>
