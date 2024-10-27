<script lang="ts">
  import { sidebarItems } from './sidebar-items';
	import SidebarFolder from './SidebarFolder.svelte';
	import SidebarLink from './SidebarLink.svelte';

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
  background: linear-gradient(to left, $color-accent 5%, $color-background 13%);
  padding: 20px;
  width: 250px;
  border-right: 2px solid $color-divider;
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
}
</style>