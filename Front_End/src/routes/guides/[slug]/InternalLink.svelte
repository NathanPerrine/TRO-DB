<script lang="ts">
  import type { Snippet } from 'svelte';

  type ReferenceData = {
    _type: string;
    slug: { current: string };
    title?: string;
    school?: string;
    armorWeapon?: 'armor' | 'weapon';
    type?: string;
    areaType?: 'dungeon' | 'town' | 'zone';
    bookType?: 'skillbook' | 'spellbook';
  };

  let { portableText, children } = $props<{
    portableText: {
      value: {
        reference: ReferenceData | null;
      };
    };
    children: Snippet;
  }>();

  const reference = portableText.value.reference;

  // Check if reference is null (unpublished document)
  const isUnpublished = reference === null;

  // Helper to pluralize item types for consumables URLs
  function pluralizeItemType(type: string): string {
    const pluralMap: Record<string, string> = {
      junk: 'junk',
      potion: 'potions',
      elixir: 'elixirs',
      bauble: 'baubles',
      scroll: 'scrolls',
      wand: 'wands',
      orb: 'orbs',
      dungeon: 'dungeon'
    };
    return pluralMap[type] || type;
  }

  // Build URL based on document type
  function buildUrl(ref: ReferenceData): string {
    if (!ref || !ref.slug?.current) {
      console.warn('InternalLink: Missing reference or slug');
      return '#';
    }

    const slug = ref.slug.current;

    switch (ref._type) {
      case 'guide':
        return `/guides/${slug}`;

      case 'equipment':
        if (!ref.armorWeapon) {
          console.warn('InternalLink: Equipment missing armorWeapon field');
          return '#';
        }
        return `/items/equipment/${ref.armorWeapon}/${slug}`;

      case 'accessory':
        return `/items/equipment/accessories/${slug}`;

      case 'spell':
        if (!ref.school) {
          console.warn('InternalLink: Spell missing school field');
          return '#';
        }
        return `/magic/${ref.school}/${slug}`;

      case 'item':
        if (!ref.type) {
          console.warn('InternalLink: Item missing type field');
          return '#';
        }
        return `/items/consumables/${pluralizeItemType(ref.type)}/${slug}`;

      case 'book':
        if (!ref.bookType) {
          console.warn('InternalLink: Book missing bookType field');
          return '#';
        }
        return `/items/books/${ref.bookType}/${slug}`;

      case 'area':
        if (!ref.areaType) {
          console.warn('InternalLink: Area missing areaType field');
          return '#';
        }
        return `/areas/${ref.areaType}/${slug}`;

      case 'mob':
        return `/mobs/${slug}`;

      default:
        console.warn(`Unknown reference type: ${ref._type}`);
        return '#';
    }
  }

  const href = $derived(reference ? buildUrl(reference) : '#');
</script>

{#if isUnpublished}
  <span class="unpublished-link">
    {@render children()}
  </span>
{:else}
  <a {href} class="internal-link" data-sveltekit-preload-data>
    {@render children()}
  </a>
{/if}

<style lang="scss">
  .internal-link {
    color: var(--color-text-accent);
    text-decoration: none;
    border-bottom: 1px solid var(--color-text-accent);
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-header);
      border-bottom-color: var(--color-header);
    }
  }

  .unpublished-link {
    color: var(--color-inactive);
    font-style: italic;
  }
</style>