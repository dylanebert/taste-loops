<script lang="ts">
  import demo from "./assets/demo.mp4";
  import poster from "./assets/poster.webp";

  let playing = $state(false);
</script>

<figure class="card" id="watch">
  <div class="label">demo · shader session</div>

  <div class="frame">
    {#if playing}
      <!-- svelte-ignore a11y_media_has_caption -->
      <video class="media" src={demo} {poster} controls autoplay playsinline
      ></video>
    {:else}
      <button class="facade" onclick={() => (playing = true)}>
        <img
          class="media"
          src={poster}
          alt="a wgsl editor beside a live shader preview, driven by voice"
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        />
        <span class="play" aria-hidden="true">▶</span>
        <span class="sr">play the demo</span>
      </button>
    {/if}
  </div>

  <figcaption class="caption">
    iterating on a wgsl shader by voice, at about a second per round. sound on.
  </figcaption>
</figure>

<style>
  .card {
    width: min(55rem, calc(100vw - 2 * var(--pad)));
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 2.75rem 0;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .label {
    padding: 0.7rem 1.1rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .frame {
    background: var(--surface-2);
  }

  /* height:auto is load-bearing: the width/height attributes map to presentational hints, and a
     definite height would make the browser ignore aspect-ratio. */
  .media {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .facade {
    display: block;
    position: relative;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: grid;
    place-items: center;
    width: 68px;
    height: 68px;
    padding-left: 4px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 1.15rem;
    transition:
      scale 150ms var(--ease-out),
      background 150ms var(--ease-out);
  }

  .facade:hover .play {
    scale: 1.06;
    background: var(--bg);
  }

  .facade:active .play {
    scale: 0.97;
  }

  .caption {
    padding: 0.75rem 1.1rem;
    border-top: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.72rem;
    line-height: 1.55;
    color: var(--text-dim);
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .play {
      transition: none;
    }
  }
</style>
