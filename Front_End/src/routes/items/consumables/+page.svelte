<script lang="ts">
  import { Gem, Globe, FlaskConical, ScrollText, Wand } from 'lucide-svelte/icons';

  const consumableTypes = [
    {
      title: 'Baubles',
      description:
        'Small mystical trinkets that provide temporary benefits when consumed. Often enchanted with various magical effects.',
      href: '/items/consumables/baubles',
      icon: Gem
    },
    {
      title: 'Orbs',
      description:
        'Magical spheres that store copies of a single spell, allowing multiple uses before depletion. Rechargeable but shatter when fully drained.',
      href: '/items/consumables/orbs',
      icon: Globe
    },
    {
      title: 'Potions',
      description:
        'Alchemical brews offering powerful effects—healing, shielding, or more. Some, however, may carry dangerous effects instead.',
      href: '/items/consumables/potions',
      icon: FlaskConical
    },
    {
      title: 'Scrolls',
      description:
        'Single-use magical parchments that allow anyone to cast their inscribed spell once.',
      href: '/items/consumables/scrolls',
      icon: ScrollText
    },
    {
      title: 'Wands',
      description:
        'Magical implements that store a specific spell, allowing multiple casts before breaking.',
      href: '/items/consumables/wands',
      icon: Wand
    }
  ];
</script>

<div class="consumables-container">
  <header class="page-header">
    <h1>Consumables</h1>
    <p>Single-use magical items that provide various effects when used.</p>
  </header>

  <div class="consumables-grid">
    {#each consumableTypes as consumable}
      <a href={consumable.href} class="consumable-card">
        <div class="card-header">
          <span class="icon"><consumable.icon size={24} /></span>
          <h2>{consumable.title}</h2>
        </div>
        <p>{consumable.description}</p>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .consumables-container {
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
      max-width: 42rem;
      margin: 0 auto;
      color: var(--color-text);
    }
  }

  .consumables-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;

    @include tablet-and-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .consumable-card {
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
