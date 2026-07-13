<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    label,
    caption,
    children,
  }: { label?: string; caption?: string; children: Snippet } = $props();
</script>

<figure class="card">
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="body">
    {@render children()}
  </div>
  {#if caption}
    <figcaption class="caption">{caption}</figcaption>
  {/if}
</figure>

<style>
  .card {
    margin: 2.75rem 0;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .label {
    padding: 0.7rem 1.1rem;
    border-bottom: 1px solid var(--border);
    background: rgba(235, 219, 178, 0.015);
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .body {
    padding: 1.5rem 1.1rem;
  }

  .caption {
    padding: 0.75rem 1.1rem;
    border-top: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.72rem;
    line-height: 1.55;
    color: var(--text-dim);
  }
</style>
