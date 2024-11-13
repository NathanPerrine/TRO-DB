<script lang="ts">
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  export let portableText;
</script>

<figure>
  <img
    src={urlFor(portableText.value).sharpen(100).width(400).fit('scale').auto('format').url()}
    alt={portableText.value.alt}
  />
  {#if portableText.value.alt}
    <figcaption>
      {portableText.value.alt}
    </figcaption>
  {/if}
</figure>

<style>
  figure {
    margin: 2rem 0;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  figcaption {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }
</style>
