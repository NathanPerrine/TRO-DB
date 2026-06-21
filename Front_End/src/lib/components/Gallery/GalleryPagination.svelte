<script lang="ts">
  interface Props {
    currentPage: number;
    totalPages: number;
    buildUrl: (page: number) => string;
  }

  let { currentPage, totalPages, buildUrl }: Props = $props();
  const shownPages = $derived.by(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      let pages = [];
      // Window bounds
      const windowStart = Math.max(2, currentPage - 1);
      const windowEnd = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (windowStart > 2) {
        pages.push(null);
      }

      for (let i = windowStart; i <= windowEnd; i++) {
        pages.push(i);
      }

      if (windowEnd < totalPages - 1) {
        pages.push(null);
      }

      pages.push(totalPages);
      return pages;
    }
  });
</script>

{#if totalPages > 1}
  <nav class="pagination">
    {#if currentPage > 1}
      <a class="page-step" href={buildUrl(currentPage - 1)}>&larr;</a>
    {:else}
      <span class="page-step disabled">&larr;</span>
    {/if}

    {#each shownPages as page}
      {#if page === null}
        <span class="ellipsis">...</span>
      {:else if page === currentPage}
        <span class="page-current" aria-current="page">{page}</span>
      {:else}
        <a class="page-link" href={buildUrl(page)}>{page}</a>
      {/if}
    {/each}

    {#if currentPage < totalPages}
      <a class="page-step" href={buildUrl(currentPage + 1)}>&rarr;</a>
    {:else}
      <span class="page-step disabled">&rarr;</span>
    {/if}
  </nav>
{/if}

<style lang="scss">
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .page-link,
  .page-current,
  .page-step {
    min-width: 2rem;
    padding: 0.375rem 0.625rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.875rem;
    text-align: center;
    text-decoration: none;
    color: var(--color-text);
    background-color: var(--color-button-bg);
  }

  .page-link:hover,
  .page-step:hover {
    background-color: var(--color-button-hover);
    border-color: var(--color-text-accent);
  }

  .page-current {
    border-color: var(--color-text-accent);
    color: var(--color-text-accent);
    cursor: default;
  }

  .page-step.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  .ellipsis {
    color: var(--color-inactive);
    padding: 0 0.25rem;
    align-self: flex-end;
  }
</style>
