<script lang="ts">
	import type { Character } from "./characterBuilder";

	export let character: Character;

	let code: string = '';
  // $: console.log(character);
	// $: code;

  $: code = JSON.stringify(character)

  function importBuild() {
    character = JSON.parse(code)
  }

  function exportBuild() {
    navigator.clipboard.writeText(code)
  }

</script>

<div>
	<h3>Import / Export</h3>
	<textarea rows="4" bind:value={code}></textarea>
	<div class="button-container tooltip">
		<button class="import-button" on:click={importBuild} >Import</button>
		<button class="export-button" on:click={exportBuild} >
      Export
      <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
    </button>
	</div>
</div>

<style lang="scss">
	textarea {
		background-color: #f9f4eb;
		color: #4a3726;
		border: 2px solid #6c574a;
		border-radius: 4px;
		padding: 10px;
		font-size: 16px;
		line-height: 1.5;
		resize: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		transition: border-color 0.3s ease;

		&:focus {
			border-color: #cc5500;
			outline: none;
			box-shadow: 0 0 10px rgba(204, 85, 0, 0.5);
		}

		&::placeholder {
			color: #9c8b7a;
		}
	}

	.button-container {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
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

		&:hover {
			transform: scale(1.05);
		}

    &:active {
      transform: scale(0.90);
    }
	}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
