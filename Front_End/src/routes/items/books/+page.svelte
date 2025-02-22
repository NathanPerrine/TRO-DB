<script lang="ts">
  import { BookText, BookOpenText } from 'lucide-svelte/icons';

  const bookTypes = [
    {
      title: "Skillbooks",
      description: "Learn and improve various combat and crafting abilities. Master new weapon skills, crafting techniques, and adventuring talents.",
      href: "/items/books/skillbooks",
      icon: BookText
    },
    {
      title: "Spellbooks",
      description: "Unlock magical abilities from different schools of magic. Each spellbook contains the knowledge to cast new spells.",
      href: "/items/books/spellbooks",
      icon: BookOpenText
    }
  ];
</script>

<div class="books-container">
  <header class="page-header">
    <h1>Books</h1>
    <p>Discover tomes of knowledge that teach new skills and spells.</p>
  </header>

  <div class="books-grid">
    {#each bookTypes as bookType}
      <a href={bookType.href} class="book-card">
        <div class="card-header">
          <span class="icon"><bookType.icon size={24} /></span>
          <h2>{bookType.title}</h2>
        </div>
        <p>{bookType.description}</p>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .books-container {
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

  .books-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .book-card {
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