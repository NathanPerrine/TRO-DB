// Maps URL segments to readable labels
export const segmentLabels: Record<string, string> = {
	// Main sections
	items: 'Items',
	magic: 'Magic',
	areas: 'Areas',
	mobs: 'Mobs',
	guides: 'Guides',
	characterbuilder: 'Character Builder',

	// Equipment types
	equipment: 'Equipment',
	armor: 'Armor',
	weapons: 'Weapons',
	accessories: 'Accessories',

	// Book types
	books: 'Books',
	skillbooks: 'Skillbooks',
	spellbooks: 'Spellbooks',

	// Consumable types
	consumables: 'Consumables',
	potions: 'Potions',
	scrolls: 'Scrolls',
	wands: 'Wands',
	orbs: 'Orbs',
	baubles: 'Baubles',

	// Area types
	dungeons: 'Dungeons',
	dungeon: 'Dungeon',
	towns: 'Towns',
	town: 'Town',
	zones: 'Zones',
	zone: 'Zone',

	// Magic schools
	thaumaturgy: 'Thaumaturgy',
	mysticism: 'Mysticism',
	elementalism: 'Elementalism',
	sorcery: 'Sorcery',
	necromancy: 'Necromancy'
};

// Maps singular URL segments to their plural route equivalents
// Used when a breadcrumb segment doesn't match the actual route structure
// Format: 'segment-in-url': 'actual-route-segment'
export const pathAdjustments: Record<string, string> = {
	dungeon: 'dungeons',
	town: 'towns',
	zone: 'zones'
};

export interface Breadcrumb {
	label: string;
	href: string;
	isLast: boolean;
}