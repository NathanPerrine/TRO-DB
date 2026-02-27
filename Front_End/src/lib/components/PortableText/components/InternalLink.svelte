<script lang="ts">
  import type { Snippet } from 'svelte';
  import { buildItemUrl } from '$lib/utils/buildItemUrl';

  type ReferenceData = {
    _type: string;
    slug: { current: string };
    title?: string;
    spellSchool?: string;
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

  const reference = $derived(portableText.value.reference);

  // Check if reference is null (unpublished document)
  const isUnpublished = $derived(reference === null);

  const href = $derived(reference ? buildItemUrl(reference) : '#');
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
