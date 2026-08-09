<script lang="ts">
  import { isArmor, isWeapon, isAccessory, type EquipmentDetailItem } from '$lib/utils/equipment';
  import { urlFor } from '$lib/utils/sanity/sanityImage';
  import ImageModal from '../common/ImageModal.svelte';

  let isModalOpen = $state(false);
  const toggleModal = () => (isModalOpen = !isModalOpen);

  let { equipment }: { equipment: EquipmentDetailItem } = $props();
</script>

<header>
  <div class="header-info">
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
  </div>

  {#if equipment.image}
    <button class="image-button" onclick={toggleModal}>
      <img src={urlFor(equipment.image).width(300).url()} alt={equipment.identifiedName} />
    </button>

    {#if isModalOpen}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={urlFor(equipment.image).url()}
        alt={equipment.identifiedName}
        onClose={toggleModal}
      />
    {/if}
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

  {#if isArmor(equipment)}
    <h2>Armor Information</h2>
    <ul class="ul-diamond">
      <li>Slot: {equipment.armorAttributes?.armorType ?? 'Unknown'}</li>
      <li>Material: {equipment.armorAttributes?.material ?? 'Unknown'}</li>
      <li>Armor Rating: {equipment.armorAttributes?.armorRating ?? 'Unknown'}</li>
    </ul>
  {/if}

  {#if isWeapon(equipment)}
    <h2>Weapon Information</h2>
    <ul class="ul-sword">
      <li>
        Damage:
        {#if equipment.weaponAttributes?.damage}
          {equipment.weaponAttributes.damage.min ?? '?'}
          -
          {equipment.weaponAttributes.damage.max ?? '?'}
        {:else}
          Unknown
        {/if}
      </li>
      <li>Weapon Type: {equipment.weaponAttributes?.weaponType?.name ?? 'Unknown'}</li>
      <li>Governing Skill: {equipment.weaponAttributes?.weaponType?.skill ?? 'Unknown'}</li>
      <li>Range: {equipment.weaponAttributes?.weaponType?.range ?? 'Unknown'}</li>
      <li>
        Scaling Attributes:
        {#if equipment.weaponAttributes?.weaponType?.attributeScaling}
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
    {#if isAccessory(equipment)}
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
    {#if !isAccessory(equipment) && equipment?.excludes}
      <li>
        Excludes:
        {equipment.excludes}
      </li>
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

  .image-button {
    flex-shrink: 0;
    width: 300px;
    max-width: 100%;

    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    @include tablet-and-up {
      width: 360px;
    }
  }

  .quote-container {
    display: flex;
    justify-content: center;

    blockquote {
      width: 90%;
    }
  }
</style>
