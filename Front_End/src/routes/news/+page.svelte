<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const NEWS_SECTION_ORDER = ['Announcement', 'Game Update', 'Site Update', 'Community'];
  const sortedNews = Object.entries(data.news).sort(([a], [b]) => {
    const indexA = NEWS_SECTION_ORDER.indexOf(a);
    const indexB = NEWS_SECTION_ORDER.indexOf(b);
    return indexA - indexB;
  });

  let expandedSections = $state(
    Object.keys(data.news).reduce(
      (acc, type) => {
        acc[type] = true;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  function toggleSection(type: string) {
    expandedSections[type] = !expandedSections[type];
  }
</script>

<main>
  <div class="news-container">
    <h1 class="main-title">News</h1>

    {#each sortedNews as [category, categoryNews]}
      {#if categoryNews && categoryNews.length > 0}
        <section class="news-section">
          <div class="title-container">
            <h2 class="type-title">
              <button
                class="header-button"
                class:expanded={expandedSections[category]}
                onclick={() => toggleSection(category)}
                aria-expanded={expandedSections[category]}
              >
                <span class="capitalize">{category}</span>
                <span class="arrow">▶</span>
              </button>
            </h2>
          </div>
          {#if expandedSections[category]}
            <div class="news-grid">
              {#each categoryNews as article}
                <a href="/news/{article.slug.current}">
                  <article class="news-card">
                    <div class="card-frame">
                      <h3 class="news-title">{article.title}</h3>
                      <p class="news-summary">{article.summary}</p>
                      <div class="news-meta">
                        <div class="author-info">
                          By: {article.author}
                        </div>
                        <div class="date-info">
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              {/each}
            </div>
          {/if}
        </section>
      {/if}
    {/each}
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  a {
    border-bottom: none;
  }

  h2,
  h3 {
    border: none;
  }

  .title-container {
    display: flex;
    justify-content: center;
    border-bottom: 1px dashed var(--color-border);
  }

  .news-container {
    background: var(--color-background);
    color: var(--color-text);
    padding: 2rem;
    font-family: serif;
  }

  .main-title {
    text-align: center;
    color: var(--color-text);
    font-size: 3rem;
    margin: 2rem 0;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-family: serif;
  }

  .type-title {
    color: var(--color-text);
    font-size: 2rem;
    text-align: center;

    .arrow {
      margin-left: 1rem;
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .news-card {
    height: 220px;
    display: flex;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    .card-frame {
      background-color: color-mix(in srgb, var(--color-background) 95%, white);
      border-radius: 8px;
      padding: 1.5rem;
      border: 3px solid var(--color-border);
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 5px var(--color-border);
      position: relative;
      transition: all 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border: 1px solid color-mix(in srgb, var(--color-border) 30%, transparent);
        border-radius: 4px;
        pointer-events: none;
      }
    }
  }

  .news-title {
    color: var(--color-text-accent);
    font-size: 1.3rem;
    text-align: center;
    font-family: 'Medieval', serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .news-summary {
    font-size: 1rem;
    color: var(--color-text);
    line-height: 1.4;
    flex: 1;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .news-meta {
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--color-text) 80%, white);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid color-mix(in srgb, var(--color-border) 30%, transparent);
    padding-top: 0.75rem;
    margin-top: auto;

    .date-info {
      font-style: italic;
      text-align: right;
    }

    .author-info {
      font-style: italic;
      display: flex;
      align-items: center;
    }
  }

  @include mobile {
    .news-grid {
      grid-template-columns: 1fr;
    }
    .main-title {
      font-size: 2rem;
    }
    .type-title {
      font-size: 1.5rem;
    }
  }
</style>
