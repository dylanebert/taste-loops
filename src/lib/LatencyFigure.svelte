<script lang="ts">
  // Adapted from Inception's Mercury parallel-vs-sequential viz, restated for round count: the fast
  // lane completes a judged proposal every beat (chip appears, the accent pop is the verdict) while
  // the frontier lane's single proposal barely fills before the loop restarts. Timing is
  // illustrative, not literal; the fast lane must look fast, and seconds are never prescribed. The
  // motion carries the claim; the caption is the only explanation. Loops while on-screen (operator
  // direction supersedes play-once-then-still for this figure); reduced motion gets the fully-drawn
  // resting state: fast lane judged, frontier lane partial.

  const chips = [1, 2, 3, 4, 5, 6, 7, 8];
  const beat = 300; // ms per fast proposal, illustrative
  const judgeAt = 0.68; // fraction of the beat when the verdict lands
  const loop = 3600; // full row lands by ~2.6 s, then a brief hold before restart
  const frontierSpan = 25000; // scaled so the frontier bar is only ~14% filled at loop restart

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let elapsed = $state(0);
  let root: HTMLElement;

  $effect(() => {
    if (reduced) return;
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      if (last) elapsed = (elapsed + t - last) % loop;
      last = t;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting) {
          last = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  });

  function chip(i: number): "pending" | "proposing" | "judged" {
    if (reduced) return "judged";
    const t = elapsed - i * beat;
    if (t < 0) return "pending";
    return t < beat * judgeAt ? "proposing" : "judged";
  }

  const fill = $derived(
    reduced ? (chips.length * beat) / frontierSpan : elapsed / frontierSpan,
  );
</script>

<div class="fig" bind:this={root}>
  <div class="lane">
    <div class="head">
      <span class="name">fast proposer</span>
    </div>
    <div class="row">
      {#each chips as v, i (v)}
        <span class="chip {chip(i)}">v{v}</span>
      {/each}
    </div>
  </div>

  <div class="lane">
    <div class="head">
      <span class="name">frontier proposer</span>
    </div>
    <div class="long">
      <span class="fill" style="width:{(fill * 100).toFixed(2)}%"></span>
      <span class="mark">v1</span>
    </div>
  </div>
</div>

<style>
  .fig {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .lane {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-family: var(--mono);
    font-size: 0.68rem;
    letter-spacing: var(--step);
  }

  .name {
    color: var(--text-dim);
  }

  .row {
    display: flex;
    gap: 5px;
  }

  .chip {
    flex: 1;
    min-width: 0;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 3px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    transition:
      opacity 0.15s var(--ease-out),
      background 0.2s var(--ease-out),
      border-color 0.2s var(--ease-out),
      color 0.2s var(--ease-out);
  }

  .chip.pending {
    opacity: 0;
  }

  .chip.judged {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg);
    animation: pop 0.24s var(--ease-out);
  }

  @keyframes pop {
    0% {
      scale: 0.92;
    }
    55% {
      scale: 1.06;
    }
    100% {
      scale: 1;
    }
  }

  .long {
    position: relative;
    height: 2rem;
    border-radius: 3px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    overflow: hidden;
  }

  .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--border-bright);
  }

  .mark {
    position: absolute;
    inset: 0 auto 0 0;
    display: grid;
    place-items: center;
    padding-inline: 0.75rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
  }

  @media (prefers-reduced-motion: reduce) {
    .chip {
      transition: none;
      animation: none;
    }
  }
</style>
