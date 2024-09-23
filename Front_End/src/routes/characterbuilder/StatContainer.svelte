<script lang="ts">
	import {
		alignments,
		classes,
		pvpOptions,
		raceClassStats,
		races,
		type Character
	} from './characterBuilder';

	export let stat: string;
	export let character: Character;

	function updateStat(amount: number) {
		if (
			stat == 'strength' ||
			stat == 'dexterity' ||
			stat == 'intelligence' ||
			stat == 'endurance'
		) {
			if (character.availablePoints > 0 && amount > 0) {
				character.availablePoints -= amount;
				character[stat] += amount;
			} else if (amount < 0) {
				if (character[stat] > raceClassStats[character.race][character.class][stat]) {
					character.availablePoints -= amount;
					character[stat] += amount;
				}
			}
		}
	}

	function updateStats() {
		character.strength = raceClassStats[character.race][character.class].strength;
		character.dexterity = raceClassStats[character.race][character.class].dexterity;
		character.intelligence = raceClassStats[character.race][character.class].intelligence;
		character.endurance = raceClassStats[character.race][character.class].endurance;
		character.availablePoints = 8;
	}

	const changeSelection = (
		attribute: 'race' | 'class' | 'alignment' | 'pvp',
		direction: number
	) => {
		if (attribute === 'race') {
			character.race =
				races[(races.indexOf(character.race) + direction + races.length) % races.length];
			updateStats();
		} else if (attribute === 'class') {
			character.class =
				classes[(classes.indexOf(character.class) + direction + classes.length) % classes.length];
			updateStats();
		} else if (attribute === 'alignment') {
			character.alignment =
				alignments[
					(alignments.indexOf(character.alignment) + direction + alignments.length) %
						alignments.length
				];
		} else if (attribute === 'pvp') {
			character.pvp =
				pvpOptions[
					(pvpOptions.indexOf(character.pvp) + direction + pvpOptions.length) % pvpOptions.length
				];
		}
	};
</script>

{#if stat == 'strength' || stat == 'dexterity' || stat == 'intelligence' || stat == 'endurance'}
	<div class="stat-container">
		<h3 class="stat capitalize">{stat}</h3>
		<div class="stat-selectors">
			<button class="stat-minus" on:click={() => updateStat(-1)}></button>
			<div class="sphere stat-value">{character[stat]}</div>
			<button class="stat-plus" on:click={() => updateStat(1)}></button>
		</div>
	</div>
{:else if stat == 'availablePoints'}
	<div class="stat-container">
		<h3 class="stat">Available Points</h3>
		<div class="stat-selectors">
			<div class="sphere stat-value">{character.availablePoints}</div>
		</div>
	</div>
{:else if stat == 'race' || stat == 'class' || stat == 'alignment' || stat == 'pvp'}
	<div class="stat-container">
		<h3 class="stat capitalize">{stat}</h3>
		<div class="stat-selectors">
			<button class="stat-minus arrow-left" on:click={() => changeSelection(stat, -1)}></button>
			<div class="stat-value capitalize text-md">
				{character[stat]}
			</div>
			<button class="stat-plus arrow-right" on:click={() => changeSelection(stat, 1)}></button>
		</div>
	</div>
{/if}

<style lang="scss">
	button {
		background-color: #cc5500;
		color: #fdf4df;
		border: 2px solid #6c574a;
		border-radius: 4px;
		padding: 8px 12px;
		font-size: 18px;
		font-weight: normal;
		cursor: pointer;
		transition: background-color 0.3s ease, transform 0.2s ease;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			transform: scale(1.05);
		}

		&:before {
			content: '-';
		}

		&.stat-plus:before {
			content: '+';
		}

		&.arrow-left:before {
			content: '←';
		}

		&.arrow-right:before {
			content: '→';
		}
	}

	.capitalize {
		text-transform: capitalize;
	}

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
			background-color: #e28e51;
			color: white;
			border-radius: 50%;
			text-align: center;
			line-height: 50px;
			box-shadow: 1px 1px 1px gray, inset 0px 0px 10px black;
			position: relative;

			&::after {
				background-color: #d3b79b;
				content: '';
				height: 50%;
				width: 15%;
				left: 18%;
				top: 0;
				position: absolute;
				border-radius: 50%;
				transform: rotate(45deg);
			}
		}

		.stat-minus,
		.stat-plus {
			width: 24px;
			height: 24px;
		}
	}
</style>
