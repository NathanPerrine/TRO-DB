<script lang="ts">
  import { alignmentInfo, pvpInfo, statInfo, races, classes, alignments, raceClassStats, type Character, type Stats, pvpOptions } from "./characterBuilder"
	import InfoContent from "./InfoContent.svelte";



  let character: Character = {
    strength: raceClassStats.human.adventurer.strength,
    dexterity: raceClassStats.human.adventurer.dexterity,
    intelligence: raceClassStats.human.adventurer.intelligence,
    endurance: raceClassStats.human.adventurer.endurance,
    race: races[0],
    class: classes[0],
    alignment: alignments[0],
    pvp: pvpOptions[0],
  }

  let availablePoints = 8
  $: availablePoints

  function updateStat(stat: Stats, amount: number) {
    if (availablePoints > 0 && amount > 0) {
      availablePoints -= amount;
      character[stat] += amount;
    } else if (amount < 0) {
      if (character[stat] > raceClassStats[character.race][character.class][stat]){
        availablePoints -= amount;
        character[stat] += amount;
      }
    }
  }

  function updateStats() {
    character.strength = raceClassStats[character.race][character.class].strength
    character.dexterity = raceClassStats[character.race][character.class].dexterity
    character.intelligence = raceClassStats[character.race][character.class].intelligence
    character.endurance = raceClassStats[character.race][character.class].endurance
    availablePoints = 8
  }

  const changeSelection = (attribute: 'race' | 'class' | 'alignment' | 'pvp', direction: number) => {
    if (attribute === 'race') {
      // character.race = (character.race + direction + races.length) % races.length;
      character.race = (races[(races.indexOf(character.race) + direction + races.length) % races.length ]);
      updateStats()
    } else if (attribute === 'class') {
      character.class = (classes[(classes.indexOf(character.class) + direction + classes.length) % classes.length ]);
      updateStats()
    } else if (attribute === 'alignment') {
      character.alignment = (alignments[(alignments.indexOf(character.alignment) + direction + alignments.length) % alignments.length ]);
    } else if (attribute === 'pvp') {
      character.pvp = (pvpOptions[(pvpOptions.indexOf(character.pvp) + direction + pvpOptions.length) % pvpOptions.length ]);
    }
  };



</script>

<main>
  <div class="builder-container">
    <div class="stat-column">
      <!-- Strength container -->
      <div class="stat-container">
        <h3 class="stat">Strength</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => updateStat('strength', -1)}>-</button>
          <div class="sphere stat-value">{ character.strength }</div>
          <button class="stat-plus" on:click={() => updateStat('strength', 1)}>+</button>
        </div>
      </div>
      <!-- Dexterity container -->
      <div class="stat-container">
        <h3 class="stat">Dexterity</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => updateStat('dexterity', -1)}>-</button>
          <div class="sphere stat-value">{ character.dexterity }</div>
          <button class="stat-plus" on:click={() => updateStat('dexterity', 1)}>+</button>
        </div>
      </div>
      <!-- Intelligence container -->
      <div class="stat-container">
        <h3 class="stat">Intelligence</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => updateStat('intelligence', -1)}>-</button>
          <div class="sphere stat-value">{ character.intelligence }</div>
          <button class="stat-plus" on:click={() => updateStat('intelligence', 1)}>+</button>
        </div>
      </div>
      <!-- Endurance container -->
      <div class="stat-container">
        <h3 class="stat">Endurance</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => updateStat('endurance', -1)}>-</button>
          <div class="sphere stat-value">{ character.endurance }</div>
          <button class="stat-plus" on:click={() => updateStat('endurance', 1)}>+</button>
        </div>
      </div>
      <!-- Available Points container -->
      <div class="stat-container">
        <h3 class="stat">Available Points</h3>
        <div class="stat-selectors">
          <div class="sphere stat-value">{ availablePoints }</div>
        </div>
      </div>
      <!-- Race container -->
      <div class="stat-container">
        <h3 class="stat">Race</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => changeSelection('race', -1)}>&lt;</button>
          <div class="stat-value text-md">{ character.race.charAt(0).toUpperCase() + character.race.slice(1) }</div>
          <button class="stat-plus" on:click={() => changeSelection('race', 1)}>&gt;</button>
        </div>
      </div>
      <!-- Class container -->
      <div class="stat-container">
        <h3 class="stat">Class</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => changeSelection('class', -1)}>&lt;</button>
          <div class="stat-value text-md">{ character.class.charAt(0).toUpperCase() + character.class.slice(1) }</div>
          <button class="stat-plus" on:click={() => changeSelection('class', 1)}>&gt;</button>
        </div>
      </div>
      <!-- Alignment container -->
      <div class="stat-container">
        <h3 class="stat">Alignment</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => changeSelection('alignment', -1)}>&lt;</button>
          <div class="stat-value text-md">{ character.alignment.charAt(0).toUpperCase() + character.alignment.slice(1) }</div>
          <button class="stat-plus" on:click={() => changeSelection('alignment', 1)}>&gt;</button>
        </div>
      </div>
      <!-- PvP container -->
      <div class="stat-container">
        <h3 class="stat">PvP</h3>
        <div class="stat-selectors">
          <button class="stat-minus" on:click={() => changeSelection('pvp', -1)}>&lt;</button>
          <div class="stat-value text-md">{ character.pvp.charAt(0).toUpperCase() + character.pvp.slice(1) }</div>
          <button class="stat-plus" on:click={() => changeSelection('pvp', 1)}>&gt;</button>
        </div>
      </div>
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

    .stat-column,{
      .stat-container {
        display: flex;
        flex-direction: column;
        width: 175px;

        .stat {
          display: flex;
          justify-content: center;
        }

        .stat-selectors {
          width: 175px;
          margin-top: 8px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .stat-value {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
          font-size: 24px;
        }

        .text-md {
          font-size: 18px;
        }

        .sphere {
          height: 50px;
          width: 50px;
          position: relative;
          background-color: lightgray;
          border-radius: 50%;
          text-align: center;
          vertical-align: middle;
          line-height: 50px;
          box-shadow: 1px 1px 1px gray, inset 0px 0px 10px black;

          &::after {
            background-color: rgba(255, 255, 255, 0.5);
            content: '';
            height: 50%;
            width: 15%;
            left: 18%;
            top: 0%;
            position: absolute;
            border-radius: 50%;
            transform: rotate(45deg);
          }
        }

        .stat-minus,
        .stat-plus {
          width: 24px;
          height: 24px;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    :global(.text-emphasis) {
      text-transform: capitalize;
      color: #cc5500;
    }
  }
</style>