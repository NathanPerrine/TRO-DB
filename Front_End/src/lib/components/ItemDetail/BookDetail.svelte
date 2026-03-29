<script lang="ts">
  interface BookProps {
    name: string;
    description?: string | null;
    bookType: 'skillbook' | 'spellbook';
    skill?: string;
    skillLevel?: string;
    linkedSpell?: { title: string; slug: { current: string }; spellSchool?: string | null } | null;
    buildPoints?: number | null;
    weight?: number | null;
    condition?: number | null;
    buyPrice?: number | null;
    sellPrice?: number | null;
    dropArea?: { name: string; slug: { current: string }; areaType?: string | null }[];
  }

  let { book }: { book: BookProps } = $props();
</script>

{#if book}
  <h1>{book.name}</h1>
  <p>
    {#if book.description}
      {book.description}
    {/if}
  </p>

  <section>
    <h2>Book Details</h2>
    <ul class="ul-diamond">
      <li>
        <strong>Skill:</strong>
        {book.skill}
      </li>
      <li>
        <strong>Skill Level:</strong>
        {book.skillLevel}
      </li>
      {#if book.bookType === 'spellbook'}
        <li>
          <strong>Taught Spell:</strong>
          {#if book.linkedSpell}
            <a href="/magic/{book.linkedSpell.spellSchool}/{book.linkedSpell.slug.current}">
              {book.linkedSpell.title}
            </a>
          {/if}
        </li>
      {/if}
      {#if book.bookType === 'skillbook'}
        {#if book.buildPoints}
          <li>
            <strong>Build Points</strong>
            {book.buildPoints}
          </li>
        {/if}
      {/if}
      {#if book.weight}
        <li>
          <strong>Weight:</strong>
          {book.weight}
        </li>
      {/if}
      {#if book.condition}
        <li>
          <strong>Condition:</strong>
          {book.condition}
        </li>
      {/if}
      {#if book.buyPrice}
        <li>
          <strong>Buy Price:</strong>
          {#if book.buyPrice === -1}
            Not for sale.
          {:else}
            {book.buyPrice}
          {/if}
        </li>
      {/if}
      {#if book.sellPrice}
        <li>
          <strong>Sell Price:</strong>
          {book.sellPrice}
        </li>
      {/if}
    </ul>
    {#if book.dropArea && book.dropArea.length > 0}
      <h2>Drop Areas</h2>
      <ul class="ul-diamond">
        {#each book.dropArea as area}
          <li>
            <a href="/areas/{area.areaType}/{area.slug.current}">{area.name}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/if}
