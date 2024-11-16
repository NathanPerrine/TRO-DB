<script lang="ts">
  let {
    isOpen,
    imageUrl,
    alt,
    onClose
  }: { isOpen: boolean; imageUrl: string; alt: string | undefined; onClose: () => void } = $props();

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };
</script>

{#if isOpen}
  <button class="modal-overlay" onclick={closeModal}>
    <div class="modal-content">
      <img src={imageUrl} {alt} />
    </div>
  </button>
{/if}

<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    &:active,
    &:hover {
      transform: none;
    }
  }

  .modal-content {
    max-width: 90%;
    max-height: 90%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .modal-content img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
</style>
