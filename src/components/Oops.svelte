<script>
    export let title = '';
    export let msg = '';
</script>

{#if title && msg}
    <div class="bg-ceilGray flex flex-col justify-center align-center">
        <h2 class="error-title text-amoure">{title}</h2>
        <div class="error-message text-white readex-thin opacity-80">
            {msg}
            <img src="/images/youtube-error.png" width="90" height="85" alt="Youtube icon error" />
        </div>
    </div>
{/if}

<style>
  .error-title {
    text-align: center;
    font-size: calc(1.5em + 1vw);
    line-height: 2;
  }
  .error-message {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-size: calc(0.75em + .5vw);
    margin-bottom: 1em;
  }
</style>
