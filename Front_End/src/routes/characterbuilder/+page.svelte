<script lang="ts">
	import { races, classes, alignments, raceClassStats, pvpOptions } from './characterBuilder';
  import type { Character } from './characterBuilder'
	import ImportExport from './ImportExport.svelte';
	import InfoContent from './InfoContent.svelte';
	import StatContainer from './StatContainer.svelte';

	let character: Character = {
		strength: raceClassStats.human.adventurer.strength,
		dexterity: raceClassStats.human.adventurer.dexterity,
		intelligence: raceClassStats.human.adventurer.intelligence,
		endurance: raceClassStats.human.adventurer.endurance,
		race: races[0],
		class: classes[0],
		alignment: alignments[0],
		pvp: pvpOptions[0],
		availablePoints: 8
	};

	function reset() {
		character.strength = raceClassStats.human.adventurer.strength;
		character.dexterity = raceClassStats.human.adventurer.dexterity;
		character.intelligence = raceClassStats.human.adventurer.intelligence;
		character.endurance = raceClassStats.human.adventurer.endurance;
		character.race = races[0];
		character.class = classes[0];
		character.alignment = alignments[0];
		character.pvp = pvpOptions[0];
		character.availablePoints = 8;
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
			<StatContainer stat="class" bind:character />
			<!-- Alignment container -->
			<StatContainer stat="alignment" bind:character />
			<!-- PvP container -->
			<StatContainer stat="pvp" bind:character />
			<!-- Reset Button -->
			<button on:click={reset}>Reset</button>
		</div>

		<div class="info-column">
			<div class="info-container">
				<!-- Race Class Stats -->
				<InfoContent stat="characterInfo" {character} />
				<!-- Strength -->
				<InfoContent stat="strength" {character} />
				<!-- Dexterity -->
				<InfoContent stat="dexterity" {character} />
				<!-- Intelligence -->
				<InfoContent stat="intelligence" {character} />
				<!-- Endurance -->
				<InfoContent stat="endurance" {character} />
				<!-- alignment -->
				<InfoContent stat="alignment" {character} />
				<!-- PvP -->
				<InfoContent stat="pvp" {character} />
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

		.stat-column,
		.export-column {
			display: flex;
			flex-direction: column;
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

		button {
			background-color: #cc5500;
			color: #fdf4df;
			border: 2px solid #6c574a;
			border-radius: 4px;
			padding: 8px 12px;
			font-size: 18px;
			font-weight: normal;
			cursor: pointer;
			transition:
				background-color 0.3s ease,
				transform 0.2s ease;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 16px;

			&:hover {
				transform: scale(1.05);
			}

			&:active {
				transform: scale(0.9);
			}
		}
	}
</style>
