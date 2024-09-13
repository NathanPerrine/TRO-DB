<script lang="ts">
  import { type SidebarItem } from "./sidebar-items";
  export let item: SidebarItem;
</script>

{#if !item.disabled }
  <a href={item.link}>{item.title}</a>
{:else}
  <p class="disabled">{item.title}</p>
{/if}

<style lang="scss">
  a, p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-color;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }

  a:hover {
    background-color: $link-hover-background;
    color: #fff;
  }

  .disabled {
    color: gray;
    text-decoration: line-through;
  }
</style>