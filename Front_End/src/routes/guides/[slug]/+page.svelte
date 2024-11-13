<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import ImageComponent from './ImageComponent.svelte';
  import { formatDate } from '$lib/utils/formatDate';

  let { data: guide } = $props();
  console.log(guide);
</script>

<main>
  <article class="guide-article">
    <h1>{guide.title}</h1>
    <div class="meta">
      <span>Scribe: {guide.author}</span>
      <span>Category: {guide.category}</span>
      <span class="date">Created: {formatDate(guide._createdAt)}</span>
      <span class="date">Updated: {formatDate(guide._updatedAt)}</span>
    </div>
    <p class="summary">{guide.summary}</p>

    <div class="content">
      <PortableText
        value={guide.content}
        components={{
          types: {
            image: ImageComponent
          }
        }}
      />
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
  }
</style>
