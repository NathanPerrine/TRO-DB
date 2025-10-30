<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextComponents } from '@portabletext/svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import ImageComponent from './ImageComponent.svelte';
  import TableComponent from './TableComponent.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import InternalLink from './InternalLink.svelte';
  import PageLink from './PageLink.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let { data: guide } = $props();

  // Active section for chapter tabs with transition tracking
  let activeSection = $state(0);
  let isTransitioning = $state(false);
  let direction = $state<'forward' | 'backward'>('forward');
  let activeSubsection = $state<string | null>(null);
  let tabsContainer: HTMLElement | null = $state(null);

  const components: PortableTextComponents = {
    types: {
      image: ImageComponent as any,
      table: TableComponent as any
    },
    marks: {
      link: ExternalLink as any,
      internalLink: InternalLink as any,
      pageLink: PageLink as any
    }
  };

  // Generate anchor ID from slug
  function getAnchorId(slug: { current: string }): string {
    return slug.current;
  }

  // Change section with direction tracking
  function changeSection(newIndex: number, sectionSlug?: string) {
    if (newIndex === activeSection || isTransitioning) return;

    direction = newIndex > activeSection ? 'forward' : 'backward';
    isTransitioning = true;
    activeSection = newIndex;

    // Update URL hash if slug provided
    if (sectionSlug) {
      window.history.replaceState(null, '', `#${sectionSlug}`);
    }

    // Scroll to article top after transition
    setTimeout(() => {
      const article = document.querySelector('.guide-article');
      if (article) {
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 650);

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  // Scroll spy for subsections
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSubsection = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    // Observe all subsection elements
    const subsections = document.querySelectorAll('.subsection');
    subsections.forEach((subsection) => observer.observe(subsection));

    return () => observer.disconnect();
  });

  // Scroll tabs left/right
  function scrollTabs(direction: 'left' | 'right') {
    if (!tabsContainer) return;
    const scrollAmount = 200;
    tabsContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  // Handle initial hash navigation on mount
  $effect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) return;

    // Find section or subsection matching hash
    guide.sections.forEach((section, index) => {
      if (section.sectionSlug.current === hash) {
        activeSection = index;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        return;
      }

      // Check subsections
      section.subsections?.forEach((subsection) => {
        if (subsection.subsectionSlug.current === hash) {
          activeSection = index;
          setTimeout(() => {
            const element = document.getElementById(hash);
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    });
  });
</script>

<main class="guide-container">
  <article class="guide-article">
    <h1>{guide.title}</h1>
    <div class="meta">
      <span>Scribe: <span class="author">{guide.author}</span></span>
      <span>Category: {guide.category}</span>
      <span class="date">Created: {formatDate(guide._createdAt)}</span>
      <span class="date">Updated: {formatDate(guide._updatedAt)}</span>
    </div>
    <p class="summary">{guide.summary}</p>

    <!-- Chapter Tabs -->
    <div class="tabs-container">
      <button class="scroll-btn scroll-left" onclick={() => scrollTabs('left')} aria-label="Scroll left">
        ‹
      </button>
      <nav class="chapter-tabs" bind:this={tabsContainer}>
        {#each guide.sections as section, index}
          <button
            class="tab"
            class:active={activeSection === index}
            onclick={() => changeSection(index, section.sectionSlug.current)}
            disabled={isTransitioning}
          >
            {section.sectionTitle}
          </button>
        {/each}
      </nav>
      <button class="scroll-btn scroll-right" onclick={() => scrollTabs('right')} aria-label="Scroll right">
        ›
      </button>
    </div>

    <!-- Active Section Content -->
    <div class="section-content" class:transitioning={isTransitioning}>
      {#each guide.sections as section, index}
        {#if activeSection === index}
          <section
            id={getAnchorId(section.sectionSlug)}
            class="guide-section"
            in:fly={{
              x: direction === 'forward' ? 300 : -300,
              duration: 500,
              easing: quintOut,
              opacity: 0
            }}
            out:fly={{
              x: direction === 'forward' ? -300 : 300,
              duration: 500,
              easing: quintOut,
              opacity: 0
            }}
          >
            <h2>{section.sectionTitle}</h2>
            <div class="content">
              <PortableText value={section.content} components={components} />
            </div>

            <!-- Subsections -->
            {#if section.subsections && section.subsections.length > 0}
              {#each section.subsections as subsection}
                <div id={getAnchorId(subsection.subsectionSlug)} class="subsection">
                  <h3>{subsection.subsectionTitle}</h3>
                  <div class="content">
                    <PortableText value={subsection.content} components={components} />
                  </div>
                </div>
              {/each}
            {/if}
          </section>
        {/if}
      {/each}
    </div>

    <!-- Related Guides -->
    {#if guide.relatedGuides && guide.relatedGuides.length > 0}
      <aside class="related-guides">
        <h3>Related Scrolls</h3>
        <div class="related-grid">
          {#each guide.relatedGuides as related}
            <a href="/guides/{related.slug.current}" class="related-card">
              <h4>{related.title}</h4>
              <p>{related.summary}</p>
            </a>
          {/each}
        </div>
      </aside>
    {/if}
  </article>

  <!-- Table of Contents Sidebar -->
  <TableOfContents
    sections={guide.sections}
    {activeSection}
    {activeSubsection}
    onSectionChange={changeSection}
  />
</main>

<style lang="scss">
  .guide-container {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 1rem;
    max-width: 1400px;
    // margin: 0 auto;
    // padding: 0 1rem;
    padding: 0 0 0 45px;
  }

  .guide-article {
    max-width: 900px;
    min-width: 0; // Prevent grid overflow
    padding-bottom: 3rem; // Bottom spacing for article content
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--color-header);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-divider);

    .author {
      color: var(--color-text-accent);
      font-weight: 600;
    }

    .date {
      color: var(--color-inactive);
    }
  }

  .summary {
    color: var(--color-text);
    margin-bottom: 2rem;
    font-style: italic;
    font-size: 1.1rem;
    text-align: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-left: 3px solid var(--color-text-accent);
    border-radius: 4px;
  }

  /* Chapter Tabs - Tome Style */
  .tabs-container {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0;
  }

  .scroll-btn {
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    color: var(--color-text-accent);
    cursor: pointer;
    padding: 0.75rem 0.75rem;
    font-size: 1.5rem;
    line-height: 1;
    transition: all 0.2s ease;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 0.5rem;

    &:hover {
      background: var(--color-accent-hover);
      color: var(--color-header);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .chapter-tabs {
    display: flex;
    gap: 0.25rem;
    overflow-x: auto;
    padding-top: 0.5rem;
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 2px solid var(--color-border);
    flex: 1;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tab {
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-bottom: none;
    color: var(--color-inactive);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    border-radius: 8px 8px 0 0;

    &:hover:not(:disabled) {
      background: var(--color-accent-hover);
      color: var(--color-text);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &.active {
      background: var(--color-background);
      border-color: var(--color-text-accent);
      color: var(--color-text-accent);
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: -1px;
        right: -1px;
        height: 3px;
        background: var(--color-background);
      }
    }
  }

  /* Section Content */
  .section-content {
    min-height: 400px;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
    border-radius: 0 4px 4px 4px;
    padding: 2rem;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .guide-section {
    h2 {
      font-size: 2rem;
      color: var(--color-header);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-text-accent);
    }
  }

  .subsection {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-divider);

    h3 {
      font-size: 1.5rem;
      color: var(--color-text-accent);
      margin-bottom: 1rem;
    }
  }

  .content {
    line-height: 1.7;
    font-size: 1.05rem;
    color: var(--color-text);
  }

  .content :global(p) {
    margin-bottom: 1rem;

    &:empty {
      min-height: 1em;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .content :global(strong) {
    color: var(--color-header);
    font-weight: 600;
  }

  .content :global(em) {
    color: var(--color-text-accent);
  }

  .content :global(ul),
  .content :global(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .content :global(ul li),
  .content :global(ol li) {
    margin-bottom: 0.5rem;
  }

  .content :global(code) {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  .content :global(h1),
  .content :global(h2),
  .content :global(h3),
  .content :global(h4),
  .content :global(h5),
  .content :global(h6) {
    clear: none;
  }

  .content :global(.clear-float) {
    clear: both;
  }

  /* Related Guides */
  .related-guides {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--color-border);

    h3 {
      font-size: 1.5rem;
      color: var(--color-header);
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .related-card {
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.25rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: block;

    h4 {
      color: var(--color-text-accent);
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--color-inactive);
      font-size: 0.9rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &:hover {
      background: var(--color-accent-hover);
      border-color: var(--color-text-accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      h4 {
        color: var(--color-header);
      }
    }
  }

  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .guide-container {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .guide-container {
      padding: 0 0.5rem;
    }

    .guide-article {
      padding-bottom: 2rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .meta {
      font-size: 0.85rem;
      gap: 1rem;
    }

    .summary {
      font-size: 1rem;
      padding: 0.75rem;
    }

    .tabs-container {
      gap: 0.25rem;
    }

    .scroll-btn {
      padding: 0.5rem;
      font-size: 1.25rem;
      margin-top: 0.25rem;
    }

    .chapter-tabs {
      gap: 0.125rem;
      padding: 0.25rem 0 0 0;
    }

    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .section-content {
      padding: 1.25rem;
      min-height: 300px;
    }

    .guide-section h2 {
      font-size: 1.5rem;
    }

    .subsection h3 {
      font-size: 1.25rem;
    }

    .content {
      font-size: 1rem;
    }

    .related-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
