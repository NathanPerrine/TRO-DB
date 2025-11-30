<script lang="ts">
  import type {
    GroupedArmor,
    GroupedWeapons,
    GroupedAccessories
  } from '$lib/schemas/equipment.server';
  import type { PlayerClassType } from './types';
  import EquipmentTableComponent from './EquipmentTableComponent.svelte';
  import { ArrowUp } from 'lucide-svelte';

  let {
    equipmentList,
    equipmentType,
    playerClass = null
  }: {
    equipmentList: GroupedArmor | GroupedWeapons | GroupedAccessories;
    equipmentType: string;
    playerClass?: PlayerClassType;
  } = $props();

  let showBackToTop = $state(false);

  $effect(() => {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (!contentWrapper) return;

    const handleScroll = () => {
      showBackToTop = contentWrapper.scrollTop > 300;
    };

    contentWrapper.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      contentWrapper.removeEventListener('scroll', handleScroll);
    };
  });

  function scrollToTop() {
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  let armorButtons = [
    'Helmets',
    'Cowls',
    'Chests',
    'Robes',
    'Skirts',
    'Wrists',
    'Legs',
    'Feet',
    'Shields'
  ];
  let weaponButtons = [
    'Daggers',
    'Throwing Daggers',
    'Long Swords',
    'Short Swords',
    'Fists',
    'Axes',
    'Two Handed Swords',
    'Maces',
    'Clubs',
    'Mauls'
  ];
  let accessoryButtons = ['Amulets', 'Belts', 'Baldrics', 'Rings'];
</script>

<section>
  {#if equipmentType.toLowerCase() === 'armor'}
    <h2>Armor Types</h2>
    <div class="tag-container">
      {#each armorButtons as button}
        <button
          class="tag"
          onclick={() => {
            const element = document.getElementById(button.toLowerCase().replace(' ', '-'));
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>{button}</button>
      {/each}
    </div>
    {@const armor = equipmentList as GroupedArmor}
    <!-- helms -->
    {#if armor.helm.length > 0}
      <EquipmentTableComponent equipmentList={armor.helm} header="Helmets" {playerClass} />
    {/if}
    <!-- cowls -->
    {#if armor.cowl.length > 0}
      <EquipmentTableComponent equipmentList={armor.cowl} header="Cowls" {playerClass} />
    {/if}
    <!-- chests -->
    {#if armor.chest.length > 0}
      <EquipmentTableComponent equipmentList={armor.chest} header="Chests" {playerClass} />
    {/if}
    <!-- robes / skirts -->
    {#if armor.robe.length > 0}
      <EquipmentTableComponent equipmentList={armor.robe} header="Robes" {playerClass} />
    {/if}
    {#if armor.skirt.length > 0}
      <EquipmentTableComponent equipmentList={armor.skirt} header="Skirts" {playerClass} />
    {/if}
    <!-- wrists -->
    {#if armor.wrists.length > 0}
      <EquipmentTableComponent equipmentList={armor.wrists} header="Wrists" {playerClass} />
    {/if}
    <!-- legs -->
    {#if armor.legs.length > 0}
      <EquipmentTableComponent equipmentList={armor.legs} header="Legs" {playerClass} />
    {/if}
    <!-- feets -->
    {#if armor.feet.length > 0}
      <EquipmentTableComponent equipmentList={armor.feet} header="Feet" {playerClass} />
    {/if}
    <!-- shields -->
    {#if armor.shield.length > 0}
      <EquipmentTableComponent equipmentList={armor.shield} header="Shields" {playerClass} />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'weapons'}
    <h2>Weapon Types</h2>
    <div class="tag-container">
      {#each weaponButtons as button}
        <button
          class="tag"
          onclick={() => {
            const element = document.getElementById(button.toLowerCase().replace(' ', '-'));
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>{button}</button>
      {/each}
    </div>
    {@const weapons = equipmentList as GroupedWeapons}
    <h1 id="light-piercing" class="equipment-header">Light Piercing</h1>
    {#if weapons.dagger.length > 0}
      <EquipmentTableComponent equipmentList={weapons.dagger} header="Daggers" {playerClass} />
    {/if}

    {#if weapons['throwing dagger'].length > 0}
      <EquipmentTableComponent
        equipmentList={weapons['throwing dagger']}
        header="Throwing Daggers"
        {playerClass}
      />
    {/if}

    <h1 id="light-one-handed" class="equipment-header">Light One Handed</h1>
    {#if weapons['long sword'].length > 0}
      <EquipmentTableComponent
        equipmentList={weapons['long sword']}
        header="Long Swords"
        {playerClass}
      />
    {/if}

    {#if weapons['short sword'].length > 0}
      <EquipmentTableComponent
        equipmentList={weapons['short sword']}
        header="Short Swords"
        {playerClass}
      />
    {/if}

    {#if weapons.fist.length > 0}
      <EquipmentTableComponent equipmentList={weapons.fist} header="Fists" {playerClass} />
    {/if}

    <h1 id="light-two-handed" class="equipment-header">Light Two Handed</h1>
    {#if weapons.axe.length > 0}
      <EquipmentTableComponent equipmentList={weapons.axe} header="Axes" {playerClass} />
    {/if}

    {#if weapons['two handed sword'].length > 0}
      <EquipmentTableComponent
        equipmentList={weapons['two handed sword']}
        header="Two Handed Swords"
        {playerClass}
      />
    {/if}

    {#if weapons.mace.length > 0}
      <EquipmentTableComponent equipmentList={weapons.mace} header="Maces" {playerClass} />
    {/if}

    <h1 id="heavy-two-handed" class="equipment-header">Heavy Two Handed</h1>
    {#if weapons.club.length > 0}
      <EquipmentTableComponent equipmentList={weapons.club} header="Clubs" {playerClass} />
    {/if}

    {#if weapons.maul.length > 0}
      <EquipmentTableComponent equipmentList={weapons.maul} header="Mauls" {playerClass} />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'accessories'}
    <h2>Accessory Types</h2>
    <div class="tag-container">
      {#each accessoryButtons as button}
        <button
          class="tag"
          onclick={() => {
            const element = document.getElementById(button.toLowerCase().replace(' ', '-'));
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>{button}</button>
      {/each}
    </div>
    {@const accessories = equipmentList as GroupedAccessories}
    {#if accessories.amulet.length > 0}
      <EquipmentTableComponent equipmentList={accessories.amulet} header="Amulets" {playerClass} />
    {/if}

    {#if accessories.belt.length > 0}
      <EquipmentTableComponent equipmentList={accessories.belt} header="Belts" {playerClass} />
    {/if}

    {#if accessories.baldric.length > 0}
      <EquipmentTableComponent
        equipmentList={accessories.baldric}
        header="Baldrics"
        {playerClass}
      />
    {/if}

    <!-- {#if accessories.backpack.length > 0}
      <EquipmentTableComponent equipmentList={accessories.backpack} header="Backpacks" {playerClass} />
    {/if} -->

    {#if accessories.ring.length > 0}
      <EquipmentTableComponent equipmentList={accessories.ring} header="Rings" {playerClass} />
    {/if}
  {/if}
</section>

{#if showBackToTop}
  <button class="back-to-top" onclick={scrollToTop} aria-label="Back to top">
    <ArrowUp size={24} />
  </button>
{/if}

<style lang="scss">
  .equipment-header {
    color: var(--color-text-accent);
  }

  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    padding: 0;
    border-radius: 50%;
    background-color: var(--color-button-bg);
    border: 1px solid var(--color-text-accent);
    color: var(--color-text-accent);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;

    &:hover {
      background-color: var(--color-button-hover);
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    &:active {
      transform: translateY(-2px);
    }
  }
</style>
