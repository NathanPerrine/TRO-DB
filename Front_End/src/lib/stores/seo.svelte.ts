/**
 * Store for managing SEO metadata across pages
 * Pages can update this store to override default SEO values
 */

interface SEOData {
	title?: string;
	description?: string;
	canonicalPath?: string;
	type?: 'website' | 'article';
	noindex?: boolean;
}

// Create a reactive state for SEO data
let seoData = $state<SEOData>({
	title: 'TRO-DB',
	description:
		'Your comprehensive guide to The Realm Online - Items, Spells, Mobs, Areas, and Character Builder',
	canonicalPath: '/',
	type: 'website',
	noindex: false
});

export function setSEO(data: Partial<SEOData>) {
	seoData = { ...seoData, ...data };
}

export function resetSEO() {
	seoData = {
		title: 'TRO-DB',
		description:
			'Your comprehensive guide to The Realm Online - Items, Spells, Mobs, Areas, and Character Builder',
		canonicalPath: '/',
		type: 'website',
		noindex: false
	};
}

export function getSEO(): SEOData {
	return seoData;
}