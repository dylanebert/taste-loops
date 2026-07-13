<script lang="ts">
  let { art }: { art: string } = $props();
</script>

<div class="scroll">
  <pre class="ascii">{art}</pre>
</div>

<style>
  .scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .ascii {
    display: inline-block;
    min-width: 100%;
    margin: 0;
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.35;
    font-weight: 400;
    white-space: pre;
    color: var(--text-dim);
    font-variant-ligatures: none;
    tab-size: 4;
  }
</style>
