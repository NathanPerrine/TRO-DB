<script lang="ts">
  import { page } from '$app/stores';
  import { type SidebarItem } from './sidebar-items';
  import SidebarLink from './SidebarLink.svelte';
  export let item: SidebarItem;
  export let onNavigate: () => void;

  let expanded = false;

  $: isActive = item.subItems?.some(
    (subItem) =>
      $page.url.pathname === subItem.link ||
      subItem.subItems?.some((grandChild) => $page.url.pathname === grandChild.link)
  );
</script>

<button
  class:active={isActive}
  class:expanded
  on:click|preventDefault={() => (expanded = !expanded)}
>
  <span>{item.title}</span>
  <span class="arrow">▶</span>
</button>

<ul style:display={expanded ? 'block' : 'none'}>
  {#if item.subItems}
    {#each item.subItems as subItem}
      <li>
        {#if subItem.subItems}
          <svelte:self item={subItem} {onNavigate} />
        {:else}
          <SidebarLink item={subItem} {onNavigate} />
        {/if}
      </li>
    {/each}
  {/if}
</ul>

<style lang="scss">
  button {
    font-size: 100%;
    font-family: inherit;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 0;
    border-radius: 5px;

    padding: 10px 15px;
    width: 100%;

    background-color: transparent;
    color: var(--color-text);
    text-decoration: none;
    transition: background-color 0.2s ease;

    cursor: pointer;

    &:hover {
      background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    }

    .arrow {
      font-size: 12px;
      color: var(--color-text);
      transition: transform 0.3s ease;
    }

    &.active,
    &.expanded {
      background: linear-gradient(to right, var(--color-accent-hover) 30%, transparent 100%);
    }

    &.expanded .arrow {
      transform: rotate(90deg);
    }
  }

  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0.5em 0 0 0.5em;
    list-style: none;
    border-left: 2px solid var(--color-divider);
  }

  li {
    padding: 0.2em 0;
  }
</style>
