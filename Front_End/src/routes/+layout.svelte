<script lang="ts">
  import '$lib/scss/app.scss'
  import Sidebar from '../lib/components/Navbar/Sidebar.svelte'

  const { children } = $props()
</script>

<Sidebar />
{@render children()}