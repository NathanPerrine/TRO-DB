<script lang="ts">
  import { type SidebarItem } from "./sidebar-items";
  export let item: SidebarItem;
</script>

<a href={item.link}>{item.title}</a>

<style lang="scss">
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-color;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: lighten($sidebar-background-color, 5%);
    transition: background-color 0.2s ease;
  }

  a:hover {
    background-color: $link-hover-background;
    color: #fff;
  }

  a.active {
    background-color: $header-color;
    color: #fff;
  }

  a .icon {
    font-size: 12px;
    color: $text-color;
    transition: transform 0.2s ease;
  }

  a.expanded .icon {
    transform: rotate(90deg);
  }
</style>