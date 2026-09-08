import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Self-terminating full-page capture. Build the site, serve `dist`, screenshot desktop + mobile,
// exit. Never leaves a dev server or browser open. Display-gated: the capture runs headed on this
// seat's session, so a run with no display is refused rather than passed.

const repo = join(import.meta.dir, "..");

/** true if a display this seat can open a headed browser on is reachable. */
function detectDisplay(): boolean {
  if (process.platform !== "linux") return true;
  return !!(process.env.DISPLAY || process.env.WAYLAND_DISPLAY);
}

if (!detectDisplay()) {
  console.error(
    "shot: FAIL — the capture runs headed and found neither DISPLAY nor WAYLAND_DISPLAY",
  );
  process.exit(2);
}

function run(cmd: string[], cwd: string): void {
  const r = Bun.spawnSync(cmd, { cwd, stdout: "inherit", stderr: "inherit" });
  if (r.exitCode !== 0) {
    console.error(`shot: '${cmd.join(" ")}' failed (exit ${r.exitCode})`);
    process.exit(1);
  }
}

const capturePkg = JSON.stringify(
  { name: "taste-loops-capture", private: true, dependencies: { "@playwright/test": "^1.50.0" } },
  null,
  2,
);

console.log("shot: building…");
run(["bun", "run", "build"], repo);

const shots = join(repo, "shots");
mkdirSync(shots, { recursive: true });

// Stage dist + the capture spec into a stable work dir. node_modules and the installed browser
// are left in place across runs — refreshing only dist + the spec keeps reruns fast.
function prepWork(workDir: string): void {
  mkdirSync(workDir, { recursive: true });
  cpSync(join(import.meta.dir, "capture.spec.ts"), join(workDir, "capture.spec.ts"));
  cpSync(join(import.meta.dir, "playwright.config.ts"), join(workDir, "playwright.config.ts"));
  writeFileSync(join(workDir, "package.json"), capturePkg);
  rmSync(join(workDir, "dist"), { recursive: true, force: true });
  cpSync(join(repo, "dist"), join(workDir, "dist"), { recursive: true });
  rmSync(join(workDir, "desktop.png"), { force: true });
  rmSync(join(workDir, "mobile.png"), { force: true });
}

function collect(workDir: string): void {
  for (const name of ["desktop.png", "mobile.png"]) {
    const src = join(workDir, name);
    if (!existsSync(src)) {
      console.error(`shot: expected ${name} was not produced`);
      process.exit(1);
    }
    cpSync(src, join(shots, name));
  }
}

const work = join(tmpdir(), "taste-loops-shot");
prepWork(work);
run(["bun", "install", "--silent"], work);
run(["bunx", "playwright", "install", "chromium"], work);
run(["bunx", "playwright", "test", "--config", "playwright.config.ts"], work);
collect(work);

console.log(`shot: wrote ${join(shots, "desktop.png")}`);
console.log(`shot: wrote ${join(shots, "mobile.png")}`);
