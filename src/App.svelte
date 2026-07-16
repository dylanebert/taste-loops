<script lang="ts">
  import AsciiBlock from "./lib/AsciiBlock.svelte";
  import LatencyFigure from "./lib/LatencyFigure.svelte";
  import VideoDemo from "./lib/VideoDemo.svelte";

  const loopCode = `while (todos.length) {
  const result = attempt(todos.pop())
  const feedback = await Promise.all(reviews(result))
  await apply(feedback, result)
}`;

  const shaderPrompt = `start a taste loop to iterate on this shader:

@fragment
fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {
  let c = 0.5 + 0.5 * cos(uv.xyx + vec3f(0.0, 2.0, 4.0));
  return vec4f(c, 1.0);
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
      The shape is propose, then verify: <code>attempt</code> proposes a
      change, <code>reviews</code> judge it.
    </p>
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
  </section>

  <section class="section">
    <h2>taste loops</h2>
    <p>
      A taste loop is a
      <a href="https://www.inceptionlabs.ai/blog/rise-of-realtime-subagents"
        >realtime subagent</a
      > loop that iterates on human taste.
    </p>
    <p>
      In modern agentic workflows, a main agent drives the outer loop,
      orchestrating subagents to execute tasks and run verifiers. In a taste
      loop, the main agent spawns a live session and hands it to an ultra-fast
      subagent, such as
      <a href="https://www.inceptionlabs.ai/blog/introducing-mercury-2"
        >Mercury 2</a
      >. The verifier is you.
    </p>

    <div class="latency">
      <LatencyFigure />
    </div>

    <p>
      The proposer answers in about a second; a full round, with speech,
      compile, and render, is still a few seconds, but the proposer is no
      longer what you wait on.
    </p>
    <p>
      The session may be text or spoken conversation, and can incorporate UI
      or visualization. Let's look at an example.
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

  <section class="section addendum">
    <h2>addendum: setup</h2>
    <p>
      You can run a taste loop in your own harness.
      <a href="https://www.npmjs.com/package/tasteloop">tasteloop</a> is an MCP
      server that gives your agent one tool: spawn a live session over a piece
      of text, hand it to you, fold the result back. It doesn't know what the
      text is: a shader, a palette, a paragraph, a config. Your agent writes
      the artifact and a brief, then calls <code>taste_session</code>.
    </p>

    <p>Add it to Claude Code:</p>

    <div class="cmd">
      <code>claude mcp add tasteloop -- npx -y tasteloop</code>
    </div>

    <p>
      The first spawn opens a browser and asks for an Inception
      <a href="https://platform.inceptionlabs.ai/dashboard/api-keys">API key</a
      >; new accounts get 10M free tokens. Paste it once. It's stored on your
      machine, never placed in the page. After that the session is a plain
      chat. The agent's context arrives as the opening message, each
      instruction you type diffuses a full redraft of the artifact in place,
      and closing the tab hands the result back.
    </p>

    <p>Then just ask. Give Claude the artifact and let it spawn the loop:</p>

    <div class="cmd">
      <code>{shaderPrompt}</code>
    </div>

    <p>
      It works on prose too. "start a taste loop on this paragraph" hands you
      the text to reshape by eye. That one's a placeholder while the loop is
      chat-only, but it's the same motion.
    </p>

    <p>
      Two honest limits. A plain chat is where it is now, not where it's going;
      real workflows are the intent. And the loop isn't closed: no compiler, no
      automated verifier, no heal step. You're the verifier, which is the point
      of the piece. The key form is the auth for now, and becomes standard MCP
      auth once Inception ships OAuth.
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

  .section p code {
    font-family: var(--mono);
    font-size: 0.82em;
    color: var(--text-mid);
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.1em 0.35em;
  }

  .aside {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .addendum {
    border-top: 1px solid var(--border);
    padding-top: 3.5rem;
    margin-bottom: 0;
  }

  .cmd {
    margin: 0 0 1.1rem;
    padding: 1rem 1.25rem;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow-x: auto;
  }

  .cmd code {
    font-family: var(--mono);
    font-size: 0.82rem;
    line-height: 1.5;
    color: var(--text-mid);
    white-space: pre;
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
