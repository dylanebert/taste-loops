<script lang="ts">
  import FigureCard from "./lib/FigureCard.svelte";
  import AsciiBlock from "./lib/AsciiBlock.svelte";

  const loopArt = `   ┌──────────────┐    propose · ~1s     ┌──────────────┐
   │   proposer   │ ───────────────────▶ │   verifier   │
   │  fast model  │                      │    human     │
   └──────────────┘                      └──────────────┘
          ▲                                      │
          │             accept / reject          │
          └──────────────────────────────────────┘
                        judged in ~200 ms`;

  const fieldArt = `  ·           ·           ·           ·           · · ·       · · ·       ·           ·
        ·           ·           ·           · · · ·     ∘ ∘ ∘ ∘ ∘     · · ·       ·
    ·           ·           ·           · · ·   ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘   · · · ·
·           ·           ·           · · ·   ∘ ∘ ∘ ∘ ∘ • • • • • • • ∘ ∘ ∘ ∘ ∘       ·
      ·           · ·           · · ·     ∘ ∘ ∘ ∘ • • • • • • • • • • • ∘ ∘ ∘ ∘ · · ·
  ·           ·           ·           · ∘ ∘ ∘ ∘ • • • • • ● ● ● • • • • • ∘ ∘ ∘ ∘
          ·           ·           · · · ∘ ∘ ∘ ∘ • • • • ● ● ● ● ● • • • • ∘ ∘ ∘ ∘ · · ·
      ·           ·           ·   ·     ∘ ∘ ∘ ∘ • • • • • ● ● ● • • • • • ∘ ∘ ∘ ∘ ·
·           ·           ·           · · · ∘ ∘ ∘ ∘ • • • • • • • • • • • ∘ ∘ ∘ ∘       ·
        ·           ·           ·   ·       ∘ ∘ ∘ ∘ ∘ • • • • • • • ∘ ∘ ∘ ∘ ∘   · · ·
    ·           ·           ·           · · ·   ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘ ∘   · · ·
          ·           · ·           ·           · · ·   ∘ ∘ ∘ ∘ ∘       · · ·       ·
      ·           ·           ·           ·     ·     · · · ·     · · · ·     · ·`;
</script>

<article class="page">
  <header class="head">
    <div class="meta">concept · agent loops · draft</div>
    <h1 class="title">the taste loop</h1>
    <p class="dek">
      placeholder standfirst. one or two lines that name the idea and set the
      stakes before the reader scrolls. the real line lands in a later stage.
    </p>
  </header>

  <div class="video" id="watch">
    <span class="play" aria-hidden="true">▶</span>
    <span class="video-text">
      <span class="video-label">watch · explainer</span>
      <span class="video-sub">video link lands here</span>
    </span>
  </div>

  <section class="section">
    <h2>the premise</h2>
    <p>
      placeholder body copy. this paragraph proves the reading measure and the
      rhythm the article settles into. sentences run a comfortable length, the
      line height gives them air, and the warm surface keeps the page easy on
      the eye over a long read.
    </p>
    <p>
      a second, shorter block. it exists to show how consecutive paragraphs
      breathe.
    </p>
  </section>

  <section class="section">
    <h2>taste is already here</h2>
    <p>
      placeholder body copy sitting above a figure, so the transition from prose
      into an illustration reads cleanly. the figure below is a thin-bordered
      card: a monospace label at the top, the artwork in the middle, a small
      mono caption underneath.
    </p>

    <FigureCard
      label="fig 01 · the loop"
      caption="placeholder — a fast proposer, a human verifier, and the fold back to the parent. real diagram lands with the draft."
    >
      <AsciiBlock art={loopArt} />
    </FigureCard>

    <p>
      copy resumes after the figure. the vertical spacing around a figure is
      generous on purpose, so an illustration never crowds the text that frames
      it.
    </p>
  </section>

  <section class="section">
    <h2>the verifier stack</h2>
    <p>
      placeholder body copy leading into a second treatment, this one a
      dot-matrix field rather than a line diagram. same card, different
      artwork — the ascii block scrolls sideways on a narrow screen instead of
      breaking the page.
    </p>

    <FigureCard
      label="fig 02 · field"
      caption="placeholder dot-matrix — proposals resolving toward the one the human accepts."
    >
      <AsciiBlock art={fieldArt} />
    </FigureCard>

    <p>
      one more paragraph to close the section and show a run of text after the
      figure. <a href="#watch">an inline link</a> gets the accent treatment so it
      stays legible against the warm ground.
    </p>
  </section>

  <footer class="foot">
    <span class="foot-mark">taste loops</span>
    <span class="foot-meta">placeholder footer · 2026</span>
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
    margin: 0 0 3.5rem;
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
