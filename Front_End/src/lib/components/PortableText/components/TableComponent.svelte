<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { portableTextComponents } from '../index';
  import type { PortableTextBlock } from '@portabletext/types';

  type TableRow = {
    cells: { content: PortableTextBlock[] | string }[];
  };

  type TableValue = {
    rows: TableRow[];
  };

  let { portableText } = $props<{
    portableText: {
      value: TableValue;
    };
  }>();

  const table = portableText.value;

  // Helper to check if content is portable text blocks
  function isPortableText(content: PortableTextBlock[] | string): content is PortableTextBlock[] {
    return Array.isArray(content);
  }
</script>

<div class="table-wrapper">
  <table>
    <tbody>
      {#each table.rows as row}
        <tr>
          {#each row.cells as cell}
            <td>
              {#if isPortableText(cell.content)}
                <PortableText value={cell.content} components={portableTextComponents} />
              {:else}
                {#each cell.content?.split('\n') || [] as line}
                  {line}<br />
                {/each}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .table-wrapper {
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    min-width: 400px;

    tbody tr {
      border-bottom: 1px solid var(--color-border);

      &:last-child {
        border-bottom: none;
      }

      &:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    td {
      padding: 0.75rem 1rem;
      vertical-align: top;
      color: var(--color-text);
      border-right: 1px solid var(--color-border);

      &:last-child {
        border-right: none;
      }

      br:last-child {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    .table-wrapper {
      margin: 1rem -1rem;
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    table {
      font-size: 0.875rem;
      min-width: 300px;

      td {
        padding: 0.5rem 0.75rem;
      }
    }
  }
</style>
