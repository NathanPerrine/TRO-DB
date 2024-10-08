<script lang="ts">
	import { races, classes, alignments, raceClassStats, pvpOptions } from './characterBuilder';
	import type { Character } from './characterBuilder';
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

	let activeTab = 'statInfo';
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
			<div class="tabs">
				<button
					class="tab-button"
					class:active={activeTab === 'statInfo'}
					on:click={() => (activeTab = 'statInfo')}>Stat Info</button
				>
				<button
					class="tab-button"
					class:active={activeTab === 'classInfo'}
					on:click={() => (activeTab = 'classInfo')}>Class Info</button
				>
				<button
					class="tab-button"
					class:active={activeTab === 'saveLoad'}
					on:click={() => (activeTab = 'saveLoad')}>Save / Load</button
				>
			</div>
			<div class="info-container" class:hidden={activeTab !== 'statInfo'}>
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
			<div class="skill-container" class:hidden={activeTab !== 'classInfo'}>
				<InfoContent stat="class" {character} />
			</div>
			<div class="saveLoad-container" class:hidden={activeTab !== 'saveLoad'}>
				<ImportExport bind:character />
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.builder-container {
		display: flex;
		justify-content: space-between;
		width: 100%;

		.stat-column {
			flex-grow: 1;
			flex-basis: 0;
		}

		.stat-column {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.info-column {
			position: relative;
			flex-grow: 3;
			flex-basis: 0;

			background-color: $color-background;

			border: 2px solid $color-border;
			padding: 20px;
			margin: 20px 0;
			height: 80vh;
			// max-width: 900px;
			z-index: 1;

			font-family: 'IM Fell English', serif;
			font-size: 1.2rem;
			line-height: 1.8;

			box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

			.info-container,
			.skill-container {
				height: 100%;
				overflow: auto;
			}
		}
	}

	.tabs {
		position: absolute;
		top: -45px;
		left: 10px;
		display: flex;
		gap: 8px;
		z-index: -1;

		.tab-button {
			border: 2px solid $color-border;
			border-bottom: none;
			border-radius: 4px 4px 0 0;
			padding: 10px 20px;
			font-size: 14px;
			cursor: pointer;
			transition:
				background-color 0.3s ease,
				transform 0.2s ease;
			position: relative;
			text-wrap: nowrap;
			width: 110px;
			height: 40px;
      margin-top: 16px;

			&:not(.active) {
				&::after {
					content: '';
					position: absolute;
					width: 104%;
					right: -2px;
					height: 40%;
					background: $color-background;
					top: 73%;
				}
			}

			/* Active tab */
			&.active {
				font-weight: bold;
				transform: scale(1.05);
			}

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.hidden {
		display: none;
	}
</style>
