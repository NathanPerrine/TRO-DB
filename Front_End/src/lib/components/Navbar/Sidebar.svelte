<script lang="ts">
  import SidebarHeader from './SidebarHeader.svelte';
  import SidebarList from './SidebarList.svelte';
  import SidebarMenuIcon from './SidebarMenuIcon.svelte';
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let isMobileMenuOpen = false;

  const closeMenu = () => {
    isMobileMenuOpen = false;
  };
</script>

<nav class="sidebar">
  <SidebarHeader />
  <SidebarList onNavigate={closeMenu} />
</nav>

<nav class="mobile-menu">
  <div class="mobile-menu-bar">
    <SidebarHeader />
    <button class="mobile-menu-toggle" on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
      <SidebarMenuIcon isOpen={isMobileMenuOpen} />
    </button>
  </div>

  {#if isMobileMenuOpen}
    <button
      class="mobile-menu-overlay"
      aria-label="close menu"
      on:click={closeMenu}
      transition:fade={{ duration: 200 }}
    ></button>
    <div
      class="mobile-menu-content"
      transition:slide={{
        duration: 300,
        easing: quintOut,
        axis: 'x'
      }}
    >
      <SidebarList onNavigate={closeMenu} />
    </div>
  {/if}
</nav>

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

    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 30;
      border: none;
      padding: 0;
      cursor: pointer;

      &:active {
        transform: scale(1);
      }
    }

    .mobile-menu-bar {
      background-color: $color-accent;
      color: $color-background;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;

      .mobile-menu-toggle {
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .mobile-menu-content {
      background-color: $color-background;
      padding: 20px;
      border-right: 2px solid $color-divider;
      position: fixed;
      top: 52px; /* Adjust this value based on the mobile-menu-bar height */
      left: 0;
      bottom: 0;
      width: 225px;
      z-index: 40;
      overflow-y: auto;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }
  }

  /* This is to ensure the page content is not covered by the fixed mobile-menu-bar */
  :global(body) {
    @include mobile {
      padding-top: 52px; /* Same as mobile-menu-bar height */
    }
  }
</style>
