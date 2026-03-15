<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import { PortableText } from '@portabletext/svelte';
  import { portableTextComponents } from '$lib/components/PortableText';
  import { Link, MapPin, Shield, Gift, Lightbulb, ChevronRight } from 'lucide-svelte';
  import type { WalkthroughStep, WalkthroughSubstep } from '$lib/schemas/quest.server';
  import type { PageData } from './$types';

  let { data } = $props();

  let walkthroughSteps = $derived(
    (data.walkthrough as any[]).filter(
      (block): block is WalkthroughStep => block._type === 'walkthroughStep'
    )
  );

  function copyAnchorLink(slug: string) {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    navigator.clipboard.writeText(url);
  }

  function getAreaUrl(area: { slug: { current: string }; areaType?: string | null }) {
    return area.areaType ? `/areas/${area.areaType}/${area.slug.current}` : '#';
  }

  function getStartingLocationUrl(loc: {
    _type: string;
    slug: { current: string };
    areaType?: string | null;
  }) {
    if (loc._type === 'area' && loc.areaType) return `/areas/${loc.areaType}/${loc.slug.current}`;
    return '#';
  }

  let hasRequirements = $derived(
    data.requirements &&
      ((data.requirements.requiredQuests?.length ?? 0) > 0 ||
        (data.requirements.requiredItems?.length ?? 0) > 0 ||
        data.requirements.other)
  );
</script>

<main class="quest-detail">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="info-card">
      <h2 class="card-title">{data.title}</h2>

      <dl class="stat-list">
        {#if data.recommendedLevel}
          <div class="stat-row">
            <dt><Shield size={14} /> Level</dt>
            <dd>{data.recommendedLevel}+</dd>
          </div>
        {/if}

        {#if data.questGiver}
          <div class="stat-row">
            <dt>Quest Giver</dt>
            <dd><a href="/npcs/{data.questGiver.slug.current}">{data.questGiver.name}</a></dd>
          </div>
        {/if}

        {#if data.startingArea.length > 0}
          <div class="stat-row">
            <dt><MapPin size={14} /> Location</dt>
            <div class="starting-area-locations">
              {#each data.startingArea as loc, i}
                <dd>
                  {#if loc._type == 'area'}
                    <a href="/areas/{loc.areaType}/{loc.slug.current}">{loc.name}</a>
                  {:else if loc._type == 'shop'}
                    <a href="/shops/{loc.slug.current}">{loc.name}</a>
                  {/if}
                </dd>
              {/each}
            </div>
          </div>
        {/if}

        <div class="stat-row">
          <dt>Author</dt>
          <dd>{data.author}</dd>
        </div>

        <div class="stat-row">
          <dt>Updated</dt>
          <dd>{formatDate(data._updatedAt)}</dd>
        </div>
      </dl>
    </div>

    <!-- Requirements card -->
    {#if hasRequirements}
      <div class="info-card requirements-card">
        <h3>Requirements</h3>
        {#if data.requirements?.requiredQuests && data.requirements.requiredQuests.length > 0}
          <div class="req-section">
            <h4>Quests</h4>
            <ul>
              {#each data.requirements.requiredQuests as quest}
                <li><a href="/quests/{quest.slug.current}">{quest.title}</a></li>
              {/each}
            </ul>
          </div>
        {/if}
        {#if data.requirements?.requiredItems && data.requirements.requiredItems.length > 0}
          <div class="req-section">
            <h4>Items</h4>
            <ul>
              {#each data.requirements.requiredItems as item}
                <li>{item.name}</li>
              {/each}
            </ul>
          </div>
        {/if}
        {#if data.requirements?.other}
          <div class="req-section">
            <h4>Other</h4>
            <p>{data.requirements.other}</p>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Steps TOC -->
    {#if walkthroughSteps.length > 0}
      <nav class="info-card step-toc">
        <h3>Steps</h3>
        <ol>
          {#each walkthroughSteps as step}
            <li>
              <a href="#{step.stepSlug.current}">{step.stepTitle}</a>
              {#if step.substeps && step.substeps.length > 0}
                <ol class="substep-list">
                  {#each step.substeps as substep}
                    <li>
                      <a href="#{substep.substepSlug.current}">{substep.substepTitle}</a>
                    </li>
                  {/each}
                </ol>
              {/if}
            </li>
          {/each}
          <li><a href="#rewards">Rewards</a></li>
          <li><a href="#tips">Tips & Notes</a></li>
        </ol>
      </nav>
    {/if}

    <!-- Related areas -->
    {#if data.relatedAreas.length > 0}
      <div class="info-card">
        <h3>Related Areas</h3>
        <ul class="area-list">
          {#each data.relatedAreas as area}
            <li>
              <a href={getAreaUrl(area)}>
                <MapPin size={13} />
                {area.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </aside>

  <!-- Main content -->
  <div class="main-content">
    <p class="summary">{data.summary}</p>

    <!-- Introduction -->
    {#if data.introduction.length > 0}
      <section class="section">
        <h2>Introduction</h2>
        <div class="content">
          <PortableText value={data.introduction} components={portableTextComponents} />
        </div>
      </section>
    {/if}

    <!-- Walkthrough -->
    {#if data.walkthrough.length > 0}
      <section class="section">
        <h2>Walkthrough</h2>

        <div class="content">
          {#each data.walkthrough as block}
            {#if block._type === 'walkthroughStep'}
              <div class="step-section" id={block.stepSlug.current}>
                <div class="step-header">
                  <h3>{block.stepTitle}</h3>
                  <button
                    class="anchor-btn"
                    onclick={() => copyAnchorLink(block.stepSlug.current)}
                    title="Copy link"
                  >
                    <Link size={14} />
                  </button>
                </div>
                {#if block.content && block.content.length > 0}
                  <PortableText value={block.content} components={portableTextComponents} />
                {/if}

                {#if block.substeps && block.substeps.length > 0}
                  {#each block.substeps as substep}
                    <div class="substep-section" id={substep.substepSlug.current}>
                      <div class="substep-header">
                        <h4>{substep.substepTitle}</h4>
                        <button
                          class="anchor-btn"
                          onclick={() => copyAnchorLink(substep.substepSlug.current)}
                          title="Copy link"
                        >
                          <Link size={12} />
                        </button>
                      </div>
                      <PortableText value={substep.content} components={portableTextComponents} />
                    </div>
                  {/each}
                {/if}
              </div>
            {:else}
              <PortableText value={[block]} components={portableTextComponents} />
            {/if}
          {/each}
        </div>
      </section>
    {/if}

    <!-- Rewards -->
    {#if data.rewards.length > 0}
      <section class="section rewards" id="rewards">
        <h2><Gift size={20} /> Rewards</h2>
        <div class="content accent-box orange">
          <PortableText value={data.rewards} components={portableTextComponents} />
        </div>
      </section>
    {/if}

    <!-- Tips -->
    {#if data.tipsAndNotes.length > 0}
      <section class="section" id="tips">
        <h2><Lightbulb size={20} /> Tips & Notes</h2>
        <div class="content accent-box green">
          <PortableText value={data.tipsAndNotes} components={portableTextComponents} />
        </div>
      </section>
    {/if}

    <!-- Related quests -->
    {#if data.relatedQuests.length > 0}
      <section class="section">
        <h2>Related Quests</h2>
        <div class="related-list">
          {#each data.relatedQuests as quest}
            <a href="/quests/{quest.slug.current}" class="related-link">
              <div class="related-info">
                <strong>{quest.title}</strong>
                {#if quest.summary}
                  <span class="related-summary">{quest.summary}</span>
                {/if}
              </div>
              <ChevronRight size={16} />
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .quest-detail {
    display: flex;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem 3rem;
    overflow-y: visible;
  }

  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 0 0 280px;
    position: sticky;
    top: 2rem;
    align-self: flex-start;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .info-card {
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.25rem;

    .card-title {
      font-size: 1.3rem;
      color: var(--color-header);
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--color-text-accent);
      text-align: center;
    }

    h3 {
      font-size: 1rem;
      color: var(--color-text-accent);
      margin-bottom: 0.75rem;
      border: none;
    }
  }

  .stat-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-divider);
    font-size: 0.9rem;

    &:last-child {
      border-bottom: none;
    }

    dt {
      color: var(--color-inactive);
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    dd {
      color: var(--color-text);
      text-align: right;
      font-weight: 500;

      a {
        color: var(--color-text-accent);
        &:hover {
          color: var(--color-header);
        }
      }
    }

    .starting-area-locations {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .requirements-card {
    h4 {
      font-size: 0.85rem;
      color: var(--color-inactive);
      margin-bottom: 0.25rem;
    }

    .req-section {
      margin-bottom: 0.75rem;
      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      font-size: 0.88rem;
      padding: 0.2rem 0;
      color: var(--color-text);

      &::before {
        content: '\25C6';
        color: var(--color-text-accent);
        margin-right: 0.4rem;
        font-size: 0.7rem;
      }

      a {
        color: var(--color-text-accent);
        &:hover {
          color: var(--color-header);
        }
      }
    }

    p {
      font-size: 0.88rem;
      color: var(--color-text);
    }
  }

  .area-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.25rem 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      color: var(--color-text);
      font-size: 0.9rem;
      text-decoration: none;
      &:hover {
        color: var(--color-text-accent);
      }
    }
  }

  /* Main content */
  .main-content {
    flex: 1;
    min-width: 0;
  }

  .summary {
    font-style: italic;
    font-size: 1.1rem;
    color: var(--color-text);
    padding: 1rem;
    background: rgba(0, 0, 0, 0.15);
    border-left: 3px solid var(--color-text-accent);
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .section {
    margin-bottom: 2.5rem;

    h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      color: var(--color-header);
      margin-bottom: 1rem;
      padding-bottom: 0.4rem;
      border-bottom: 2px solid var(--color-text-accent);
    }
  }

  .content {
    line-height: 1.7;
    font-size: 1.05rem;
    color: var(--color-text);
  }

  .content :global(p) {
    margin-bottom: 1rem;
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

  .accent-box {
    padding: 1.25rem;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
    border-radius: 4px;

    &.orange {
      border-left: 3px solid var(--color-rarity-orange);
    }
    &.green {
      border-left: 3px solid var(--color-rarity-green);
    }
  }

  /* Step TOC (in sidebar) */
  .step-toc {
    ol {
      margin: 0;
      padding-left: 1.25rem;
    }

    li {
      padding: 0.2rem 0;
    }

    a {
      color: var(--color-text);
      text-decoration: none;
      font-size: 0.88rem;
      &:hover {
        color: var(--color-text-accent);
      }
    }

    .substep-list {
      margin: 0.15rem 0 0;
      padding-left: 1rem;
      list-style-type: lower-alpha;

      li {
        padding: 0.1rem 0;
      }

      a {
        font-size: 0.82rem;
        &:hover {
          color: var(--color-text-accent);
        }
      }
    }
  }

  /* Walkthrough steps */
  .step-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-divider);

    &:first-child {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;

    h3 {
      font-size: 1.25rem;
      color: var(--color-text-accent);
      border: none;
      margin: 0;
    }
  }

  .anchor-btn {
    background: none;
    border: none;
    color: var(--color-inactive);
    cursor: pointer;
    padding: 0.2rem;
    display: inline-flex;
    &:hover {
      color: var(--color-text-accent);
    }
  }

  /* Substeps */
  .substep-section {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px dashed var(--color-divider);
  }

  .substep-header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.5rem;

    h4 {
      font-size: 1.1rem;
      color: var(--color-text-accent);
      margin: 0;
      border: none;
    }
  }

  /* Related */
  .related-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .related-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--color-inactive);
    transition: all 0.2s ease;

    .related-info {
      flex: 1;
      min-width: 0;
    }

    strong {
      color: var(--color-text-accent);
      display: block;
    }

    .related-summary {
      font-size: 0.85rem;
      color: var(--color-inactive);
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &:hover {
      background: var(--color-accent-hover);
      border-color: var(--color-text-accent);
      color: var(--color-header);

      strong {
        color: var(--color-header);
      }
    }
  }

  @include tablet-and-up {
    .quest-detail {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
    }
  }

  @include mobile {
    .quest-detail {
      padding: 0.5rem 0.75rem 2rem;
    }

    .section h2 {
      font-size: 1.3rem;
    }

    .content {
      font-size: 1rem;
    }
  }
</style>
