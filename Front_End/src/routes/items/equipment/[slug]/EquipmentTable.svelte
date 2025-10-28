<script lang="ts">
  import type {
    GroupedArmor,
    GroupedWeapons,
    GroupedAccessories
  } from '$lib/schemas/equipment.server';
  import type { PlayerClassType } from './types';
  import EquipmentTableComponent from './EquipmentTableComponent.svelte';

  let {
    equipmentList,
    equipmentType,
    playerClass = null
  }: {
    equipmentList: GroupedArmor | GroupedWeapons | GroupedAccessories;
    equipmentType: string;
    playerClass?: PlayerClassType;
  } = $props();
</script>

<section>
  {#if equipmentType.toLowerCase() === 'armor'}
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
    {@const weapons = equipmentList as GroupedWeapons}
    <h1 class="equipment-header">Light Piercing</h1>
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

    <h1 class="equipment-header">Light One Handed</h1>
    {#if weapons['long sword'].length > 0}
      <EquipmentTableComponent equipmentList={weapons['long sword']} header="Long Swords" {playerClass} />
    {/if}

    {#if weapons['short sword'].length > 0}
      <EquipmentTableComponent equipmentList={weapons['short sword']} header="Short Swords" {playerClass} />
    {/if}

    {#if weapons.fist.length > 0}
      <EquipmentTableComponent equipmentList={weapons.fist} header="Fists" {playerClass} />
    {/if}

    <h1 class="equipment-header">Light Two Handed</h1>
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

    <h1 class="equipment-header">Heavy Two Handed</h1>
    {#if weapons.club.length > 0}
      <EquipmentTableComponent equipmentList={weapons.club} header="Clubs" {playerClass} />
    {/if}

    {#if weapons.maul.length > 0}
      <EquipmentTableComponent equipmentList={weapons.maul} header="Mauls" {playerClass} />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'accessories'}
    {@const accessories = equipmentList as GroupedAccessories}
    {#if accessories.amulet.length > 0}
      <EquipmentTableComponent equipmentList={accessories.amulet} header="Amulets" {playerClass} />
    {/if}

    {#if accessories.belt.length > 0}
      <EquipmentTableComponent equipmentList={accessories.belt} header="Belts" {playerClass} />
    {/if}

    {#if accessories.baldric.length > 0}
      <EquipmentTableComponent equipmentList={accessories.baldric} header="Baldrics" {playerClass} />
    {/if}

    <!-- {#if accessories.backpack.length > 0}
      <EquipmentTableComponent equipmentList={accessories.backpack} header="Backpacks" {playerClass} />
    {/if} -->

    {#if accessories.ring.length > 0}
      <EquipmentTableComponent equipmentList={accessories.ring} header="Rings" {playerClass} />
    {/if}
  {/if}
</section>

<style lang="scss">
  .equipment-header {
    color: var(--color-text-accent);
  }
</style>
