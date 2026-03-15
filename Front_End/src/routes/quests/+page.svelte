<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import { Scroll, ScrollText, Shield, User, ArrowRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchQuery = $state('');
  let minLevel = $state<number | null>(null);
  let maxLevel = $state<number | null>(null);

  // Derive the actual range from data for the placeholder hints
  let levelBounds = $derived(() => {
    const levels = data.quests
      .map((q) => q.recommendedLevel)
      .filter((l): l is number => l != null);
    if (levels.length === 0) return { min: 0, max: 0 };
    return { min: Math.min(...levels), max: Math.max(...levels) };
  });

  let filteredQuests = $derived(
    data.quests.filter((quest) => {
      // Text search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !quest.title.toLowerCase().includes(q) &&
          !quest.summary.toLowerCase().includes(q) &&
          !quest.author.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      // Level filter
      const lvl = quest.recommendedLevel;
      if (minLevel != null && (lvl == null || lvl < minLevel)) return false;
      if (maxLevel != null && (lvl == null || lvl > maxLevel)) return false;

      return true;
    })
  );

  let hasActiveFilters = $derived(searchQuery || minLevel != null || maxLevel != null);

  function clearFilters() {
    searchQuery = '';
    minLevel = null;
    maxLevel = null;
  }

  // Assign a decorative accent color based on level range
  function getQuestTier(level: number|null|undefined) {
    if (!level) return 'var(--color-rarity-white)';
    if (level < 50) return 'var(--color-rarity-green)';
    if (level < 200) return 'var(--color-rarity-blue)';
    if (level < 500) return 'var(--color-rarity-purple)';
    return 'var(--color-rarity-orange)';
  }
</script>

<main>
  <div class="quest-board">
    <div class="board-header">
      <div class="board-title">
        <span class="icon-left"><Scroll size={32} /></span>
        <h1>Quest Board</h1>
        <span class="icon-right"><ScrollText size={32} /></span>
      </div>
      <p class="board-subtitle">Step-by-step walkthroughs for quests across The Realm</p>
    </div>

    <div class="board-controls">
      <input
        type="text"
        class="quest-search"
        placeholder="Search quests..."
        bind:value={searchQuery}
      />
      <div class="level-filter">
        <Shield size={14} />
        <input
          type="number"
          class="level-input"
          placeholder={String(levelBounds().min || 1)}
          bind:value={minLevel}
          min="0"
        />
        <span class="level-sep">&ndash;</span>
        <input
          type="number"
          class="level-input"
          placeholder={String(levelBounds().max || 999)}
          bind:value={maxLevel}
          min="0"
        />
      </div>
      <div class="controls-right">
        {#if hasActiveFilters}
          <button class="clear-btn" onclick={clearFilters}>Clear</button>
        {/if}
        <span class="quest-count"
          >{filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''}</span
        >
      </div>
    </div>

    <div class="quest-grid">
      {#each filteredQuests as quest}
        <a
          href="/quests/{quest.slug.current}"
          class="quest-card"
          style="--tier-color: {getQuestTier(quest.recommendedLevel)}"
        >
          <div class="card-accent"></div>
          <div class="card-body">
            <h2>{quest.title}</h2>
            <p class="card-summary">{quest.summary}</p>

            <div class="card-meta">
              {#if quest.recommendedLevel}
                <span class="meta-badge level">
                  <Shield size={13} />
                  Lv. {quest.recommendedLevel}+
                </span>
              {/if}
              <span class="meta-badge author">
                <User size={13} />
                {quest.author}
              </span>
            </div>

            <div class="card-footer">
              <span class="date">{formatDate(quest._updatedAt)}</span>
              <span class="read-more">
                Read <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </a>
      {:else}
        <div class="empty-board">
          <ScrollText size={48} />
          <p>No quests match your search.</p>
        </div>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  a {
    text-decoration: none;
    border-bottom: none;
  }

  .quest-board {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem 2rem 3rem;
  }

  .board-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--color-border);
  }

  .board-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--color-header);
    margin-bottom: 0.5rem;

    h1 {
      font-size: 2.5rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 0;
    }

    .icon-right {
      transform: rotateY(180deg);
    }
  }

  .board-subtitle {
    color: var(--color-inactive);
    font-style: italic;
    font-size: 1.1rem;
  }

  .board-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .quest-search {
    flex: 1;
    max-width: 400px;
    padding: 0.6rem 1rem;
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    color: var(--color-text);
    font-size: 0.95rem;

    &::placeholder {
      color: var(--color-inactive);
    }

    &:focus {
      outline: none;
      border-color: var(--color-text-accent);
    }
  }

  .level-filter {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-inactive);
    flex-shrink: 0;
  }

  .level-input {
    width: 56px;
    padding: 0.6rem 0.5rem;
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    color: var(--color-text);
    font-size: 0.9rem;
    text-align: center;
    -moz-appearance: textfield;

    &::placeholder {
      color: var(--color-inactive);
    }

    &:focus {
      outline: none;
      border-color: var(--color-text-accent);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .level-sep {
    color: var(--color-inactive);
    font-size: 0.9rem;
  }

  .controls-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
  }

  .clear-btn {
    padding: 0.4rem 0.75rem;
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    color: var(--color-inactive);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      border-color: var(--color-text-accent);
      color: var(--color-text-accent);
    }
  }

  .quest-count {
    color: var(--color-inactive);
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .quest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
    padding: 0 2rem 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .quest-card {
    position: relative;
    display: flex;
    background: var(--color-accent);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.25s ease;
    min-height: 180px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      border-color: var(--tier-color);

      .card-accent {
        width: 6px;
      }

      .read-more {
        color: var(--tier-color);
        transform: translateX(3px);
      }

      h2 {
        color: var(--color-header);
      }
    }
  }

  .card-accent {
    width: 4px;
    flex-shrink: 0;
    background: var(--tier-color);
    transition: width 0.25s ease;
  }

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    min-width: 0;
  }

  h2 {
    font-size: 1.2rem;
    color: var(--color-text-accent);
    margin-bottom: 0.5rem;
    transition: color 0.2s ease;
    border: none;
  }

  .card-summary {
    color: var(--color-text);
    font-size: 0.9rem;
    line-height: 1.5;
    flex: 1;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.75rem;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .meta-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.25);

    &.level {
      color: var(--tier-color);
    }

    &.author {
      color: var(--color-inactive);
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    border-top: 1px solid var(--color-divider);
    font-size: 0.8rem;
  }

  .date {
    color: var(--color-inactive);
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--color-inactive);
    transition: all 0.2s ease;
  }

  .empty-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    color: var(--color-inactive);
    text-align: center;
  }

  @include mobile {
    .quest-board {
      padding: 0.5rem 1rem 2rem;
    }

    .board-title {
      h1 {
        font-size: 1.8rem;
      }
    }

    .board-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .quest-search {
      max-width: none;
    }

    .level-filter {
      justify-content: center;
    }

    .controls-right {
      justify-content: center;
      margin-left: 0;
    }

    .quest-grid {
      grid-template-columns: 1fr;
      padding: 0 1rem 2rem;
    }
  }
</style>
