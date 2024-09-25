<script lang="ts">
	import { type SidebarItem } from "./sidebar-items";
  import SidebarLink from "./SidebarLink.svelte";
  export let item: SidebarItem;

  let expanded = false
</script>

<button
  class={expanded ? 'expanded' : ''}
  on:click|preventDefault={() => expanded = !expanded}
>
  <span>{item.title}</span>
  <span class="arrow">▶</span>
</button>

<ul
style:display={expanded ? 'block': 'none'}
>
  {#if item.subItems}
    {#each item.subItems as subItem}
      <li>
        {#if subItem.subItems}
          <svelte:self item={subItem} />
        {:else}
          <SidebarLink item={subItem} />
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
    color: $color-text;
    text-decoration: none;
    transition: background-color 0.2s ease;

    cursor: pointer;

    &:hover {
      background: linear-gradient(to right, $color-accent-hover 30%, rgba($color-accent-hover, 0) 90%);
    }

    .arrow {
      font-size: 12px;
      color: $color-text;
      transition: transform 0.3s ease;
    }

    &.expanded {
      background: linear-gradient(to right, $color-accent-hover 30%, rgba($color-accent-hover, 0) 90%);
      .arrow {
        transform: rotate(90deg);
      }
    }
  }

  ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0.5em 0 0 0.5em;
		list-style: none;
		border-left: 2px solid $color-divider;
	}

	li {
		padding: 0.2em 0;
	}
</style>