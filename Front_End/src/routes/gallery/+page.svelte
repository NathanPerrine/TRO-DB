<script lang="ts">
  import { goto } from '$app/navigation';
  import GalleryCard from '$lib/components/Gallery/GalleryCard.svelte';
  import GalleryPagination from '$lib/components/Gallery/GalleryPagination.svelte';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';
  import {
    galleryGroups,
    gallerySubCategories,
    resolveActiveGroup
  } from '$lib/utils/galleryCategories';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const activeGroup = $derived(resolveActiveGroup(data.categoryParam));
  const subCategories = $derived(gallerySubCategories.filter((sub) => sub.group === activeGroup));

  function buildUrl(overrides: { category?: string; page?: number; sort?: string }): string {
    const params = new URLSearchParams();
    params.set('category', overrides.category ?? data.categoryParam);
    params.set('sort', overrides.sort ?? data.sortParam);
    params.set('page', String(overrides.page ?? data.pageNum));
    return `/gallery?${params.toString()}`;
  }

  function activeMainCategory(category: string): boolean {
    return category === activeGroup;
  }

  function activeSubCategory(subCategory: string): boolean {
    return subCategory === data.categoryParam;
  }

  function onSortChange(event: Event) {
    const sort = (event.currentTarget as HTMLSelectElement).value;
    goto(buildUrl({ sort, page: 1 }));
  }

  const imageCountStart = $derived((data.pageNum - 1) * data.limit + 1);
  const imageCountEnd   = $derived(Math.min(data.pageNum * data.limit, data.total));
</script>

<main>
  {#if data.description}
    <PageHeader description={data.description} />
  {/if}

  <section>
    <!-- Category filter -->
    <h2>Category:</h2>
    <div class="filter-bar">
      {#each galleryGroups as category}
        <a
          href={buildUrl({ category: category.value })}
          class={['filter-pill', { active: activeMainCategory(category.value) }]}
          >{category.label}
        </a>
      {/each}
    </div>
    <!-- Subcategory filter -->
    <div class="sub-filter-bar">
      {#each subCategories as sub}
        <a
          href={buildUrl({ category: sub.value })}
          class={['sub-pill', { active: activeSubCategory(sub.value) }]}
        >
          {sub.label}
        </a>
      {/each}
    </div>
  </section>

  <section>
    <div class="results-bar">
      <div class="results-count">
        <p>Showing {imageCountStart}-{imageCountEnd} of {data.total}</p>
      </div>
      <div class="results-sort">
        <label for="sort-select">Sort:</label>
        <select class="sort-select" id="sort-select" value={data.sortParam} onchange={onSortChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>
  </section>

  <section>
    <div class="gallery-grid">
      {#each data.gallery as gallery}
        <GalleryCard item={gallery} />
      {/each}
    </div>
  </section>

  <!-- pagination filters -->
  <GalleryPagination
    currentPage={data.pageNum}
    totalPages={data.totalPages}
    buildUrl={(page) => buildUrl({ page })}
  />
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .filter-pill {
    cursor: pointer;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    padding: 6px 12px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-button-hover);
      transform: scale(1.05);
    }

    &.active {
      background-color: var(--color-button-hover);
      color: var(--color-text-accent);
    }
  }

  .sub-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-divider);
  }

  .sub-pill {
    padding: 0.25rem 0.625rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.8125rem;
    color: var(--color-inactive);
    text-decoration: none;

    &.active {
      color: var(--color-text-accent);
      border-color: var(--color-text-accent);
    }
  }

  .results-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .results-count {
    font-size: 0.875rem;
    color: var(--color-inactive);
  }

  .sort-select {
    font-size: 0.875rem;
    color: var(--color-text);
    background-color: var(--color-button-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;

    @include desktop {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @include tablet-and-up {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include mobile {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
