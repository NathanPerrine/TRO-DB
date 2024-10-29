<script lang="ts">
  import '$lib/scss/app.scss';
  import Sidebar from '../lib/components/Navbar/Sidebar.svelte';

  const { children } = $props();
</script>

<div class="main-div">
  <Sidebar />
  {@render children()}
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .main-div {
    display: flex;
    flex-direction: row;
    max-width: 100vw;

    @include mobile {
      flex-direction: column;
    }
  }
</style>
