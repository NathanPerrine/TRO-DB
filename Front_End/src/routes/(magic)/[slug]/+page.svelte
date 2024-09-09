<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main>
  <h1>Light Dart</h1>
  <p>Conjure a small, radiant dart of pure light, hurling it towards an enemy to deal minor magical damage.</p>

  <h2>Resource Cost & Usage</h2>
  <ul class="ul-diamond">
      <li>MP Cost: 10</li>
      <li>Spell Delay: Short</li>
      <li>Duration: Instant</li>
  </ul>

  <h2>Spell Effects</h2>
  <ul class="ul-diamond">
    <li>Effect: Light damage to a single target.</li>
    <li>Chant: "Ahn Ilani!"</li>
    <li>Extendable:
      {#if true}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
    <li>Enchantable:
      {#if true}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
  </ul>

  <h2>Acquisition</h2>
  <ul class="ul-diamond">
    <li>Learned From: <a href="#">Spellbook of Light Dart</a> </li>
    <li>Drop Only:
      {#if false}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
  </ul>

  <h2>Notes</h2>
  <ul class="ul-note">
      <li></li>
  </ul>
</main>