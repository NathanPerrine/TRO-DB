<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents, CustomBlockComponentProps } from '@portabletext/svelte';
  import type { SvelteComponent } from 'svelte';
  import ImageComponent from './ImageComponent.svelte';

  type ImageBlock = {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alignment?: 'left' | 'right' | 'center';
    width?: number;
    alt?: string;
  };

  let { data: guide } = $props();

  const components: PortableTextComponents = {
    types: {
      image: ImageComponent as unknown as SvelteComponent<{
        portableText: CustomBlockComponentProps<ImageBlock>;
      }>
    }
  };
</script>

<main>
  <article class="guide-article">
    <h1>{guide.title}</h1>
    <div class="meta">
      <span>Scribe: <span class="author">{guide.author}</span></span>
      <span>Category: {guide.category}</span>
      <span class="date">Created: {formatDate(guide._createdAt)}</span>
      <span class="date">Updated: {formatDate(guide._updatedAt)}</span>
    </div>
    <p class="summary">{guide.summary}</p>

    <div class="content">
      <PortableText value={guide.content} {components} />
      <!-- <PortableText
        value={guide.content}
        components={{
          types: {
            image: ImageComponent
          }
        }}
      /> -->
    </div>
  </article>
</main>

<style style="scss">
  .guide-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    .author {
      color: var(--color-text-accent);
    }

    .date {
      color: var(--color-inactive);
    }
  }

  .summary {
    color: var(--color-inactive);
    margin-bottom: 2rem;
    font-style: italic;
  }

  .content {
    line-height: 1.6;
    font-size: 1.1rem;

    :global(p) {
      &:empty {
        min-height: 1em;
      }
    }

    :global(p),
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      clear: none;
    }

    :global(.clear-float) {
      clear: both;
    }
  }
</style>
