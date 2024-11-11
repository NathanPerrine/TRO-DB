<script lang="ts">
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import type { PageData } from './$types';
  import { mockGuides } from './mockGuides';

  // export let data: PageData;
  // console.log(data.guides);

  $: guidesByType = mockGuides.reduce((acc, guide) => {
    if (!acc[guide.type]) {
      acc[guide.type] = [];
    }
    acc[guide.type].push(guide);
    return acc;
  }, {});

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
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
  };
</script>

<main>
  <!-- <PageHeader description={data.description} /> -->
  <div class="guide-container">
    <h1 class="main-title">Adventure Guides</h1>

    {#each Object.entries(guidesByType) as [type, typeGuides]}
      <section class="guide-section">
        <h2 class="type-title">
          <i class={getTypeIcon(type)}></i>
          {type} Guides
        </h2>
        <div class="guide-grid">
          {#each typeGuides as guide}
            <article class="guide-card">
              <div class="card-frame">
                <h3 class="guide-title">{guide.title}</h3>
                <p class="guide-summary">{guide.summary}</p>
                <div class="guide-dates">
                  <div class="author-info">
                    By: {guide.author}
                  </div>
                  <div class="date-info">
                    <span>Scribed: {formatDate(guide.createdAt)}</span>
                    <span>Updated: {formatDate(guide.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</main>

<style lang="scss">
  h2,
  h3 {
    border: none;
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

  .guide-section {
    margin-bottom: 3rem;
  }

  .type-title {
    color: var(--color-text);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    i {
      margin-right: 1rem;
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
