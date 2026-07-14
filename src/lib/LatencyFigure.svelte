<script lang="ts">
  // Two schematic lanes contrast where a taste loop spends its time. A lane's grey bands are the
  // proposer; the accent ticks are the human judging (~200 ms, flat in both regimes). Slow
  // proposer: one long band, one lonely tick, the human idle. Fast proposer: many short bands, the
  // human tick now the recurring beat. Motion reveals each lane on scroll, then stills; the
  // resting state is fully drawn, so reduced-motion and screenshots carry the whole claim.

  const cycles = [0, 1, 2, 3, 4, 5];
  const step = 140; // ms between fast cycles
  const seg = 90; // ms band grow before its tick pops

  let armed = $state(false);
  let play = $state(false);
  let root: HTMLElement;

  $effect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    armed = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play = true;
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  });
</script>

<div class="fig" class:armed class:play bind:this={root}>
  <div class="lane">
    <div class="head">
      <span class="name">frontier proposer</span>
      <span class="time">30–60 s / proposal</span>
    </div>
    <div class="track solo">
      <div class="band" style="transition-duration:1.4s"></div>
      <div class="tick" style="transition-delay:1.4s"></div>
    </div>
    <div class="foot">you wait ~99% of the cycle</div>
  </div>

  <div class="lane">
    <div class="head">
      <span class="name">fast proposer</span>
      <span class="time">~1 s / proposal</span>
    </div>
    <div class="track">
      {#each cycles as c (c)}
        <div class="cycle">
          <div class="band" style="transition-delay:{c * step}ms"></div>
          <div class="tick" style="transition-delay:{c * step + seg}ms"></div>
        </div>
      {/each}
    </div>
    <div class="foot">you set the pace</div>
  </div>

  <div class="legend">
    <span class="key"><i class="sw band-sw"></i>proposer</span>
    <span class="key"><i class="sw tick-sw"></i>you · judge ~200 ms</span>
  </div>
</div>

<style>
  .fig {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .lane {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
  }

  .name {
    color: var(--text-dim);
  }

  .time {
    color: var(--text-muted);
  }

  .track {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 30px;
  }

  .cycle {
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
  }

  /* the frontier lane is one band + one tick; the band eats the whole width */
  .track.solo .band {
    flex: 1;
  }

  .band {
    height: 11px;
    flex: 1;
    min-width: 0;
    border-radius: 2px;
    background: var(--text-muted);
    transform: scaleX(1);
    transform-origin: left center;
    transition: transform 0.16s var(--ease-out);
  }

  .tick {
    width: 5px;
    height: 26px;
    flex: none;
    border-radius: 2px;
    background: var(--accent);
    transform: scaleY(1);
    transform-origin: bottom center;
    opacity: 1;
    transition:
      transform 0.24s var(--ease-out),
      opacity 0.24s var(--ease-out);
  }

  .foot {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: var(--step);
    color: var(--text-muted);
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.4rem;
    margin-top: 0.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.68rem;
    letter-spacing: var(--step);
    color: var(--text-muted);
  }

  .key {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .sw {
    display: inline-block;
    border-radius: 1px;
  }

  .band-sw {
    width: 14px;
    height: 8px;
    background: var(--text-muted);
  }

  .tick-sw {
    width: 5px;
    height: 14px;
    background: var(--accent);
  }

  /* Armed = the pre-roll empty state, set on mount only when motion is allowed. Snapping to empty
     is instant (no transition); play then animates empty -> full and settles at the resting state. */
  .fig.armed:not(.play) .band,
  .fig.armed:not(.play) .tick {
    transition: none;
  }

  .fig.armed .band {
    transform: scaleX(0);
  }

  .fig.armed .tick {
    transform: scaleY(0);
    opacity: 0;
  }

  .fig.armed.play .band {
    transform: scaleX(1);
  }

  .fig.armed.play .tick {
    transform: scaleY(1);
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .band {
      transform: scaleX(1) !important;
    }
    .tick {
      transform: scaleY(1) !important;
      opacity: 1 !important;
    }
    .band,
    .tick {
      transition: none !important;
    }
  }
</style>
