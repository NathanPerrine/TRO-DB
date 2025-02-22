<script lang="ts">
  import { Construction } from 'lucide-svelte/icons';
  import { page } from '$app/stores';

  // Get route name from current URL path
  let path = $derived(
    $page.url.pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') ?? 'Page'
  );
</script>

<div class="coming-soon-container">
  <div class="content">
    <h1>{path}</h1>
    <span class="icon"><Construction size={48} /></span>
    <p class="quote">This area is currently being explored by our cartographers...</p>
    <p>Check back soon for updates as we document more items in The Realm!</p>
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .coming-soon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }

  .content {
    text-align: center;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 3rem;
    border-radius: 4px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    .icon {
      color: var(--color-text-accent);
      margin-bottom: 1rem;
    }

    h1 {
      color: var(--color-header);
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-family: 'Garamond', serif;
    }

    .quote {
      font-family: 'Cinzel', serif;
      color: var(--color-text);
      font-style: italic;
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
    }

    p {
      color: var(--color-text);
      margin: 0;
    }
  }
</style>