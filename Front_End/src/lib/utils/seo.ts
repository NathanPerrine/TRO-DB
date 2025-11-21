/**
 * SEO utility functions for metadata generation
 */

const SITE_URL = 'https://tro-db.vercel.app';

/**
 * Generates a canonical URL from a relative path
 * @param path - Relative path (e.g., '/items/equipment' or 'items/equipment')
 * @returns Full canonical URL
 */
export function generateCanonicalUrl(path: string): string {
	// Ensure path starts with /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	// Remove trailing slash if present (except for root)
	const cleanPath = normalizedPath.length > 1 ? normalizedPath.replace(/\/$/, '') : normalizedPath;
	return `${SITE_URL}${cleanPath}`;
}

/**
 * Truncates a description to fit within meta description limits
 * @param text - The text to truncate
 * @param maxLength - Maximum length (default: 160 characters)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Extracts plain text from Sanity PortableText blocks
 * @param blocks - PortableText blocks array
 * @returns Plain text string
 */
export function extractTextFromPortableText(blocks: any[]): string {
	if (!blocks || !Array.isArray(blocks)) return '';

	return blocks
		.filter((block) => block._type === 'block')
		.map((block) => {
			if (!block.children || !Array.isArray(block.children)) return '';
			return block.children
				.filter((child: any) => child._type === 'span')
				.map((child: any) => child.text || '')
				.join('');
		})
		.join(' ')
		.trim();
}
