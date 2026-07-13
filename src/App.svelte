<script lang="ts">
  import FigureCard from "./lib/FigureCard.svelte";
  import AsciiBlock from "./lib/AsciiBlock.svelte";

  const verifierArt = `┌─────────────┬──────────────────────┐
│ benchmarks  │  did it get slower?  │
│ tests       │  does it behave?     │
│ types       │  does it fit?        │
│ compilers   │  does it build?      │
└─────────────┴──────────────────────┘
        cheap · fast · automatic`;

  const latencyArt = `frontier proposer · 30–60 s per round

  propose ████████████████████████████████  judge ▏
  propose ████████████████████████████████  judge ▏
                                you, idle ~99%

fast proposer · ~1 s per round

  propose █ judge ▏ propose █ judge ▏ propose █ judge ▏
                                you, the bottleneck`;

  const loopArt = `parent agent
   │ spawn · annotated starter + brief
   ▼
fast model ─── propose · ~1 s ──▶ compile gate
    ▲                                  │ ok
    │  accept / reject                 ▼
    └───────────────────────────── human eye
                                    ~200 ms
                                       │ close
                                       ▼
                          folds back to the parent`;
</script>

<article class="page">
  <header class="head">
    <div class="meta">concept · agent loops · draft</div>
    <h1 class="title">taste loops</h1>
    <p class="dek">
      an agent loop whose terminal verifier is a human, at interactive latency.
    </p>
  </header>

  <section class="section">
    <h2>verifiability</h2>
    <p>
      Karpathy has a rule for predicting AI progress: the more
      <a href="https://karpathy.bearblog.dev/verifiability/">verifiable</a> a
      task, the more automatable it is. Verifiable means the task resets
      cleanly, retries cheaply, and scores unambiguously. A proof checks. A
      test suite runs. That one property explains the jagged frontier better
      than difficulty does: agents race ahead at math and code while
      easier-looking work lags, because nothing can score it.
    </p>
  </section>

  <section class="section">
    <h2>loops</h2>
    <p>
      The frontier of agentic coding runs on one shape: generate, then verify.
      A model proposes a change, a verifier judges it, accepted work compounds,
      and the loop repeats without you. What sits in the verifier slot is the
      whole design question. Compilers catch what won't build. Types catch what
      won't fit. Tests catch what won't behave. Benchmarks catch what got
      slower.
    </p>

    <FigureCard
      label="fig 01 · verifiers"
      caption="the machine verifier stack: each rung scores automatically, so the loop runs without you."
    >
      <AsciiBlock art={verifierArt} />
    </FigureCard>

    <p>
      The sharpest demonstration is the
      <a href="https://bun.com/blog/bun-in-rust">Bun rewrite</a>: about a
      million lines of Zig ported to Rust in eleven days, one engineer,
      parallel agent loops closing on a conformance suite. Everything in that
      system is arranged to make the work verifiable, because verifiable work
      is what loops can be trusted with.
    </p>
  </section>

  <section class="section">
    <h2>taste</h2>
    <p>
      Taste is the canonical unverifiable task. Does this look right, does it
      feel good: no machine scores that, because the objective can't be written
      down. Taste stays human.
    </p>
    <p>
      In work like the Bun rewrite, the taste lives mostly in the preparation:
      the porting rules, the reviewer design, the choice of which failures to
      tolerate. Judgment applied up front, so the loops could run for days
      without asking. At the far end there's Rick Rubin, whose entire
      contribution is taste.
    </p>
    <p>
      But some domains can't take their taste up front. Video editing, shader
      work, game feel: you don't know what right is until a candidate is in
      front of you, and then you know in a glance, and that glance fires
      hundreds of times in a working session. You can iterate on this with an
      agent today, by discussing it. Describe, wait half a minute, look,
      redirect. It works. It's also far too slow, and convergence dies of
      impatience.
    </p>

    <FigureCard
      label="fig 02 · latency"
      caption="a human verifier judges in ~200 ms and proposes nothing; cycle time belongs to the proposer."
    >
      <AsciiBlock art={latencyArt} />
    </FigureCard>
  </section>

  <section class="section">
    <h2>taste loops</h2>
    <p>
      A taste loop is an agent loop whose terminal verifier is a human, at
      interactive latency.
    </p>
    <p>
      The machinery is an interaction-speed subagent. Inception describes the
      machine-facing version in
      <a href="https://www.inceptionlabs.ai/blog/rise-of-realtime-subagents"
        >the rise of real-time subagents</a
      >: fast diffusion models taking the high-frequency substages inside a
      frontier agent's workflow. A taste loop is the same architecture with a
      person in the substage.
    </p>
    <p>
      It runs like this. The parent agent authors the premise, an annotated
      starter and a brief (the same move as Bun's porting rules), spawns a live
      session, and hands off to a fast model. You direct in plain language and
      judge each proposal on sight; a compile gate filters broken candidates
      before they ever reach you. When you close the session, the result folds
      back into the parent's context and the outer work continues.
    </p>

    <FigureCard
      label="fig 03 · the loop"
      caption="the parent authors the premise, a fast model proposes, you verify at the terminal rung."
    >
      <AsciiBlock art={loopArt} />
    </FigureCard>

    <p>
      The latency is derived, not chosen. You judge in about 200 ms and propose
      nothing, so the cycle belongs entirely to the proposer. At 30–60 s per
      proposal you're waiting, not working. At ~1 s the bottleneck is you
      again. And since the session runs at conversation speed, voice fits
      naturally: say the nudge instead of typing it.
    </p>
  </section>

  <section class="section">
    <h2>in practice</h2>
    <p>
      I run this today for shader work. Mid-task, I ask Claude for a scene; it
      writes an annotated WGSL starter and a brief, spawns a live canvas, and
      Mercury applies my edits at about a second each. "more molten." "slower."
      "less orange." Ten rounds inside a minute, spoken aloud, watching the
      real thing change. Close the tab and Claude carries on with what I
      converged to.
    </p>

    <div class="video" id="watch">
      <span class="play" aria-hidden="true">▶</span>
      <span class="video-text">
        <span class="video-label">watch · the demo</span>
        <span class="video-sub">video link lands here</span>
      </span>
    </div>

    <p>
      The setup was two sentences: I told Claude to build the integration, and
      hooked up the Mercury API key. The rest is pattern, and any fast model
      with any judged-by-eye surface fits it.
    </p>
  </section>

  <section class="section">
    <h2>related work</h2>
    <p>
      Generative UI comes at the same problem from the other side.
      <a
        href="https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/"
        >Google's version</a
      > designs a custom interface for every prompt: instead of proposing candidates
      for your eye, the agent grows the controls themselves, sliders and toggles
      and views purpose-built for the decision in front of you. A narrower expression
      space, instant once rendered. A taste loop hands you a proposer; generative
      UI hands you knobs. Both sit at the frontier of iterating on taste inside
      agentic workflows.
    </p>
  </section>

  <section class="section">
    <h2>the frontier of taste</h2>
    <p>
      Verifiable work automates first. That frontier has been moving for years,
      and everything behind it compounds without us. What's ahead of it was
      never untouchable; it just couldn't be iterated at the speed taste
      demands.
    </p>
    <p>
      Human-in-the-loop made you a checkpoint inside the machine's loop. A
      taste loop turns it inside out: the machine proposes inside yours, at the
      speed you can look.
    </p>
  </section>

  <footer class="foot">
    <span class="foot-mark">taste loops</span>
    <span class="foot-meta">dylan ebert · 2026</span>
  </footer>
</article>

<style>
  .page {
    width: 100%;
    max-width: var(--measure);
    margin-inline: auto;
    padding: clamp(3rem, 9vw, 6rem) var(--pad) 5rem;
  }

  .head {
    margin-bottom: 3.25rem;
  }

  .meta {
    font-family: var(--mono);
    font-size: 0.74rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.4rem;
  }

  .title {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(2.6rem, 7vw, 4rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  .dek {
    margin-top: 1.4rem;
    max-width: 34rem;
    font-size: 1.18rem;
    line-height: 1.55;
    color: var(--text-dim);
  }

  .video {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 0 1.1rem;
    padding: 1.1rem 1.25rem;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
  }

  .video:hover {
    border-color: var(--border-bright);
  }

  .play {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.85rem;
    padding-left: 3px;
  }

  .video-text {
    display: flex;
    flex-direction: column;
    line-height: 1.35;
  }

  .video-label {
    font-family: var(--mono);
    font-size: 0.76rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
    color: var(--text);
  }

  .video-sub {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .section {
    margin-bottom: 3.25rem;
  }

  .section h2 {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(1.5rem, 3.4vw, 1.95rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 1.1rem;
  }

  .section p {
    color: var(--text-dim);
    margin-bottom: 1.1rem;
  }

  .section p:last-child {
    margin-bottom: 0;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 4.5rem;
    padding-top: 1.6rem;
    border-top: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.74rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
  }

  .foot-mark {
    color: var(--accent);
  }

  .foot-meta {
    color: var(--text-muted);
  }
</style>
