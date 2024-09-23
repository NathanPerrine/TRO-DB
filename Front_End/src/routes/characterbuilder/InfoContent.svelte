<script lang="ts">
	import { alignmentInfo, pvpInfo, raceClassStats, statInfo } from './characterBuilder';
	import type { Character, Stats } from './characterBuilder';

	export let stat: string;
	export let character: Character;

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

<section>
	<!-- Character Base Info section -->
	{#if stat == 'characterInfo'}
		<div class="info-content">
			<p>
				As
				{#if character.race == 'human' || character.race == 'giant'}a{:else}an{/if}
				<span class="text-emphasis">{character.race} {character.class}</span>, your base attributes
				are set at Strength <span class="text-emphasis">{getBaseStat('strength')}</span>, Dexterity:
				<span class="text-emphasis">{getBaseStat('dexterity')}</span>, Intelligence:
				<span class="text-emphasis">{getBaseStat('intelligence')}</span>, Endurance:
				<span class="text-emphasis">{getBaseStat('endurance')}</span>. Your attribute points may be
				divided in any way among your four base attributes.
			</p>
		</div>

		<!-- Character Stat section -->
	{:else if stat == 'strength' || stat == 'dexterity' || stat == 'intelligence' || stat == 'endurance'}
		<div class="info-content">
			<blockquote class="quote">
				{#if stat == 'strength' || stat == 'dexterity'}A{:else}An{/if}
				{stat} of <span class="text-emphasis">{character[stat]}</span> is considered
				<span class="text-emphasis">{getScoreDescription(character[stat])}</span>.
			</blockquote>

			<p>{statInfo[stat]}</p>
		</div>

		<!-- Character Alignment section -->
	{:else if stat == 'alignment'}
		<div class="info-content">
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

		<!-- Character PvP section -->
	{:else if stat == 'pvp'}
		<div class="info-content">
			<p>
				{#if character.pvp == 'on'}
					{pvpInfo.on}
				{:else if character.pvp == 'off'}
					{pvpInfo.off}
				{/if}
			</p>
		</div>
	{/if}
</section>

<style lang="scss">
	.info-content {
		padding: 10px;
		margin: 8px 0px;
		border-left: 3px solid #6c574a;
		background-color: #fcf8f3;
		font-style: italic;
	}

	.quote {
		font-family: 'Cinzel', serif;
		color: #cc5500;
		text-align: center;
		margin: 10px 0;
		font-weight: bold;
	}
</style>
