<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import { formatDate } from '$lib/utils/formatDate';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // Reorder `GUIDE_SECTION_ORDER` to update the order guides are displayed on the page
  const GUIDE_SECTION_ORDER = ['New Player', 'Leveling', 'Money Making', 'Crafting', 'Other'];
  const sortedGuides = Object.entries(data.guides).sort(([a], [b]) => {
    const indexA = GUIDE_SECTION_ORDER.indexOf(a);
    const indexB = GUIDE_SECTION_ORDER.indexOf(b);
    return indexA - indexB;
  });

  function getTypeIcon(type: string) {
    switch (type.toLowerCase()) {
      case 'leveling':
        return 'sword';
      case 'new player':
        return 'scroll';
      case 'money making':
        return 'coins';
      case 'crafting':
        return 'anvil';
      default:
        return 'scroll';
    }
  }

  let expandedSections = $state(
    Object.keys(data.guides).reduce(
      (acc, type) => {
        // Start with all sections expanded
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
  <PageHeader description={data.description} />
  <div class="guide-container">
    <h1 class="main-title">Adventure Guides</h1>

    {#each sortedGuides as [type, typeGuides]}
      <section class="guide-section">
        <div class="title-container">
          <h2 class="type-title">
            <button
              class="header-button"
              class:expanded={expandedSections[type]}
              onclick={() => toggleSection(type)}
              aria-expanded={expandedSections[type]}
            >
              <i class={getTypeIcon(type)}></i>
              <span class="capitalize">{type} Guides</span>
              <span class="arrow">▶</span>
            </button>
          </h2>
        </div>
        {#if expandedSections[type]}
          <div class="guide-grid">
            {#each typeGuides as guide}
              <a href="/guides/{guide.slug.current}">
                <article class="guide-card">
                  <div class="card-frame">
                    <h3 class="guide-title">{guide.title}</h3>
                    <p class="guide-summary">{guide.summary}</p>
                    <div class="guide-dates">
                      <div class="author-info">
                        By: {guide.author}
                      </div>
                      <div class="date-info">
                        <span>Scribed: {formatDate(guide._createdAt)}</span>
                        <span>Updated: {formatDate(guide._updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </a>
            {/each}
          </div>
        {/if}
      </section>
    {/each}
  </div>
</main>

<style lang="scss">
  h2,
  h3 {
    border: none;
  }

  .title-container {
    display: flex;
    justify-content: center;
    border-bottom: 1px dashed var(--color-border);
  }

  // Icon styles
  .sword::before {
    content: '⚔️';
  }
  .scroll::before {
    content: '📜';
  }
  .coins::before {
    content: '💰';
  }
  .anvil::before {
    content: '🛠️';
  }

  .guide-container {
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

    i {
      margin-right: 1rem;
    }

    .arrow {
      margin-left: 1rem;
    }
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .guide-card {
    height: 250px;
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

  .guide-title {
    color: var(--color-text-accent);
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Medieval', serif;
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .guide-summary {
    font-size: 1.1rem;
    color: var(--color-text);
    line-height: 1.4;
    height: 3rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .guide-dates {
    height: 2rem;
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--color-text) 80%, white);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid color-mix(in srgb, var(--color-border) 30%, transparent);
    padding-top: 1rem;
    margin-top: auto;

    .date-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-style: italic;
      text-align: right;
    }

    .author-info {
      font-style: italic;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    .guide-grid {
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
