<script lang="ts">
  import '../app.scss'
  import Sidebar from '../components/Navbar/Sidebar.svelte'

  const { children } = $props()
</script>

<Sidebar />
{@render children()}