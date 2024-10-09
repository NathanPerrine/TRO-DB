<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let expandedSections: { [key: string]: boolean } = {};

  function toggleSection(skill: string) {
    expandedSections[skill] = !expandedSections[skill];
  }
</script>

<main>
  <header>
    <h1>{data.description.name}</h1>
    <p>{data.description.description}</p>
  </header>

  {#if data.description.name == 'Spellbooks'}
    {#each Object.keys(data.books) as skill}
      <h2>
        <button
          class="headerButton"
          class:expanded={expandedSections[skill]}
          on:click={() => toggleSection(skill)}
          aria-expanded={expandedSections[skill]}
        >
          <span>{skill}</span>
          <span class="arrow">▶</span>
        </button>
      </h2>

      {#if expandedSections[skill]}
        {#each Object.keys(data.books[skill]) as skillLevel}
          <h3>{skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</h3>

          <table>
            <thead>
              <tr>
                <th style="width: 25%">Book</th>
                <th>Description</th>
                <th style="width: 15%">Drop Only</th>
              </tr>
            </thead>
            <tbody>
              {#each data.books[skill][skillLevel] as book}
                <tr>
                  <td><a href="{book.bookType}/{book.slug.current}">{book.name}</a></td>
                  <td>{book.description}</td>
                  <td>
                    {#if book.linkedSpell}
                      {#if book.linkedSpell.dropOnly}
                        <span class="check">&#10003</span>
                      {:else}
                        <span class="cross">&#10007</span>
                      {/if}
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/each}
      {/if}
    {/each}
  {:else if data.description.name == 'Skillbooks'}
    {#each Object.keys(data.books) as skill}
      <h2>{skill}</h2>
      {#each Object.keys(data.books[skill]) as skillLevel}
        <ul>
          {#each data.books[skill][skillLevel] as book}
            <li><a href="{book.bookType}/{book.slug.current}">{book.name}</a></li>
          {/each}
        </ul>
      {/each}
    {/each}
  {/if}
</main>

<style lang="scss">
  .headerButton {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;

    display: flex;
    justify-content: start;
    align-items: center;

    .arrow {
      font-size: 16px;
      padding-left: 4px;
      transition: transform 0.3s ease;
      display: block;
    }

    &.expanded .arrow {
      transform: rotate(90deg);
    }
  }
</style>
