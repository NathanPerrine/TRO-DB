/**
 * Generate default SEO data based on the current URL path
 */

export function getDefaultTitleFromPath(path: string): string {
	// Remove leading/trailing slashes and split
	const segments = path.replace(/^\/|\/$/g, '').split('/').filter(Boolean);

	if (segments.length === 0) {
		return 'TRO-DB';
	}

	// Map common paths to titles
	const titleMap: Record<string, string> = {
		characterbuilder: 'Character Builder',
		items: 'Items',
		equipment: 'Equipment',
		weapons: 'Weapons',
		armor: 'Armor',
		accessories: 'Accessories',
		books: 'Books',
		consumables: 'Consumables',
		magic: 'Magic',
		thaumaturgy: 'Thaumaturgy',
		mysticism: 'Mysticism',
		elementalism: 'Elementalism',
		sorcery: 'Sorcery',
		necromancy: 'Necromancy',
		areas: 'Areas',
		dungeons: 'Dungeons',
		towns: 'Towns',
		zones: 'Zones',
		mobs: 'Mobs',
		guides: 'Guides'
	};

	// Get the last meaningful segment (handles /items/equipment/weapons -> "Weapons")
	const lastSegment = segments[segments.length - 1];

	// Return mapped title or capitalize the segment
	return titleMap[lastSegment] || capitalize(lastSegment);
}

export function getDefaultDescriptionFromPath(path: string): string {
	const segments = path.replace(/^\/|\/$/g, '').split('/').filter(Boolean);

	// Descriptions map (optimized for 160 character SEO limit)
	const descMap: Record<string, string> = {
		characterbuilder:
			"Plan your character's development for The Realm Online. Experiment with races, classes, alignments, and skill combinations to create your build.",
		equipment:
			"Browse The Realm's vast collection of weapons, armor, and accessories. Find the perfect gear to outfit your character for any adventure.",
		weapons:
			'Discover an arsenal of weapons from daggers to two-handed swords. Browse weapon stats, damage ranges, level requirements, and drop locations.',
		armor:
			'Find protective gear from light cloth to heavy plate. Browse helmets, chest pieces, boots, shields, and more with detailed armor ratings.',
		accessories:
			'Enhance your character with magical rings, amulets, belts, and backpacks. Find powerful bonuses and unique effects to complement your build.',
		magic:
			'Discover the five schools of magic in The Realm Online: Thaumaturgy, Mysticism, Elementalism, Sorcery, and Necromancy. Master spells and abilities.',
		areas:
			'Explore dungeons, towns, and zones across The Realm Online. From dangerous lairs filled with treasures to safe havens for rest and trade.',
		mobs: 'Browse all monsters and creatures in The Realm Online. View detailed stats, level ranges, spell resistances, known spells, and inhabited areas.',
		items:
			'Browse the complete collection of items in The Realm Online. Find equipment, books, consumables, junk, and dungeon items with full stats.',
		books:
			'Learn new skills and spells through various tomes and scrolls. Find skillbooks for combat and crafting, as well as magical spellbooks.',
		consumables:
			'Single-use items including potions, scrolls, wands, orbs, and baubles. Restore health, mana, cast spells, or gain temporary effects.',
		dungeons:
			"Dangerous lairs filled with monsters and treasures. From beginner-friendly areas to legendary challenges like Fuloran's Abode.",
		towns:
			'Safe havens where adventurers can rest, trade, and take on quests. Visit merchants, healers, trainers, and quest-givers.',
		zones:
			'Vast outdoor regions ranging from peaceful woods to deadly battlefields. Perfect for exploration, hunting, and adventure.',
		guides:
			'Comprehensive guides covering game mechanics, strategies, and tips for The Realm Online. Learn from veteran players and enhance your experience.',
		thaumaturgy:
			'The school of light and holy energy. Master healing, protection, and defensive magic to support allies and smite dark creatures.',
		mysticism:
			'Masters of psychic manipulation and battlefield control. Confuse, immobilize, and weaken enemies to gain tactical advantages.',
		elementalism:
			'Harness the raw power of earth, wind, fire, and air. Devastate enemies with elemental magic and enchant weapons with nature\'s fury.',
		sorcery:
			'Practical utility magic including teleportation, invisibility, and lockpicking. Master enchanting to imbue items with magical properties.',
		necromancy:
			'The dark and forbidden arts of death magic. Wield acid, poison, and curses while summoning undead creatures and demons to fight for you.'
	};

	const lastSegment = segments[segments.length - 1];
	return (
		descMap[lastSegment] ||
		'Your comprehensive guide to The Realm Online - Items, Spells, Mobs, Areas, and Character Builder'
	);
}

function capitalize(str: string): string {
	// Handle kebab-case and snake_case
	return str
		.replace(/[-_]/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}