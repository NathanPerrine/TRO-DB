<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import { segmentLabels, pathAdjustments, type Breadcrumb } from './breadcrumb-config';

	// Get dynamic page title from context (if provided by page)
	const pageTitle = getContext<string | undefined>('breadcrumbTitle');

	// Build breadcrumbs from current URL path
	function buildBreadcrumbs(pathname: string, dynamicTitle?: string): Breadcrumb[] {
		const segments = pathname.split('/').filter(Boolean);
		const breadcrumbs: Breadcrumb[] = [
			{ label: 'Home', href: '/', isLast: segments.length === 0 }
		];

		let currentPath = '';
		segments.forEach((segment, index) => {
			// Apply path adjustment if one exists for this segment
			const adjustedSegment = pathAdjustments[segment] || segment;
			currentPath += `/${adjustedSegment}`;
			const isLast = index === segments.length - 1;

			// Use dynamic title for last segment if provided
			let label = isLast && dynamicTitle
				? dynamicTitle
				: segmentLabels[segment] || segment.split('-').map(word =>
					word.charAt(0).toUpperCase() + word.slice(1)
				).join(' ');

			breadcrumbs.push({
				label,
				href: currentPath,
				isLast
			});
		});

		return breadcrumbs;
	}

	// Reactive breadcrumbs based on current page
	let breadcrumbs = $derived(buildBreadcrumbs($page.url.pathname, pageTitle));
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    {#each breadcrumbs as breadcrumb}
      <li>
        {#if breadcrumb.isLast}
          <span class="current" aria-current="page">{breadcrumb.label}</span>
        {:else}
          <a href={breadcrumb.href}>{breadcrumb.label}</a>
          <span class="separator" aria-hidden="true">&rtri;</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

	.breadcrumbs {
		padding: 1rem 2rem;
		font-size: 0.9rem;
    max-width: 100vw;

		ol {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem;
			list-style: none;
			margin: 0;
			padding: 0;
		}

		li {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.current {
			color: var(--color-text);
			font-weight: 500;
		}

		.separator {
			color: var(--color-inactive);
			user-select: none;
		}

    @include mobile {
      font-size: 0.85rem;
      width: 100%;
      padding: 1.25rem 2rem 1rem 2rem;
    }
	}
</style>