<script lang="ts">
    import { goto } from '$app/navigation';
  import { Search } from 'lucide-svelte';
  let searchTerm = $state('');

  function search(e: Event) {
    e.preventDefault();
    let url = "/search?q=" + searchTerm;
    goto(url)
  }
</script>

<section class="nav-search">
  <h2>Search</h2>
  <form onsubmit={search} class="search-bar">
    <span class="search-icon"><Search size=14 /></span>
    <input type="text" bind:value={searchTerm}  />
  </form>
</section>


<style lang="scss">
  @use '$lib/scss/view_mixins.scss' as *;
  .nav-search {
    margin-bottom: 8px;
  }

  .search-bar {
    position: relative;
    padding-left: 18px;
    padding-top: 8px;


    input[type=text] {
      width: 110px;
      border-radius: 5px;
      padding-left: 16px;

      &:focus {
        outline: solid var(--color-accent);
      }
    }

    .search-icon {
      color: black;

      position: absolute;
      left: 20px;
      top: 11px;
    }
  }


</style>