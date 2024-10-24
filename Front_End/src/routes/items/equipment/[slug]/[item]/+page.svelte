<script lang="ts">
  import type { Armor, Weapon } from '$lib';
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  function isArmor(equipment: any): equipment is Armor {
    return equipment.armorWeapon === 'armor';
  }

  function isWeapon(equipment: any): equipment is Weapon {
    return equipment.armorWeapon === 'weapon';
  }
</script>

<main>
  <header>
    <h1>{data.equipment?.name} | {data.equipment?.identifiedName}</h1>
    <h3>Description:</h3>
    <p>{data.equipment?.description}</p>
    <h3>Description (Identified):</h3>
    <div class="quote-container">
      <blockquote class="quote">
        {data.equipment?.identifiedDescription}
      </blockquote>
    </div>
  </header>

  <section>
    <h2>Attributes</h2>
    <ul class="ul-diamond">
      {#if data.equipment?.attributes}
        {#each data.equipment.attributes as attribute}
          <li>{attribute}</li>
        {/each}
      {:else}
        <li>No Known Attributes</li>
      {/if}
    </ul>

    {#if isArmor(data.equipment)}
      <h2>Armor Information</h2>
      <ul class="ul-diamond">
        <li>Slot: {data.equipment.armorAttributes.armorType}</li>
        <li>Material: {data.equipment.armorAttributes.material}</li>
        <li>Armor Rating: {data.equipment.armorAttributes.armorRating}</li>
      </ul>
    {/if}

    {#if isWeapon(data.equipment)}
      <h2>Weapon Information</h2>
      <ul class="ul-sword">
        <li>
          Damage:
          {#if data.equipment.weaponAttributes.damage}
            {data.equipment.weaponAttributes.damage.min}
            -
            {data.equipment.weaponAttributes.damage.max}
          {/if}
        </li>
        <li>Weapon Type: {data.equipment.weaponAttributes.weaponType?.name}</li>
        <li>Governing Skill: {data.equipment.weaponAttributes.weaponType?.skill}</li>
        <li>Range: {data.equipment.weaponAttributes.weaponType?.range}</li>
        <li>
          Scaling Attributes:
          {#if data.equipment.weaponAttributes.weaponType?.attributeScaling}
            <ul class="ul-sword">
              {#each data.equipment.weaponAttributes.weaponType?.attributeScaling as attribute}
                <li>
                  <span class="capitalize">{attribute.attribute}</span>: {attribute.scalingType}
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      </ul>
    {/if}

    <h2>General Information</h2>
    <ul class="ul-diamond">
      <li>
        Rarity:
        {#if data.equipment?.rarity}
          <span class="rarity-{data.equipment.rarity}">{data.equipment.rarity}</span>
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Level Requirement:
        {#if data.equipment?.levelRequirement}
          <span>{data.equipment.levelRequirement}</span>
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Weight:
        {#if data.equipment?.weight}
          {data.equipment.weight}
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Condition:
        {#if data.equipment?.condition}
          {data.equipment.condition}
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Sell Price:
        {#if data.equipment?.sellPrice}
          {data.equipment.sellPrice}
        {:else}
          TBD
        {/if}
      </li>
      {#if data.equipment?.excludes}
        <li>
          Excludes:
          {data.equipment.excludes}
        </li>
      {/if}
    </ul>

    <h2>Drop Areas</h2>
    <ul class="ul-diamond">
      {#if data.equipment?.dropArea}
        {#each data.equipment.dropArea as area}
          <li>
            <a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a>
          </li>
        {/each}
      {/if}
    </ul>

    <Notes notes={data.equipment?.notes} />
  </section>
</main>

<style lang="scss">
  .quote-container {
    display: flex;
    justify-content: center;

    blockquote {
      width: 90%;
    }
  }
</style>
