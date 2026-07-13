<script lang="ts">
  import FigureCard from "./lib/FigureCard.svelte";
  import AsciiBlock from "./lib/AsciiBlock.svelte";

  const loopCode = `while task:
    result = task
    feedback = verify(result)
    apply(feedback, result)`;

  const latencyArt = `frontier proposer · 30–60 s per round

  propose ████████████████████████████████  judge ▏
  propose ████████████████████████████████  judge ▏
                                you, idle ~99%

fast proposer · ~1 s per round

  propose █ judge ▏ propose █ judge ▏ propose █ judge ▏
                                you, the bottleneck`;
</script>

<article class="page">
  <header class="head">
    <div class="meta">concept · agent loops · draft</div>
    <h1 class="title">taste loops</h1>
    <p class="dek">
      an interactive subagent loop that iterates on human taste at realtime
      latency.
    </p>
  </header>

  <section class="section">
    <h2>verifiability</h2>
    <p>
      The crux of building software is now
      <a href="https://karpathy.bearblog.dev/verifiability/">verifiability</a>.
      It has become easy to generate code. The challenge now is knowing whether
      it's the code you want.
    </p>
  </section>

  <section class="section">
    <h2>loops</h2>
    <p>
      Recent discussions around agentic workflows have framed development
      around a simple loop:
    </p>

    <div class="code">
      <AsciiBlock art={loopCode} />
    </div>

    <p>
      A salient example of this is the recent
      <a href="https://bun.com/blog/bun-in-rust">bun rust rewrite</a>. This is
      a strong positive example of verifiability. This rewrite relied on
      several types of automated verification, including:
    </p>
    <ol>
      <li>Rust typechecking</li>
      <li>The bun test suite</li>
      <li>Adversarial review</li>
    </ol>
    <p>
      Verification is the bottleneck of development speed. This workflow
      demonstrates that by speeding up and automating verification,
      development can be sped up drastically.
    </p>
    <p>However, not everything can be verifiable.</p>
  </section>

  <section class="section">
    <h2>taste</h2>
    <p>
      Taste is the canonical unverifiable task. It's not an objective metric,
      but an entirely personal point of view. It's not absent, either — in the
      case of the bun rewrite, taste was primarily frontloaded in the way the
      loop was set up, how it was directed, and what decisions were made.
    </p>
    <p>
      However, many tasks require rapid iteration on taste. It can't be
      specified upfront — it needs to be produced, then iterated on, in a tight
      loop. Some examples of this include UI design, shader programming, and
      video editing. It's not impossible to iterate on taste in an agentic
      workflow — it's just very slow. Slow to an extent that sends you back to
      editing software.
    </p>

    <FigureCard
      label="fig 01 · latency"
      caption="a human judges in ~200 ms and proposes nothing; cycle time belongs to the proposer."
    >
      <AsciiBlock art={latencyArt} />
    </FigureCard>
  </section>

  <section class="section">
    <h2>taste loops</h2>
    <p>
      A taste loop is an
      <a href="https://www.inceptionlabs.ai/blog/rise-of-realtime-subagents"
        >interactive subagent</a
      > loop that iterates on human taste at realtime latency.
    </p>
    <p>
      In modern agentic workflows, a main agent often orchestrates subagents
      to execute tasks, run verifiers, and orchestrate the outer loop. With
      taste loops, the main agent spawns a live session and hands it off to an
      ultra-fast subagent, such as
      <a href="https://www.inceptionlabs.ai/blog/introducing-mercury-2"
        >Mercury 2</a
      >. This may be text or spoken conversation, and can incorporate UI or
      visualization (more on that later). Let's look at an example.
    </p>

    <div class="video" id="watch">
      <span class="play" aria-hidden="true">▶</span>
      <span class="video-text">
        <span class="video-label">watch · the demo</span>
        <span class="video-sub">video link lands here</span>
      </span>
    </div>

    <p>
      Here, a Claude Fable 5 agent spawns an interactive shader editing
      session. I then iterate on it quickly with voice speaking to Mercury 2.
      When finished, it returns the context back to the parent agent.
    </p>
  </section>

  <section class="section">
    <h2>conclusion</h2>
    <p>
      Iterating on taste is at the frontier of agentic workflows, and is an
      open area of work. Closely related is
      <a
        href="https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/"
        >Generative UI</a
      >, where UI is spun up by an agent to allow human input that suits the
      task. This complements taste loops, working particularly well in
      constrained scenarios where the expression space maps neatly to
      established UI paradigms.
    </p>
    <p>
      Taste loops, on the other hand, are only constrained by the intelligence
      of interaction-speed models, which are a
      <a href="https://www.inceptionlabs.ai/blog/introducing-mercury-edit-2"
        >rapidly moving frontier</a
      >. I'm excited to see where this leads.
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

  .code {
    margin: 0 0 1.1rem;
    padding: 1rem 1.25rem;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
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

  .section ol {
    color: var(--text-dim);
    margin: 0 0 1.1rem;
    padding-left: 1.5rem;
  }

  .section ol li {
    margin-bottom: 0.35rem;
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
