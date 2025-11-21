<script lang="ts">
  import { Shield, Sword, Ribbon } from 'lucide-svelte/icons';

  const equipmentTypes = [
    {
      title: "Armor",
      description: "From light cloth to heavy plate, find protective gear for any character build. Browse helmets, chest pieces, boots, and more.",
      href: "/items/equipment/armor",
      icon: Shield
    },
    {
      title: "Weapons",
      description: "Discover an arsenal of weapons from claws to clubs. Find the perfect tool for dealing damage.",
      href: "/items/equipment/weapons",
      icon: Sword
    },
    {
      title: "Accessories",
      description: "Enhance your character with magical rings, amulets, backpacks and belts that provide powerful bonuses and unique effects.",
      href: "/items/equipment/accessories",
      icon: Ribbon
    }
  ];
</script>

<main>
  <div class="equipment-container">
    <header class="page-header">
      <h1>Equipment Database</h1>
      <p>Browse The Realm's vast collection of gear to outfit your character for any adventure.</p>
    </header>

    <div class="equipment-grid">
      {#each equipmentTypes as equipment}
      <a href={equipment.href} class="equipment-card">
        <div class="card-header">
          <span class="icon"><equipment.icon size={24} /></span>
          <h2>{equipment.title}</h2>
        </div>
        <p>{equipment.description}</p>
      </a>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .equipment-container {
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

  .equipment-grid {
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

  .equipment-card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 4px;
    transition: transform 0.2s ease, background-color 0.2s ease;
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