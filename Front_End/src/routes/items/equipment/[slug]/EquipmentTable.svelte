<script lang="ts">
  import type { GroupedEquipment } from '$lib';
  import type { PlayerClassType } from './types';
  import EquipmentTableComponent from './EquipmentTableComponent.svelte';

  let {
    equipmentList = {},
    equipmentType,
    playerClass = null
  }: {
    equipmentList?: GroupedEquipment;
    equipmentType: string;
    playerClass?: PlayerClassType;
  } = $props();
</script>

<section>
  {#if equipmentType.toLowerCase() === 'armor'}
    <!-- helms -->
    {#if equipmentList['helm'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['helm']} header="Helmets" {playerClass} />
    {/if}
    <!-- cowls -->
    {#if equipmentList['cowl'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['cowl']} header="Cowls" {playerClass} />
    {/if}
    <!-- chests -->
    {#if equipmentList['chest'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['chest']} header="Chests" {playerClass} />
    {/if}
    <!-- robes / skirts -->
    {#if equipmentList['robe'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['robe']} header="Robes" {playerClass} />
    {/if}
    {#if equipmentList['skirt'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['skirt']} header="Skirts" {playerClass} />
    {/if}
    <!-- wrists -->
    {#if equipmentList['wrists'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['wrists']} header="Wrists" {playerClass} />
    {/if}
    <!-- legs -->
    {#if equipmentList['legs'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['legs']} header="Legs" {playerClass} />
    {/if}
    <!-- feets -->
    {#if equipmentList['feet'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['feet']} header="Feet" {playerClass} />
    {/if}
    <!-- shields -->
    {#if equipmentList['shield'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['shield']} header="Shields" {playerClass} />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'weapons'}
    <h1 class="equipment-header">Light Piercing</h1>
    {#if equipmentList['dagger'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['dagger']} header="Daggers" {playerClass} />
    {/if}

    {#if equipmentList['throwing dagger'].length > 0}
      <EquipmentTableComponent
        equipmentList={equipmentList['throwing dagger']}
        header="Throwing Daggers"
        {playerClass}
      />
    {/if}

    <h1 class="equipment-header">Light One Handed</h1>
    {#if equipmentList['long sword'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['long sword']} header="Long Swords" {playerClass} />
    {/if}

    {#if equipmentList['short sword'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['short sword']} header="Short Swords" {playerClass} />
    {/if}

    {#if equipmentList['fist'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['fist']} header="Fists" {playerClass} />
    {/if}

    <h1 class="equipment-header">Light Two Handed</h1>
    {#if equipmentList['axe'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['axe']} header="Axes" {playerClass} />
    {/if}

    {#if equipmentList['two handed sword'].length > 0}
      <EquipmentTableComponent
        equipmentList={equipmentList['two handed sword']}
        header="Two Handed Swords"
        {playerClass}
      />
    {/if}

    {#if equipmentList['mace'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['mace']} header="Maces" {playerClass} />
    {/if}

    <h1 class="equipment-header">Heavy Two Handed</h1>
    {#if equipmentList['club'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['club']} header="Clubs" {playerClass} />
    {/if}

    {#if equipmentList['maul'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['maul']} header="Mauls" {playerClass} />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'accessories'}
    {#if equipmentList['amulet'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['amulet']} header="Amulets" {playerClass} />
    {/if}

    {#if equipmentList['belt'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['belt']} header="Belts" {playerClass} />
    {/if}

    {#if equipmentList['baldric'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['baldric']} header="Baldrics" {playerClass} />
    {/if}

    {#if equipmentList['backpack'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['backpack']} header="Backpacks" {playerClass} />
    {/if}

    {#if equipmentList['ring'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['ring']} header="Rings" {playerClass} />
    {/if}
  {/if}
</section>

<style lang="scss">
  .equipment-header {
    color: var(--color-text-accent);
  }
</style>
