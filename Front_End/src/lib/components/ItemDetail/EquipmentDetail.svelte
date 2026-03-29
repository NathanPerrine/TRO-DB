<script lang="ts">
  import { isArmor, isWeapon, isAccessory } from '$lib/utils/equipment';

  interface EquipmentProps {
    name: string;
    identifiedName: string;
    armorWeapon?: 'armor' | 'weapon';
    slot?: string;
    description?: string | null;
    identifiedDescription?: string | null;
    rarity?: string | null;
    attributes?: string[];
    weight?: number | null;
    condition?: number | null;
    sellPrice?: number | null;
    buyPrice?: number | null;
    excludes?: string | null;
    levelRequirement?: number | null;
    armorAttributes?: {
      armorType?: string | null;
      material?: string | null;
      armorRating?: number | null;
    } | null;
    weaponAttributes?: {
      damage?: { min: number; max: number } | null;
      weaponType?: {
        name?: string;
        skill?: string | null;
        range?: number | null;
        attributeScaling?: { attribute: string; scalingType: string }[] | null;
      } | null;
    } | null;
    dropArea?: { name: string; slug: { current: string }; areaType?: string | null }[];
  }

  let { equipment }: { equipment: EquipmentProps } = $props();
</script>

<header>
  <h1>{equipment?.name} | {equipment?.identifiedName}</h1>
  <h3>Description:</h3>
  {#if equipment.description}
    <p>{equipment.description}</p>
  {/if}
  <h3>Description (Identified):</h3>
  {#if equipment.identifiedDescription}
    <div class="quote-container">
      <blockquote class="quote">
        {equipment?.identifiedDescription}
      </blockquote>
    </div>
  {/if}
</header>

<section>
  <h2>Attributes</h2>
  <ul class="ul-diamond">
    {#if equipment?.attributes}
      {#each equipment.attributes as attribute}
        <li>{attribute}</li>
      {/each}
    {:else}
      <li>No Known Attributes</li>
    {/if}
  </ul>

  {#if equipment.armorWeapon && equipment.armorAttributes}
    <h2>Armor Information</h2>
    <ul class="ul-diamond">
      <li>Slot: {equipment.armorAttributes.armorType ?? 'Unknown'}</li>
      <li>Material: {equipment.armorAttributes.material ?? 'Unknown'}</li>
      <li>Armor Rating: {equipment.armorAttributes.armorRating ?? 'Unknown'}</li>
    </ul>
  {/if}

  {#if equipment.armorWeapon && equipment.weaponAttributes}
    <h2>Weapon Information</h2>
    <ul class="ul-sword">
      <li>
        Damage:
        {#if equipment.weaponAttributes.damage}
          {equipment.weaponAttributes.damage.min ?? '?'}
          -
          {equipment.weaponAttributes.damage.max ?? '?'}
        {:else}
          Unknown
        {/if}
      </li>
      <li>Weapon Type: {equipment.weaponAttributes.weaponType?.name ?? 'Unknown'}</li>
      <li>Governing Skill: {equipment.weaponAttributes.weaponType?.skill ?? 'Unknown'}</li>
      <li>Range: {equipment.weaponAttributes.weaponType?.range ?? 'Unknown'}</li>
      <li>
        Scaling Attributes:
        {#if equipment.weaponAttributes.weaponType?.attributeScaling}
          <ul class="ul-sword">
            {#each equipment.weaponAttributes.weaponType.attributeScaling as attribute}
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
    {#if equipment.slot}
      <li>Slot: <span class="capitalize">{equipment.slot}</span></li>
    {/if}
    <li>
      Rarity:
      {#if equipment?.rarity != null}
        <span class="rarity-{equipment.rarity}">{equipment.rarity}</span>
      {:else}
        TBD
      {/if}
    </li>
    <li>
      Level Requirement:
      {#if equipment?.levelRequirement != null}
        <span>{equipment.levelRequirement}</span>
      {:else}
        TBD
      {/if}
    </li>
    <li>
      Weight:
      {#if equipment?.weight != null}
        {equipment.weight}
      {:else}
        TBD
      {/if}
    </li>
    <li>
      Condition:
      {#if equipment?.condition != null}
        {equipment.condition}
      {:else}
        TBD
      {/if}
    </li>
    <li>
      Sell Price:
      {#if equipment?.sellPrice != null}
        {equipment.sellPrice}
      {:else}
        TBD
      {/if}
    </li>
    {#if equipment.armorWeapon}
      {#if equipment?.excludes}
        <li>
          Excludes:
          {equipment.excludes}
        </li>
      {/if}
    {/if}
  </ul>

  <h2>Drop Areas</h2>
  <ul class="ul-diamond">
    {#if equipment?.dropArea}
      {#each equipment.dropArea as area}
        <li>
          <a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style lang="scss">
  .quote-container {
    display: flex;
    justify-content: center;

    blockquote {
      width: 90%;
    }
  }
</style>
