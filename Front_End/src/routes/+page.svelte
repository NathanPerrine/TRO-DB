<script lang="ts">
  import { BookText, Earth, ScrollText, ShieldHalf } from 'lucide-svelte/icons';
  import { formatDate } from '$lib/utils/formatDate';
  import { buildItemUrl } from '$lib/utils/buildItemUrl';

  let { data } = $props();

  function formatTypeName(type: string): string {
    const names: Record<string, string> = {
      mob: 'Mob',
      spell: 'Spell',
      equipment: 'Equipment',
      accessory: 'Accessory',
      area: 'Area',
      book: 'Book',
      item: 'Item',
      guide: 'Guide'
    };
    return names[type] || type;
  }

  const featuredSections = [
    {
      title: 'Character Builder',
      description:
        "Plan your character's development with our comprehensive character building tool. Experiment with different races, classes, and skill combinations.",
      icon: ScrollText,
      href: '/characterbuilder'
    },
    {
      title: 'Equipment Database',
      description:
        'Browse through weapons, armor, and accessories. Find the perfect gear for your adventures.',
      icon: ShieldHalf,
      href: '/items/equipment'
    },
    {
      title: 'Magic Grimoire',
      description:
        'Master the arcane arts with our detailed spell guides covering all schools of magic.',
      icon: BookText,
      href: '/magic'
    },
    {
      title: 'World Atlas',
      description:
        'Explore the various regions, dungeons, and towns across the realm. Find the best hunting spots and quest locations.',
      icon: Earth,
      href: '/areas'
    }
  ];

  const quickLinks = [
    {
      title: 'Monster Database',
      description: 'Find information about creatures, their drops, and hunting locations.',
      href: '/mobs'
    },
    {
      title: 'Quest Guides',
      description: 'Step-by-step walkthroughs for all your adventure needs.',
      href: '/quests'
    },
    {
      title: 'Item Encyclopedia',
      description: 'Browse consumables, crafting materials, and other useful items.',
      href: '/items'
    },
    {
      title: 'Game Guides',
      description: 'Comprehensive guides covering various game mechanics and tips.',
      href: '/guides'
    },
    {
      title: 'NPC Directory',
      description: 'Find information about NPCs, their locations, and services.',
      href: '/npcs'
    },
    {
      title: 'Shop Listings',
      description: 'A catalog of shops and their available wares.',
      href: '/shops'
    }
  ];
</script>

<main>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>Welcome to The Realm Online Database</h1>
      <p>
        Your comprehensive guide to The Realm Online - an epic MMO where magic, monsters, and
        adventure await around every corner.
      </p>
    </div>

    <!-- Featured Sections Grid -->
    <div class="featured-grid">
      {#each featuredSections as section}
        <a href={section.href} class="featured-card">
          <div class="card-header">
            <span class="icon"><section.icon size={48} /></span>
            <h2>{section.title}</h2>
          </div>
          <p>{section.description}</p>
        </a>
      {/each}
    </div>

    <!-- News & Updates -->
    <div class="news-grid">
      <div class="news-section">
        <h2>News</h2>
        <div class="news-items">
          {#each data.recentNews as news}
            <a href="/news/{news.slug.current}" class="recent-item">
              <span class="item-primary">{news.title}</span>
              <span class="item-secondary">{news.category} - {formatDate(news.publishedAt)} - {news.author}</span>
            </a>
          {/each}
        </div>
      </div>

      <div class="whats-new-section">
        <h2>What's New</h2>
        <ul class="recent-items">
          {#each data.recentItems as item}
            <li>
              <a href={buildItemUrl(item)} class="recent-item">
                <span class="item-primary">
                  <span class="item-type">{formatTypeName(item._type)}</span> - {item.displayName}
                </span>
                <span class="item-secondary">Updated on {formatDate(item._updatedAt)}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
      <h2>About The Realm Online</h2>
      <p>
        The Realm Online (TRO) is a classic MMORPG first released in 1996 by Sierra On-Line. As one
        of the earliest graphical online RPGs, it blends medieval fantasy with round-based combat
        and a strong emphasis on social interaction. With its rich lore, deep role-playing elements,
        and dedicated community, TRO remains a nostalgic favorite while continuing to attract new
        adventurers.
      </p>
      <p>
        Whether you're a veteran player or just beginning your journey, this wiki serves as your
        ultimate resource for game information, strategies, and community knowledge. Join our
        community to share your adventures, contribute knowledge, and keep the legacy of TRO alive!
      </p>
      <p>
        Explore the database, learn from veteran players, and enhance your Realm Online experience
        today!
      </p>
      <p>Want to contribute? Mail Soa in game via magic mail with any suggestions or requests.</p>
    </div>

    <!-- Quick Links -->
    <div class="quick-links">
      {#each quickLinks as link}
        <a href={link.href} class="quick-link-card">
          <h3>{link.title}</h3>
          <p>{link.description}</p>
        </a>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .home-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--color-header);
      font-family: 'Garamond', serif;
    }

    p {
      font-size: 1.25rem;
      max-width: 42rem;
      margin: 0 auto;
      color: var(--color-text);
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
    width: 100%;

    @include tablet-and-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .featured-card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
    text-decoration: none;
    min-height: 180px;
    text-align: center;

    @include mobile {
      text-align: left;
    }

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-hover);
    }

    .card-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;

      @include mobile {
        flex-direction: row;
        gap: 0.5rem;
      }

      .icon {
        font-size: 1.5rem;
      }

      h2 {
        color: var(--color-header);
        font-size: 1.25rem;
        margin: 0;
        border: none;
        white-space: normal;
      }
    }

    p {
      color: var(--color-text);
      min-height: 60px;
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .news-section,
  .whats-new-section {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 8px;

    h2 {
      color: var(--color-header);
      margin-bottom: 1rem;
      font-size: 1.5rem;
      border: none;
    }
  }

  .news-section,
  .whats-new-section {
    .recent-items,
    .news-items {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .recent-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem 0.5rem;
      text-decoration: none;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--color-hover);
      }
    }

    .item-primary {
      color: var(--color-text);
    }

    .item-type {
      color: var(--color-text-accent);
      font-weight: 600;
    }

    .item-secondary {
      font-size: 0.85rem;
      color: var(--color-inactive);
    }
  }

  .about-section {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;

    h2 {
      color: var(--color-header);
      margin-bottom: 1rem;
      font-size: 1.5rem;
      border: none;
    }

    p {
      margin-bottom: 1rem;
      color: var(--color-text);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .quick-link-card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-hover);
    }

    h3 {
      color: var(--color-header);
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      border: none;
    }

    p {
      color: var(--color-text);
      font-size: 0.9rem;
    }
  }
</style>
