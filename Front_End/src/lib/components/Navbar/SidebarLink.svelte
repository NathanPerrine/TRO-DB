<script lang="ts">
  import { type SidebarItem } from './sidebar-items';
  export let onNavigate: () => void;
  export let item: SidebarItem;
</script>

{#if !item.disabled}
  <a
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
    color: $color-text;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }

  a:hover {
    background: linear-gradient(
      to right,
      $color-accent-hover 30%,
      rgba($color-accent-hover, 0) 90%
    );
    color: $color-text;
  }

  .inactive {
    color: $color-inactive;
    text-decoration: line-through;
  }
</style>
