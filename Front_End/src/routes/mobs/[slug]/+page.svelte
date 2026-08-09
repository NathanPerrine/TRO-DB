<script lang="ts">
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';
  import ImageModal from '$lib/components/common/ImageModal.svelte';
  import { urlFor } from '$lib/utils/sanity/sanityImage';

  let { data }: { data: PageData } = $props();

  let activeView = $state<'overworld' | 'infoPanel'>(
    data.images?.overworld ? 'overworld' : 'infoPanel'
  );
  let modalOpen = $state(false);
  const activeImage = $derived(
    activeView === 'overworld' ? data.images?.overworld : data.images?.infoPanel
  );
</script>

<main>
  <header>
    <div class="header-info">
      <h1>{data.name}</h1>
      <div class="quote-container">
        <blockquote class="quote">{data.description ?? 'Coming soon...'}</blockquote>
      </div>
    </div>

    {#if activeImage}
      <div class="mob-images">
        {#if data.images?.overworld && data.images?.infoPanel}
          <div class="image-tabs">
            <button
              class:active={activeView === 'overworld'}
              onclick={() => (activeView = 'overworld')}>Overworld</button
            >
            <button
              class:active={activeView === 'infoPanel'}
              onclick={() => (activeView = 'infoPanel')}>Details</button
            >
          </div>
        {/if}
        <button class="image-button" onclick={() => (modalOpen = true)}>
          <img
            src={urlFor(activeImage).width(300).url()}
            alt="{data.name} {activeView}"
          />
        </button>
      </div>

      {#if modalOpen}
        <ImageModal
          isOpen={modalOpen}
          imageUrl={urlFor(activeImage).url()}
          alt={data.name}
          onClose={() => (modalOpen = false)}
        />
      {/if}
    {/if}
  </header>

  <section>
    <h2>Level & HP Range</h2>
    <ul class="ul-sword">
      <li>Level: {data.levelRange?.min} - {data.levelRange?.max}</li>
      <li>HP: {data.hpRange?.min} - {data.hpRange?.max}</li>
    </ul>

    <h2>Alignment</h2>
    <ul class="ul-diamond">
      <li>{data.alignment}</li>
    </ul>

    <h2>Dungeon Boss</h2>
    <ul class="ul-none">
      <li>
        {#if data.boss}
          <span class="check">&#10003</span>
        {:else}
          <span class="cross">&#10007</span>
        {/if}
      </li>
    </ul>

    <h2>Melee Attributes</h2>
    <ul class="ul-diamond">
      <li>Melee Defense: {data.meleeDefense?.min} - {data.meleeDefense?.max}</li>
      <li>Melee Damage Modifier: {data.meleeAttributes?.mdm}</li>
      <li>Good MDM: {data.meleeAttributes?.goodMDM}</li>
      <li>Evil MDM: {data.meleeAttributes?.evilMDM}</li>
      <li>Melee Phase: {data.meleeAttributes?.meleePhase}</li>
    </ul>

    <h2>Spell Resistances</h2>
    <ul class="ul-diamond">
      <li>Sorcery: {data.spellResistances.sorcery}</li>
      <li>Elementalism: {data.spellResistances.elementalism}</li>
      <li>Mysticism: {data.spellResistances.mysticism}</li>
      <li>Thaumaturgy: {data.spellResistances.thaumaturgy}</li>
      <li>Necromancy: {data.spellResistances.necromancy}</li>
    </ul>

    <h2>Spell Damage Modifiers</h2>
    <ul class="ul-diamond">
      <li>Sorcery: {data.spellDamageModifiers.sorcery}</li>
      <li>Elementalism: {data.spellDamageModifiers.elementalism}</li>
      <li>Mysticism: {data.spellDamageModifiers.mysticism}</li>
      <li>Thaumaturgy: {data.spellDamageModifiers.thaumaturgy}</li>
      <li>Necromancy: {data.spellDamageModifiers.necromancy}</li>
    </ul>

    <h2>Known Spells</h2>
    {#if data.knownSpells}
      <ul class="ul-diamond">
        {#each data.knownSpells as spell}
          <li><a href={`/magic/${spell.spellSchool}/${spell.slug.current}`}>{spell.title}</a></li>
        {/each}
      </ul>
    {:else}
      <p>This mob has no known spells.</p>
    {/if}

    <h2>Inhabited Areas</h2>
    {#if data.inhabitedAreas}
      <ul class="ul-diamond">
        {#each data.inhabitedAreas as area}
          <li><a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a></li>
        {/each}
      </ul>
    {:else}
      <p>This mob has no known inhabited areas.</p>
    {/if}

    <h2>Emotes</h2>
    {#if data.emotes}
      <ul class="ul-diamond">
        {#each data.emotes as emote}
          <li>{emote}</li>
        {/each}
      </ul>
    {:else}
      <p>This mob performs no emotes.</p>
    {/if}

    <Notes notes={data.notes} />
  </section>
</main>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  header {
    display: flex;
    gap: 24px;
    align-items: flex-start;

    @include tablet-and-up {
      flex-direction: column;
      align-items: center;
    }
  }

  .header-info {
    flex: 1;
    min-width: 0;
  }

  .quote-container {
    display: flex;
    justify-content: center;

    blockquote {
      width: 90%;
    }
  }

  .mob-images {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .image-button {
    width: 260px;
    max-width: 100%;

    img {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
      image-rendering: pixelated;
      border-radius: 8px;
    }
  }

  .image-tabs {
    display: flex;
    gap: 6px;

    button {
      padding: 4px 12px;
      font-size: 0.8125rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-button-bg);
      color: var(--color-text);
      cursor: pointer;

      &.active {
        border-color: var(--color-text-accent);
        color: var(--color-text-accent);
      }
    }
  }
</style>
