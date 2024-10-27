<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  {#if data.book}

    <h1>{data.book.name}</h1>
    <p>
      {#if data.book.description}
        {data.book.description}
      {:else}
        Coming soon...
      {/if}
    </p>

    <section>
      <h2>Book Details</h2>
      <ul class="ul-diamond">
        <li><strong>Skill:</strong>
          {#if data.book.skill}
            {data.book.skill}
          {/if}
        </li>
        <li><strong>Skill Level:</strong>
          {#if data.book.skillLevel}
            {data.book.skillLevel}
          {/if}
        </li>
        {#if data.book.bookType === 'spellbook'}
          <li><strong>Taught Spell:</strong>
            {#if data.book.linkedSpell}
              <a href="/magic/{data.book.linkedSpell.spellSchool}/{data.book.linkedSpell.slug.current}">
                {data.book.linkedSpell.title}
              </a>
            {/if}
          </li>
        {/if}
        {#if data.book.bookType === 'skillbook'}
          <li><strong>Build Points</strong>
            {data.book.buildPoints}
          </li>
        {/if}
        <li><strong>Weight:</strong>
          {#if data.book.weight}
            {data.book.weight}
          {/if}
        </li>
        <li><strong>Condition:</strong>
          {#if data.book.condition}
            {data.book.condition}
          {/if}
        </li>
        <li><strong>Buy Price:</strong>
          {#if data.book.buyPrice}
            {#if data.book.buyPrice === -1}
              Not for sale.
            {:else}
              {data.book.buyPrice}
            {/if}
          {/if}
        </li>
        <li><strong>Sell Price:</strong>
          {#if data.book.sellPrice}
            {data.book.sellPrice}
          {/if}
        </li>
      </ul>
    </section>
  {/if}
</main>