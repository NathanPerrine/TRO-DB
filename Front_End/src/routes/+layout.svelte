<script lang="ts">
  import '$lib/scss/app.scss';
  import Sidebar from '../lib/components/Navbar/Sidebar.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';
  import { page } from '$app/stores';
  import { getDefaultTitleFromPath, getDefaultDescriptionFromPath } from '$lib/utils/seoDefaults';

  const { children } = $props();

  // Check if page provides custom SEO via load function
  const pageSEO = $derived($page.data.seo as { title: string; description: string } | undefined);

  // Derive SEO from current path as fallback
  const title = $derived(pageSEO?.title ?? getDefaultTitleFromPath($page.url.pathname));
  const description = $derived(pageSEO?.description ?? getDefaultDescriptionFromPath($page.url.pathname));
</script>

{#key $page.url.pathname}
  <SEO
    title={title}
    description={description}
    canonicalPath={$page.url.pathname}
  />
{/key}

<div class="main-div">
  <Sidebar />
  <div class="content-wrapper">
    <Breadcrumbs />
    {@render children()}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .content-wrapper {
    flex: 1;
    max-height: 100vh;
    overflow-y: auto;
    background: linear-gradient(to right, var(--color-accent) 0%, var(--color-background) 3%);
  }

  .main-div {
    display: flex;
    flex-direction: row;
    max-width: 100vw;
    flex-grow: 1;

    @include mobile {
      flex-direction: column;
    }
  }
</style>
