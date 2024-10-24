<script lang="ts">
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  <header>
    <h1>{data.mob.name}</h1>
    <p>
      {#if data.mob.description}
        {data.mob.description}
      {:else}
        Coming soon...
      {/if}
    </p>
  </header>

  <section>
    <h2>Level & HP Range</h2>
    <ul class="ul-sword">
      <li>Level: {data.mob.levelRange?.min} - {data.mob.levelRange?.max}</li>
      <li>HP: {data.mob.hpRange?.min} - {data.mob.hpRange?.max}</li>
    </ul>

    <h2>Alignment</h2>
    <ul class="ul-diamond">
      <li>{data.mob.alignment}</li>
    </ul>

    <h2>Dungeon Boss</h2>
    <ul class="ul-none">
      <li>
        {#if data.mob.boss}
          <span class="check">&#10003</span>
        {:else}
          <span class="cross">&#10007</span>
        {/if}
      </li>
    </ul>

    <h2>Melee Attributes</h2>
    <ul class="ul-diamond">
      <li>Melee Defense: {data.mob.meleeDefense?.min} - {data.mob.meleeDefense?.max}</li>
      <li>Melee Damage Modifier: {data.mob.meleeAttributes?.mdm}</li>
      <li>Good MDM: {data.mob.meleeAttributes?.goodMDM}</li>
      <li>Evil MDM: {data.mob.meleeAttributes?.evilMDM}</li>
      <li>Melee Phase: {data.mob.meleeAttributes?.meleePhase}</li>
    </ul>

    <h2>Spell Resistances</h2>
    <ul class="ul-diamond">
      <li>Sorcery: {data.mob.spellResistances.sorcery}</li>
      <li>Elementalism: {data.mob.spellResistances.elementalism}</li>
      <li>Mysticism: {data.mob.spellResistances.mysticism}</li>
      <li>Thaumaturgy: {data.mob.spellResistances.thaumaturgy}</li>
      <li>Necromancy: {data.mob.spellResistances.necromancy}</li>
    </ul>

    <h2>Spell Damage Modifiers</h2>
    <ul class="ul-diamond">
      <li>Sorcery: {data.mob.spellDamageModifiers.sorcery}</li>
      <li>Elementalism: {data.mob.spellDamageModifiers.elementalism}</li>
      <li>Mysticism: {data.mob.spellDamageModifiers.mysticism}</li>
      <li>Thaumaturgy: {data.mob.spellDamageModifiers.thaumaturgy}</li>
      <li>Necromancy: {data.mob.spellDamageModifiers.necromancy}</li>
    </ul>

    <h2>Known Spells</h2>
    {#if data.mob.knownSpells}
      <ul class="ul-diamond">
        {#each data.mob.knownSpells as spell}
          <li><a href={`/magic/${spell.spellSchool}/${spell.slug.current}`}>{spell.title}</a></li>
        {/each}
      </ul>
    {:else}
      <p>This mob has no known spells.</p>
    {/if}

    <h2>Inhabited Areas</h2>
    {#if data.mob.inhabitedAreas}
      <ul class="ul-diamond">
        {#each data.mob.inhabitedAreas as area}
          <li><a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a></li>
        {/each}
      </ul>
    {:else}
      <p>This mob has no known inhabited areas.</p>
    {/if}

    <h2>Emotes</h2>
    {#if data.mob.emotes}
      <ul class="ul-diamond">
        {#each data.mob.emotes as emote}
          <li>{emote}</li>
        {/each}
      </ul>
    {:else}
      <p>This mob performs no emotes.</p>
    {/if}

    <Notes notes={data.mob.notes} />
  </section>
</main>
