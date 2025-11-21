<script lang="ts">
	import { generateCanonicalUrl, truncateDescription } from '$lib/utils/seo';

	interface SEOProps {
		/**
		 * Page title (will be suffixed with " | TRO-DB")
		 */
		title?: string;
		/**
		 * Meta description for the page
		 */
		description?: string;
		/**
		 * Relative path for canonical URL (e.g., '/items/equipment' or '/characterbuilder')
		 */
		canonicalPath?: string;
		/**
		 * Open Graph type (default: 'website')
		 */
		type?: 'website' | 'article';
		/**
		 * If true, adds noindex meta tag
		 */
		noindex?: boolean;
	}

	let {
		title = 'TRO-DB',
		description = 'Your comprehensive guide to The Realm Online - Items, Spells, Mobs, Areas, and Character Builder',
		canonicalPath = '/',
		type = 'website',
		noindex = false
	}: SEOProps = $props();

	// Generate full page title with site suffix
	const fullTitle = title === 'TRO-DB' ? title : `${title} | TRO-DB`;

	// Truncate description to fit meta description limits
	const metaDescription = truncateDescription(description, 160);

	// Generate canonical URL
	const canonicalUrl = generateCanonicalUrl(canonicalPath);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={metaDescription} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:site_name" content="TRO-DB" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={metaDescription} />
</svelte:head>
