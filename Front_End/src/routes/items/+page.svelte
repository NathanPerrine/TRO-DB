<script lang="ts">
  import { BookOpen, Sword, FlaskConical, Trash2, Key } from 'lucide-svelte/icons';

  const itemCategories = [
    {
      title: "Books",
      description: "Learn new skills and spells through various tomes and scrolls. Includes skillbooks for combat and crafting, as well as magical spellbooks.",
      href: "/items/books",
      icon: BookOpen
    },
    {
      title: "Equipment",
      description: "Find weapons, armor, and accessories to outfit your character. Browse a wide range of combat and defensive gear.",
      href: "/items/equipment",
      icon: Sword
    },
    {
      title: "Consumables",
      description: "Single-use items including potions, scrolls, wands, orbs, and baubles. Restore health, cast spells, or gain temporary effects.",
      href: "/items/consumables",
      icon: FlaskConical
    },
    {
      title: "Junk",
      description: "Miscellaneous items that can be sold to vendors. Some may be more valuable than they appear.",
      href: "/items/junk",
      icon: Trash2
    },
    {
      title: "Dungeon Items",
      description: "Special items found in dungeons including keys, quest items, and unique treasures.",
      href: "/items/dungeon-items",
      icon: Key
    }
  ];
</script>

<div class="items-container">
  <header class="page-header">
    <h1>Items Database</h1>
    <p>Browse the complete collection of items found throughout The Realm.</p>
  </header>

  <div class="items-grid">
    {#each itemCategories as category}
      <a href={category.href} class="item-card">
        <div class="card-header">
          <span class="icon"><category.icon size={24} /></span>
          <h2>{category.title}</h2>
        </div>
        <p>{category.description}</p>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .items-container {
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

  .items-grid {
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

  .item-card {
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