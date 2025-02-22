<script lang="ts">
  import { Swords, Home, Mountain } from 'lucide-svelte/icons';

  const areaTypes = [
    {
      title: 'Dungeons',
      description:
        "Dangerous lairs filled with monsters and treasures. From the beginner-friendly Lesser Hive to the legendary Fuloran's Abode.",
      href: '/areas/dungeons',
      icon: Swords
    },
    {
      title: 'Towns',
      description:
        'Safe havens where adventurers can rest, trade, and take on new quests. Visit merchants, healers, and quest-givers.',
      href: '/areas/towns',
      icon: Home
    },
    {
      title: 'Zones',
      description:
        'Vast outdoor regions ranging from the Havenwoods to the Killing Fields. Perfect for exploration and hunting.',
      href: '/areas/zones',
      icon: Mountain
    }
  ];
</script>

<div class="areas-container">
  <header class="page-header">
    <h1>Areas of the Realm</h1>
    <p>
      The world of The Realm is vast and varied, offering countless locations to explore.
    </p>
  </header>

  <div class="area-grid">
    {#each areaTypes as area}
      <a href={area.href} class="area-card">
        <div class="card-header">
          <span class="icon"><area.icon size={24} /></span>
          <h2>{area.title}</h2>
        </div>
        <p>{area.description}</p>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .areas-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .page-header {
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
      margin: 0 auto;
      color: var(--color-text);
    }
  }

  .area-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;

    @include tablet-and-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .area-card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 4px;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-hover);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .icon {
        color: var(--color-text-accent);
      }

      h2 {
        color: var(--color-header);
        font-size: 1.25rem;
        margin: 0;
        border: none;
      }
    }

    p {
      color: var(--color-text);
    }
  }
</style>
