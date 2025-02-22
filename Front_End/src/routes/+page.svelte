<script lang="ts">
  import { BookText, Earth, ScrollText, ShieldHalf } from 'lucide-svelte/icons';

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

    <!-- About Section -->
    <div class="about-section">
      <h2>About The Realm Online</h2>
      <p>
        The Realm Online (TRO) is a classic MMORPG first released in 1996 by Sierra On-Line. As one of the earliest graphical online RPGs, it blends medieval fantasy with round-based combat and a strong emphasis on social interaction. With its rich lore, deep role-playing elements, and dedicated community, TRO remains a nostalgic favorite while continuing to attract new adventurers.
      </p>
      <p>
        Whether you're a veteran player or just beginning your journey, this wiki serves as your ultimate resource for game information, strategies, and community knowledge. Join our community to share your adventures, contribute knowledge, and keep the legacy of TRO alive!
      </p>
      <p>
        Explore the database, learn from veteran players, and enhance your Realm Online experience
        today!
      </p>
      <p>
        Want to contribute? Reach out via email at [email] or join our discussions on [Discord].
      </p>
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

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-hover);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      min-height: 48px;

      .icon {
        font-size: 1.5rem;
      }

      h2 {
        color: var(--color-header);
        font-size: 1.25rem;
        margin: 0;
        border: none;
        white-space: normal;
        word-break: break-word;
      }
    }

    p {
      color: var(--color-text);
      min-height: 60px;
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
