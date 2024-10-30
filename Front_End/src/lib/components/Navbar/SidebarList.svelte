<script lang="ts">
  import SidebarFolder from './SidebarFolder.svelte';
  import SidebarLink from './SidebarLink.svelte';
  import { sidebarItems } from './sidebar-items';

  export let onNavigate: () => void;
</script>

<ul>
  {#each sidebarItems as item}
    <li>
      {#if !item.subItems}
        <SidebarLink {item} {onNavigate} />
      {:else}
        <SidebarFolder {item} {onNavigate} />
      {/if}
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
</style>
