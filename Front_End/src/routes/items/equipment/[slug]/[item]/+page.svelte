<script lang="ts">
  import Notes from '$lib/components/Notes/Notes.svelte';
  import type { PageData } from './$types';
  import { isArmor, isWeapon, isAccessory } from '../utils';

  export let data: PageData;
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

    {#if isArmor(data.equipment) && data.equipment.armorAttributes}
      <h2>Armor Information</h2>
      <ul class="ul-diamond">
        <li>Slot: {data.equipment.armorAttributes.armorType ?? 'Unknown'}</li>
        <li>Material: {data.equipment.armorAttributes.material ?? 'Unknown'}</li>
        <li>Armor Rating: {data.equipment.armorAttributes.armorRating ?? 'Unknown'}</li>
      </ul>
    {/if}

    {#if isWeapon(data.equipment) && data.equipment.weaponAttributes}
      <h2>Weapon Information</h2>
      <ul class="ul-sword">
        <li>
          Damage:
          {#if data.equipment.weaponAttributes.damage}
            {data.equipment.weaponAttributes.damage.min ?? '?'}
            -
            {data.equipment.weaponAttributes.damage.max ?? '?'}
          {:else}
            Unknown
          {/if}
        </li>
        <li>Weapon Type: {data.equipment.weaponAttributes.weaponType?.name ?? 'Unknown'}</li>
        <li>Governing Skill: {data.equipment.weaponAttributes.weaponType?.skill ?? 'Unknown'}</li>
        <li>Range: {data.equipment.weaponAttributes.weaponType?.range ?? 'Unknown'}</li>
        <li>
          Scaling Attributes:
          {#if data.equipment.weaponAttributes.weaponType?.attributeScaling}
            <ul class="ul-sword">
              {#each data.equipment.weaponAttributes.weaponType.attributeScaling as attribute}
                <li>
                  <span class="capitalize">{attribute.attribute}</span>: {attribute.scalingType}
                </li>
              {/each}
            </ul>
          {:else}
            Unknown
          {/if}
        </li>
      </ul>
    {/if}

    <h2>General Information</h2>
    <ul class="ul-diamond">
      {#if isAccessory(data.equipment)}
        <li>Slot: <span class="capitalize">{data.equipment.slot}</span></li>
      {/if}
      <li>
        Rarity:
        {#if data.equipment?.rarity != null}
          <span class="rarity-{data.equipment.rarity}">{data.equipment.rarity}</span>
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Level Requirement:
        {#if data.equipment?.levelRequirement != null}
          <span>{data.equipment.levelRequirement}</span>
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Weight:
        {#if data.equipment?.weight != null}
          {data.equipment.weight}
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Condition:
        {#if data.equipment?.condition != null}
          {data.equipment.condition}
        {:else}
          TBD
        {/if}
      </li>
      <li>
        Sell Price:
        {#if data.equipment?.sellPrice != null}
          {data.equipment.sellPrice}
        {:else}
          TBD
        {/if}
      </li>
      {#if isArmor(data.equipment) || isWeapon(data.equipment)}
        {#if data.equipment?.excludes}
          <li>
            Excludes:
            {data.equipment.excludes}
          </li>
        {/if}
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
