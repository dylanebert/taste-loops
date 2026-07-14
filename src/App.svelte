<script lang="ts">
  import AsciiBlock from "./lib/AsciiBlock.svelte";
  import LatencyFigure from "./lib/LatencyFigure.svelte";
  import VideoDemo from "./lib/VideoDemo.svelte";

  const loopCode = `while (todos.length) {
  const result = attempt(todos.pop())
  const feedback = await Promise.all(reviews(result))
  await apply(feedback, result)
}`;
</script>

<article class="page">
  <header class="head">
    <div class="meta">
      <a class="byline" href="https://dylanebert.com">dylan ebert</a>
      <span class="sep">·</span> july 2026
    </div>
    <h1 class="title">taste loops</h1>
    <p class="dek">realtime subagents for taste.</p>
  </header>

  <section class="section">
    <h2>verifiability</h2>
    <p>
      The crux of building software is now
      <a href="https://karpathy.bearblog.dev/verifiability/">verifiability</a>.
      It has become easy to generate code. The hard part is knowing whether
      it's the code you want.
    </p>
    <p class="aside">
      check out the
      <a href="https://youtube.com/shorts/vkAt-KS6I_U">fast video version</a>.
    </p>
  </section>

  <section class="section">
    <h2>loops</h2>
    <p>
      Agentic workflows answer this with a simple loop:
    </p>

    <div class="code">
      <AsciiBlock art={loopCode} />
    </div>

    <p>
      The clearest recent example is the
      <a href="https://bun.com/blog/bun-in-rust">bun rust rewrite</a>, which
      relied on three kinds of automated verification:
    </p>
    <ol>
      <li>Rust typechecking</li>
      <li>The bun test suite</li>
      <li>Adversarial review</li>
    </ol>
    <p>
      Verification is the bottleneck of development speed. The rewrite shows
      what happens when it's automated: development speeds up drastically.
    </p>
    <p>But not everything is verifiable.</p>
  </section>

  <section class="section">
    <h2>taste</h2>
    <p>
      Taste is the canonical unverifiable task. There's no objective metric,
      only a personal point of view. That doesn't make it absent: in the bun
      rewrite, taste was frontloaded into how the loop was set up, how it was
      directed, and what decisions were made.
    </p>
    <p>
      Many tasks, though, require rapid iteration on taste. It can't be
      specified upfront; it has to be produced, then reacted to, in a tight
      loop. UI design, shader programming, video editing. You can already
      iterate on taste in an agentic workflow. It's just very slow. Slow
      enough to send you back to editing software.
    </p>

    <div class="latency">
      <LatencyFigure />
    </div>

    <p>
      The proposer answers in about a second; a full round, with speech,
      compile, and render, is still a few seconds, but the proposer is no
      longer what you wait on.
    </p>
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
      In modern agentic workflows, a main agent drives the outer loop,
      orchestrating subagents to execute tasks and run verifiers. In a taste
      loop, the main agent spawns a live session and hands it to an ultra-fast
      subagent, such as
      <a href="https://www.inceptionlabs.ai/blog/introducing-mercury-2"
        >Mercury 2</a
      >. The verifier is you. The session may be text or spoken conversation,
      and can incorporate UI or visualization. Let's look at an example.
    </p>

    <VideoDemo />

    <p>
      Here, a Claude Fable 5 agent spawns an interactive shader editing
      session. I iterate on it quickly by voice, talking to Mercury 2. When
      I'm done, the session folds back into the parent agent's context.
    </p>
    <p class="aside">
      try it yourself in the <a href="/taste-loops/demo/">live demo</a>. bring
      your own Inception key, runs in your browser, needs Chrome with WebGPU.
    </p>
  </section>

  <section class="section">
    <h2>conclusion</h2>
    <p>
      Iterating on taste is an open problem in agentic workflows. Closely
      related is
      <a
        href="https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/"
        >Generative UI</a
      >, where an agent spins up UI shaped to the human input a task needs.
      This complements taste loops, working particularly well in constrained
      scenarios where the expression space maps neatly to established UI
      paradigms.
    </p>
    <p>
      Taste loops, on the other hand, are constrained only by the intelligence
      of interaction-speed models, which are a
      <a href="https://www.inceptionlabs.ai/blog/introducing-mercury-edit-2"
        >rapidly moving frontier</a
      >. I'm excited to see where this leads.
    </p>
  </section>
</article>

<style>
  .page {
    width: 100%;
    max-width: var(--measure);
    margin-inline: auto;
    padding: clamp(3rem, 9vw, 6rem) var(--pad) 5rem;
  }

  .head {
    margin-bottom: 3.5rem;
  }

  .meta {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: var(--step);
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .byline {
    color: var(--accent);
  }

  .sep {
    color: var(--border-bright);
  }

  .title {
    font-family: var(--display);
    font-weight: 500;
    font-size: clamp(2.35rem, 6vw, 3.25rem);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--ink);
  }

  .dek {
    font-family: var(--display);
    font-weight: 400;
    margin-top: 0.9rem;
    max-width: 34rem;
    font-size: 1.3rem;
    line-height: 1.4;
    color: var(--text-muted);
  }

  .latency {
    margin: 2.25rem 0;
  }

  .code {
    margin: 0 0 1.1rem;
    padding: 1rem 1.25rem;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .section {
    margin-bottom: 3.5rem;
  }

  .section h2 {
    font-family: var(--display);
    font-weight: 500;
    font-size: clamp(1.5rem, 3.2vw, 1.8rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 1.15rem;
  }

  .section p {
    color: var(--text-dim);
    margin-bottom: 1.1rem;
  }

  .section p:last-child {
    margin-bottom: 0;
  }

  .aside {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .section ol {
    color: var(--text-dim);
    margin: 0 0 1.1rem;
    padding-left: 1.5rem;
  }

  .section ol li {
    margin-bottom: 0.35rem;
  }
</style>
