<script lang="ts">
  import { alignmentInfo, pvpInfo, statInfo, races, classes, alignments, raceClassStats, type Character, type Stats, pvpOptions } from "./characterBuilder"
	import ImportExport from "./ImportExport.svelte";
	import InfoContent from "./InfoContent.svelte";
	import StatContainer from "./StatContainer.svelte";



  let character: Character = {
    strength: raceClassStats.human.adventurer.strength,
    dexterity: raceClassStats.human.adventurer.dexterity,
    intelligence: raceClassStats.human.adventurer.intelligence,
    endurance: raceClassStats.human.adventurer.endurance,
    race: races[0],
    class: classes[0],
    alignment: alignments[0],
    pvp: pvpOptions[0],
    availablePoints: 8,
  }





</script>

<main>
  <div class="builder-container">
    <div class="stat-column">
      <!-- Strength container -->
      <StatContainer stat="strength" bind:character />
      <!-- Dexterity container -->
      <StatContainer stat="dexterity" bind:character />
      <!-- Intelligence container -->
      <StatContainer stat="intelligence" bind:character />
      <!-- Endurance container -->
      <StatContainer stat="endurance" bind:character />
      <!-- Available Points container -->
      <StatContainer stat="availablePoints" bind:character />
      <!-- Race container -->
      <StatContainer stat="race" bind:character />
      <!-- Class container -->
      <StatContainer stat="class" bind:character/>
      <!-- Alignment container -->
      <StatContainer stat="alignment" bind:character />
      <!-- PvP container -->
      <StatContainer stat="pvp" bind:character />
    </div>

    <div class="info-column">
      <div class="info-container">
        <!-- Race Class Stats -->
        <InfoContent stat="characterInfo" character={character} />
        <!-- Strength -->
        <InfoContent stat="strength" character={character} />
        <!-- Dexterity -->
        <InfoContent stat="dexterity" character={character} />
        <!-- Intelligence -->
        <InfoContent stat="intelligence" character={character} />
        <!-- Endurance -->
        <InfoContent stat="endurance" character={character} />
        <!-- alignment -->
        <InfoContent stat="alignment" character={character} />
        <!-- PvP -->
        <InfoContent stat="pvp" character={character} />
    </div>
    </div>

    <div class="export-column">
      <ImportExport bind:character />
    </div>
  </div>
</main>

<style lang="scss">
  .builder-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .stat-column,
    .export-column {
      flex-grow: 1;
      flex-basis: 0;
    }

    .export-column {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info-column {
      position: relative;
      flex-grow: 3;
      flex-basis: 0;

      background-color: #f9f4eb;

      border: 2px solid #6c574a;
      padding: 20px;
      margin: 20px 0;
      height: 75vh;


      font-family: 'IM Fell English', serif;
      font-size: 1.2rem;
      color: #4a3726;
      line-height: 1.8;

      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

      .info-container {
        height: 100%;
        overflow: auto;
      }
    }

    :global(.text-emphasis) {
      text-transform: capitalize;
      color: #cc5500;
    }
  }
</style>