<script lang="ts">
  interface ItemProps {
    name: string;
    description?: string | null;
    descriptionIdentified?: string | null;
    weight?: number | null;
    condition?: number | null;
    buyPrice?: number | null;
    sellPrice?: number | null;
    charges?: number | null;
  }

  let { item }: { item: ItemProps } = $props();
</script>

<header>
  <h1>{item.name}</h1>
  <h3>Description:</h3>
  {#if item.description}
    <p>{item.description}</p>
  {/if}
  <h3>Description (Identified):</h3>
  {#if item.descriptionIdentified}
    {item.descriptionIdentified}
  {/if}
</header>

<section>
  <h2>Item Details</h2>
  <ul class="ul-diamond">
    <li>
      <strong>Weight:</strong>
      {#if item.weight}
        {item.weight}
      {/if}
    </li>
    <li>
      <strong>Condition:</strong>
      {#if item.condition}
        {item.condition}
      {/if}
    </li>
    <li>
      <strong>Buy Price:</strong>
      {#if item.buyPrice}
        {item.buyPrice}
      {/if}
    </li>
    <li>
      <strong>Sell Price:</strong>
      {#if item.sellPrice}
        {item.sellPrice}
      {/if}
    </li>
    {#if item.charges}
      <li>
        <strong>Charges:</strong>
        {item.charges}
      </li>
    {/if}
  </ul>
</section>
