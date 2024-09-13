<script lang="ts">
	import UnorderedList from '$lib/utils/sanity/UnorderedList.svelte';
  import type { PageData } from './$types';
  import { PortableText } from '@portabletext/svelte';

  export let data: PageData;
  let bulletContext = 'note'
</script>

<main>
  <h1>{data.spell.title}</h1>
  <p>
    {#if data.spell.description}
      {data.spell.description}
    {:else}
      Coming soon...
    {/if}
  </p>

  <h2>Resource Cost & Usage</h2>
  <ul class="ul-diamond">
      <li>MP Cost:
        {#if data.spell.mpCost}
          {data.spell.mpCost}
        {:else}
          TBD
        {/if}
      </li>
      <li>Spell Delay:
        {#if data.spell.spellDelay}
          {data.spell.spellDelay}
        {:else}
          TBD
        {/if}
      </li>
      <li>Duration:
        {#if data.spell.duration}
          {data.spell.duration}
        {:else}
          TBD
        {/if}
      </li>
  </ul>

  <h2>Spell Effects</h2>
  <ul class="ul-diamond">
    <li>Effect:
      {#if data.spell.spellEffect}
        {data.spell.spellEffect}
      {:else}
        TBD
      {/if}
    </li>
    <li>Chant:
      {#if data.spell.chant}
        "{data.spell.chant}"
      {:else}
        TBD
      {/if}
    </li>
    <li>Extendable:
      {#if data.spell.extendable}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
    <li>Enchantable:
      {#if data.spell.enchantable}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
  </ul>

  <h2>Acquisition</h2>
  <ul class="ul-diamond">
    <li>Learned From: <a href="/items/books/spellbooks/spellbook-of-${data.spell.slug.current}">Spellbook of {data.spell.title}</a> </li>
    <li>Drop Only:
      {#if data.spell.dropOnly}
        <span class="check">&#10003</span>
      {:else}
        <span class="cross">&#10007</span>
      {/if}
    </li>
  </ul>

  <h2>Notes</h2>
  {#if data.spell.notes}
    <PortableText
      value={data.spell.notes}
      context={{ bulletContext }}
      components={{
        listItem: {
          normal: UnorderedList
        },
      }}
    />
  {:else}
    <ul class="ul-note">
      <li></li>
    </ul>
  {/if}
</main>