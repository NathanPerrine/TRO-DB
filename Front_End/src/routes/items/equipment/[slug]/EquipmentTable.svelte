<script lang="ts">
  import type { GroupedEquipment } from '$lib';
  import EquipmentTableComponent from './EquipmentTableComponent.svelte';
  export let equipmentList: GroupedEquipment = {};
  export let armorWeapons: string;
</script>

<section>
  {#if armorWeapons.toLowerCase() === 'armor'}
    <!-- helms -->
    {#if equipmentList['helm']}
      <EquipmentTableComponent equipmentList={equipmentList['helm']} header="Helmets" />
    {/if}
    <!-- cowls -->
    {#if equipmentList['cowl']}
      <EquipmentTableComponent equipmentList={equipmentList['cowl']} header="Cowls" />
    {/if}
    <!-- chests -->
    {#if equipmentList['chest']}
      <EquipmentTableComponent equipmentList={equipmentList['chest']} header="Chests" />
    {/if}
    <!-- robes / skirts -->
    {#if equipmentList['robe']}
      <EquipmentTableComponent equipmentList={equipmentList['robe']} header="Robes" />
    {/if}
    {#if equipmentList['skirt']}
      <EquipmentTableComponent equipmentList={equipmentList['skirt']} header="Skirts" />
    {/if}
    <!-- wrists -->
    {#if equipmentList['wrists']}
      <EquipmentTableComponent equipmentList={equipmentList['wrists']} header="Wrists" />
    {/if}
    <!-- legs -->
    {#if equipmentList['legs']}
      <EquipmentTableComponent equipmentList={equipmentList['legs']} header="Legs" />
    {/if}
    <!-- feets -->
    {#if equipmentList['feet']}
      <EquipmentTableComponent equipmentList={equipmentList['feet']} header="Feet" />
    {/if}
    <!-- shields -->
    {#if equipmentList['shield']}
      <EquipmentTableComponent equipmentList={equipmentList['shield']} header="Shields" />
    {/if}
  {/if}

  {#if armorWeapons.toLowerCase() === 'weapons'}
    <h1 class="equipment-header">Light Piercing</h1>
    {#if equipmentList['dagger']}
      <EquipmentTableComponent equipmentList={equipmentList['dagger']} header="Daggers" />
    {/if}

    {#if equipmentList['throwing dagger']}
      <EquipmentTableComponent
        equipmentList={equipmentList['throwing dagger']}
        header="Throwing Daggers"
      />
    {/if}

    <h1 class="equipment-header">Light One Handed</h1>
    {#if equipmentList['long sword']}
      <EquipmentTableComponent equipmentList={equipmentList['long sword']} header="Long Swords" />
    {/if}

    {#if equipmentList['short sword']}
      <EquipmentTableComponent equipmentList={equipmentList['short sword']} header="Short Swords" />
    {/if}

    {#if equipmentList['fist']}
      <EquipmentTableComponent equipmentList={equipmentList['fist']} header="Fists" />
    {/if}

    <h1 class="equipment-header">Light Two Handed</h1>
    {#if equipmentList['axe']}
      <EquipmentTableComponent equipmentList={equipmentList['axe']} header="Axes" />
    {/if}

    {#if equipmentList['two handed sword']}
      <EquipmentTableComponent
        equipmentList={equipmentList['two handed sword']}
        header="Two Handed Swords"
      />
    {/if}

    {#if equipmentList['mace']}
      <EquipmentTableComponent equipmentList={equipmentList['mace']} header="Maces" />
    {/if}

    <h1 class="equipment-header">Heavy Two Handed</h1>
    {#if equipmentList['club']}
      <EquipmentTableComponent equipmentList={equipmentList['club']} header="Clubs" />
    {/if}

    {#if equipmentList['maul']}
      <EquipmentTableComponent equipmentList={equipmentList['maul']} header="Mauls" />
    {/if}
  {/if}
</section>

<style lang="scss">
  .equipment-header {
    color: $color-text-accent;
  }
</style>
