<script lang="ts">
  import type { GroupedEquipment } from '$lib';
  import EquipmentTableComponent from './EquipmentTableComponent.svelte';
  export let equipmentList: GroupedEquipment = {};
  export let equipmentType: string;
</script>

<section>
  {#if equipmentType.toLowerCase() === 'armor'}
    <!-- helms -->
    {#if equipmentList['helm'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['helm']} header="Helmets" />
    {/if}
    <!-- cowls -->
    {#if equipmentList['cowl'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['cowl']} header="Cowls" />
    {/if}
    <!-- chests -->
    {#if equipmentList['chest'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['chest']} header="Chests" />
    {/if}
    <!-- robes / skirts -->
    {#if equipmentList['robe'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['robe']} header="Robes" />
    {/if}
    {#if equipmentList['skirt'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['skirt']} header="Skirts" />
    {/if}
    <!-- wrists -->
    {#if equipmentList['wrists'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['wrists']} header="Wrists" />
    {/if}
    <!-- legs -->
    {#if equipmentList['legs'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['legs']} header="Legs" />
    {/if}
    <!-- feets -->
    {#if equipmentList['feet'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['feet']} header="Feet" />
    {/if}
    <!-- shields -->
    {#if equipmentList['shield'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['shield']} header="Shields" />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'weapons'}
    <h1 class="equipment-header">Light Piercing</h1>
    {#if equipmentList['dagger'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['dagger']} header="Daggers" />
    {/if}

    {#if equipmentList['throwing dagger'].length > 0}
      <EquipmentTableComponent
        equipmentList={equipmentList['throwing dagger']}
        header="Throwing Daggers"
      />
    {/if}

    <h1 class="equipment-header">Light One Handed</h1>
    {#if equipmentList['long sword'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['long sword']} header="Long Swords" />
    {/if}

    {#if equipmentList['short sword'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['short sword']} header="Short Swords" />
    {/if}

    {#if equipmentList['fist'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['fist']} header="Fists" />
    {/if}

    <h1 class="equipment-header">Light Two Handed</h1>
    {#if equipmentList['axe'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['axe']} header="Axes" />
    {/if}

    {#if equipmentList['two handed sword'].length > 0}
      <EquipmentTableComponent
        equipmentList={equipmentList['two handed sword']}
        header="Two Handed Swords"
      />
    {/if}

    {#if equipmentList['mace'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['mace']} header="Maces" />
    {/if}

    <h1 class="equipment-header">Heavy Two Handed</h1>
    {#if equipmentList['club'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['club']} header="Clubs" />
    {/if}

    {#if equipmentList['maul'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['maul']} header="Mauls" />
    {/if}
  {/if}

  {#if equipmentType.toLowerCase() === 'accessories'}
    {#if equipmentList['amulet'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['amulet']} header="Amulets" />
    {/if}

    {#if equipmentList['belt'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['belt']} header="Belts" />
    {/if}

    {#if equipmentList['baldric'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['baldric']} header="Baldrics" />
    {/if}

    {#if equipmentList['backpack'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['backpack']} header="Backpacks" />
    {/if}

    {#if equipmentList['ring'].length > 0}
      <EquipmentTableComponent equipmentList={equipmentList['ring']} header="Rings" />
    {/if}
  {/if}
</section>

<style lang="scss">
  .equipment-header {
    color: $color-text-accent;
  }
</style>
