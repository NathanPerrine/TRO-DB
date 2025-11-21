<script lang="ts">
  import type { Section } from '$lib/schemas/guide.server';

  let { sections, activeSection, activeSubsection, onSectionChange } = $props<{
    sections: Section[];
    activeSection: number;
    activeSubsection: string | null;
    onSectionChange: (index: number, slug?: string) => void;
  }>();

  function handleSectionClick(index: number, sectionSlug: string) {
    onSectionChange(index, sectionSlug);
  }

  function scrollToSubsection(subsectionSlug: string) {
    // Update URL hash
    window.history.replaceState(null, '', `#${subsectionSlug}`);

    const element = document.getElementById(subsectionSlug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<aside class="table-of-contents">
  <div class="toc-header">
    <h3>Contents</h3>
  </div>
  <nav class="toc-nav">
    {#each sections as section, index}
      <div class="toc-section">
        <button
          class="toc-link"
          class:active={activeSection === index}
          onclick={() => handleSectionClick(index, section.sectionSlug.current)}
        >
          {section.sectionTitle}
        </button>

        <!-- Subsections -->
        {#if section.subsections && section.subsections.length > 0 && activeSection === index}
          <div class="subsections">
            {#each section.subsections as subsection}
              <button
                class="toc-sublink"
                class:active={activeSubsection === subsection.subsectionSlug.current}
                onclick={() => scrollToSubsection(subsection.subsectionSlug.current)}
              >
                {subsection.subsectionTitle}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </nav>
</aside>

<style lang="scss">
  .table-of-contents {
    flex: 0 0 280px;
    position: sticky;
    top: 2rem;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-height: calc(100vh - 4rem);
    overflow: hidden;
  }

  .toc-header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    flex-shrink: 0;

    h3 {
      font-size: 1.1rem;
      color: var(--color-header);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-divider);
    }
  }

  .toc-nav {
    flex: 1;
    overflow-y: auto;
    padding: 0 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-text-accent);
      border-radius: 3px;
    }
  }

  .toc-section {
    display: flex;
    flex-direction: column;
  }

  .toc-link {
    background: none;
    border: none;
    color: var(--color-text);
    text-align: left;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 2px solid transparent;
    font-size: 0.95rem;

    &:hover {
      background: var(--color-accent-hover);
      color: var(--color-text-accent);
    }

    &.active {
      border-left-color: var(--color-text-accent);
      color: var(--color-text-accent);
      background: var(--color-accent-hover);
      font-weight: 600;
    }
  }

  .subsections {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    gap: 0.125rem;
  }

  .toc-sublink {
    background: none;
    border: none;
    color: var(--color-inactive);
    text-align: left;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 1px solid var(--color-border);
    font-size: 0.85rem;

    &:hover {
      color: var(--color-text-accent);
      border-left-color: var(--color-text-accent);
      background: rgba(255, 255, 255, 0.02);
    }

    &.active {
      color: var(--color-text-accent);
      border-left-color: var(--color-text-accent);
      border-left-width: 2px;
      background: rgba(255, 255, 255, 0.05);
      font-weight: 600;
    }
  }

  @media (max-width: 1024px) {
    .table-of-contents {
      display: none;
    }
  }
</style>