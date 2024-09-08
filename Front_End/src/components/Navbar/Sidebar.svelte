<script lang="ts">
  import { sidebarItems } from './sidebar-items';
	import SidebarFolder from './SidebarFolder.svelte';
	import SidebarLink from './SidebarLink.svelte';

  let expandedItems: Map<string, boolean> = new Map();

  function toggle(item: string) {
    expandedItems.set(item, !expandedItems.get(item));
    expandedItems = expandedItems;
  }
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

<style lang="scss">
.sidebar {
  background-color: $sidebar-background-color;
  padding: 20px;
  width: 200px;
  border-right: 2px solid $divider-color;
  overflow-y: auto;

  h2 {
    color: $header-color;
    margin-top: 0;
    margin-bottom: 15px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
}
</style>