<script lang="ts">
  import { type SidebarItem } from './sidebar-items';
  import { page } from '$app/stores';
  export let onNavigate: () => void;
  export let item: SidebarItem;

  $: isActive = $page.url.pathname === item.link;
</script>

{#if !item.disabled}
  <a
    class:active={isActive}
    href={item.link}
    on:click={() => {
      onNavigate();
    }}>{item.title}</a
  >
{:else}
  <p class="inactive">{item.title}</p>
{/if}

<style lang="scss">
  a {
    border: none;
  }

  a,
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text);
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }

  .active,
  a:hover {
    background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    color: var(--color-text);
  }

  .inactive {
    color: var(--color-inactive);
    text-decoration: line-through;
  }
</style>
