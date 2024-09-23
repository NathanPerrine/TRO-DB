<script lang="ts">
  import '../app.scss'
  import Sidebar from '../lib/components/Navbar/Sidebar.svelte'

  const { children } = $props()
</script>

<Sidebar />
{@render children()}