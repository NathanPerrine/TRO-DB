<script lang="ts">
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<main>
  <header>
    <h1>{data.name}</h1>
    <p>
      {#if data.description}
        {data.description}
      {:else}
        Coming soon...
      {/if}
    </p>
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
