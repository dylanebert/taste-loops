<script lang="ts">
  import demo from "./assets/demo.mp4";
  import poster from "./assets/poster.webp";

  let playing = $state(false);
</script>

<figure class="card" id="watch">
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
    margin: 2rem 0;
  }

  .frame {
    background: var(--surface-2);
    border-radius: var(--radius);
    overflow: hidden;
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
    width: 52px;
    height: 52px;
    padding-left: 3px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.9rem;
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
    margin-top: 0.7rem;
    font-family: var(--mono);
    font-size: 0.7rem;
    line-height: 1.55;
    color: var(--text-muted);
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
