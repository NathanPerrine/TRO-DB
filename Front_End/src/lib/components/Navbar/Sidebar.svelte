<script lang="ts">
  import { sidebarItems } from './sidebar-items';
  import SidebarFolder from './SidebarFolder.svelte';
  import SidebarLink from './SidebarLink.svelte';

  $: isMobileMenuOpen = false;
</script>

<nav class="sidebar">
  <h2>Resources</h2>
  <ul>
    {#each sidebarItems as item}
      <li>
        {#if !item.subItems}
          <SidebarLink {item} />
        {:else}
          <SidebarFolder {item} />
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<div class="mobile-menu">
  <div class="mobile-menu-bar">
    <h2>Resources</h2>
    <button class="mobile-menu-toggle" on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
      {#if isMobileMenuOpen}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
          ><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
          ></line></svg
        >
      {:else}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu"
          ><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"
          ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
        >
      {/if}
    </button>
  </div>
  {#if isMobileMenuOpen}
    <div class="mobile-menu-content">
      <ul>
        {#each sidebarItems as item}
          <li>
            {#if !item.subItems}
              <SidebarLink {item} />
            {:else}
              <SidebarFolder {item} />
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .sidebar {
    background: linear-gradient(to left, $color-accent 5%, $color-background 13%);
    padding: 20px;
    width: 225px;
    min-width: 225px;
    max-width: 225px;
    border-right: 2px solid $color-divider;
    box-sizing: border-box;
    overflow-y: auto;

    h2 {
      color: $color-header;
      margin-top: 0;
      margin-bottom: 15px;
      font-weight: bold;
      border: none;
      border-image: none;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 10px;
    }

    @include mobile {
      display: none;
    }
  }

  .mobile-menu {
    display: none;
    width: 100vw;

    @include mobile {
      display: block;
    }

    .mobile-menu-bar {
      background-color: $color-accent;
      color: $color-background;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin: 0;
      }

      .mobile-menu-toggle {
        background: none;
        border: none;
        cursor: pointer;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .mobile-menu-content {
      background-color: $color-background;
      padding: 20px;
      border-bottom: 2px solid $color-divider;

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
