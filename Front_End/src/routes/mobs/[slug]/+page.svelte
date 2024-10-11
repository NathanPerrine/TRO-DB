<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
  console.log(data.mob.description);
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
    <ul class="ul-diamond">
      <li>Level: {data.mob.levelRange?.min} - {data.mob.levelRange?.max}</li>
      <li>HP: {data.mob.hpRange?.min} - {data.mob.hpRange?.max}</li>
    </ul>

    <h2>Alignment</h2>
    <p>{data.mob.alignment}</p>

    <h2>Melee Attributes</h2>
    <ul class="ul-diamond">
      <li>Melee Defense: {data.mob.meleeDefense?.min} - {data.mob.meleeDefense?.max}</li>
      <li>Melee Damage Modifier: {data.mob.meleeAttributes.mdm}</li>
      <li>Good MDM: {data.mob.meleeAttributes.goodMDM}</li>
      <li>Evil MDM: {data.mob.meleeAttributes.evilMDM}</li>
      <li>Melee Phase: {data.mob.meleeAttributes.meleePhase}</li>
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
      {#each data.mob.knownSpells as spell}
        {spell}
      {/each}
    {/if}
  </section>
</main>
