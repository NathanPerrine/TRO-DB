<script lang="ts">
  import { alignmentInfo, pvpInfo, statInfo, races, classes, alignments, raceClassStats, type Character, pvpOptions } from "./characterBuilder"

  type Stats = 'strength' | 'dexterity' | 'intelligence' | 'endurance'

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

  function getScoreDescription(score: number) {
    if (score <= 5) {
      return 'Terrible';
    } else if (score <= 8) {
      return 'Poor';
    } else if (score <= 13) {
      return 'Average';
    } else if (score <= 17) {
      return 'good';
    } else if (score <= 21) {
      return 'Excellent';
    } else {
      return 'Fantastic';
    }
  }

  function getBaseStat(stat: Stats) {
    return raceClassStats[character.race][character.class][stat];
  }

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
      <!-- Race Class Stats -->
      <div>
        <p>As
          {#if character.race == 'human' || 'giant'}
            a
          {:else}
            an
          {/if}
          <span class="text-emphasis">{character.race} {character.class}</span>, your base attributes are set at Strength <span class="text-emphasis">{getBaseStat('strength')}</span>, Dexterity: <span class="text-emphasis">{getBaseStat('dexterity')}</span>, Intelligence: <span class="text-emphasis">{getBaseStat('intelligence')}</span>, Endurance: <span class="text-emphasis">{getBaseStat('endurance')}</span>. Your attribute points may be divided in any way among your four base attributes.
        </p>
      </div>
      <!-- Strength -->
      <div>
        <p>A strength of <span class="text-emphasis">{character.strength}</span> is considered <span class="text-emphasis">{getScoreDescription(character.strength)}</span>. {statInfo.strength}</p>
      </div>
      <!-- Dexterity -->
      <div>
        <p>A dexterity of <span class="text-emphasis">{character.dexterity}</span> is considered <span class="text-emphasis">{getScoreDescription(character.dexterity)}</span>. {statInfo.dexterity}</p>
      </div>
      <!-- Intelligence -->
      <div>
        <p>An intelligence of <span class="text-emphasis">{character.intelligence}</span> is considered <span class="text-emphasis">{getScoreDescription(character.intelligence)}</span>. {statInfo.intelligence}</p>
      </div>
      <!-- Endurance -->
      <div>
        <p>An endurance of <span class="text-emphasis">{character.endurance}</span> is considered <span class="text-emphasis">{getScoreDescription(character.endurance)}</span>. {statInfo.endurance}</p>
      </div>
      <!-- alignment -->
      <div>
        <p>
          {#if character.alignment == 'good'}
            {@html alignmentInfo.good}
          {:else if character.alignment == 'neutral'}
            {@html alignmentInfo.neutral}
          {:else if character.alignment == 'evil'}
            {@html alignmentInfo.evil}
          {/if}
        </p>
      </div>
      <!-- PvP -->
      <div>
        <p>
          {#if character.pvp == 'on'}
            {pvpInfo.on}
          {:else if character.pvp == 'off'}
            {pvpInfo.off}
          {/if}
        </p>
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

    .stat-column,
    .info-column,
    .export-column {
      width: 100%;

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

        .sphere{
          height: 50px;
          width: 50px;
          position:relative;
          background-color:lightgray;
          border-radius:50%;
          text-align:center;
          vertical-align:middle;
          line-height: 50px;
          box-shadow: 1px 1px 1px gray,
            inset 0px 0px 10px black;
          }

        .sphere::after{
          background-color: rgba(255,255,255,.5);
          content:'';
          height:50%;
          width: 15%;
          left:18%;
          top:0%;
          position:absolute;
          border-radius:50%;
          transform: rotate(45deg);
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
  }

  :global(.text-emphasis) {
    text-transform: capitalize;
    color: #cc5500;
  }
</style>