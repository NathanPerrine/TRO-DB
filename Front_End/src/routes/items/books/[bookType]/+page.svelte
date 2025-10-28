<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/PageHeader/PageHeader.svelte';

  let { data }: { data: PageData } = $props();

  let expandedSections = $state<{ [key: string]: boolean }>({});

  function toggleSection(skill: string) {
    expandedSections[skill] = !expandedSections[skill];
  }
</script>

<main>
  <PageHeader description={data.description} />

  {#if data.description.name === 'Spellbooks'}
    {#each Object.keys(data.books) as skill}
      <h2>
        <button
          class="header-button"
          class:expanded={expandedSections[skill]}
          onclick={() => toggleSection(skill)}
          aria-expanded={expandedSections[skill]}
        >
          <span>{skill}</span>
          <span class="arrow">▶</span>
        </button>
      </h2>

      {#if expandedSections[skill]}
        {#each Object.entries(data.books[skill]) as [skillLevel, books]}
          <h3>{skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th style="width: 25%">Book</th>
                  <th>Description</th>
                  <th style="width: 15%">Drop Only</th>
                </tr>
              </thead>
              <tbody>
                {#each books as book}
                  <tr>
                    <td><a href="{book.bookType}/{book.slug.current}">{book.name}</a></td>
                    <td class="wrap">{book.description}</td>
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
          </div>
        {/each}
      {/if}
    {/each}
  {:else if data.description.name === 'Skillbooks'}
    {#each Object.keys(data.books) as skill}
      <h2>{skill}</h2>
      {#each Object.entries(data.books[skill]) as [skillLevel, books]}
        <ul>
          {#each books as book}
            <li><a href="{book.bookType}/{book.slug.current}">{book.name}</a></li>
          {/each}
        </ul>
      {/each}
    {/each}
  {/if}
</main>
