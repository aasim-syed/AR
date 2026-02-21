import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger, hoverLift } from "./motion";

const Badge = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    {label}
  </span>
);

const Card = ({ title, desc }) => (
  <motion.div
    className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm"
    {...hoverLift}
  >
    <div className="text-base font-semibold text-white">{title}</div>
    <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
  </motion.div>
);

const CodeBlock = ({ children }) => (
  <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/85">
    <code className="font-mono">{children}</code>
  </pre>
);

const LinkBtn = ({ href, children, variant = "primary" }) => {
  const cls =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${cls}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </motion.a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      {/* background glow */}
      <motion.div
  className="absolute left-1/2 top-[-180px] h-[650px] w-[1250px] -translate-x-1/2 rounded-full
             bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 blur-3xl"
  animate={{ opacity: [0.4, 0.6, 0.4] }}
  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
/>
      <div className="pointer-events-none fixed inset-0 z-10">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute right-[-120px] bottom-[-120px] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
            <span className="font-mono text-sm">AR</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">AgentReplay</div>
            <div className="text-xs text-white/60">Record • Replay • Diff</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#install" className="hover:text-white">Install</a>
          <a href="#roadmap" className="hover:text-white">Roadmap</a>
        </nav>

        <div className="flex items-center gap-2">
          <LinkBtn href="https://github.com/aasim-syed/Repro" variant="secondary">
            GitHub
          </LinkBtn>
          <LinkBtn href="#install">Get started</LinkBtn>
        </div>
      </header>

<motion.section
  className="mx-auto w-full max-w-6xl px-6 pt-10 pb-8"
  variants={fadeUp}
  initial="hidden"
  animate="visible"
>
      {/* hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
<motion.div
  className="flex flex-wrap gap-2"
  variants={stagger}
  initial="hidden"
  animate="visible"
>
  {[ 
    "OSS • MIT",
    "Local-first",
    "Framework-agnostic",
    "v0.2: export/import + strict replay"
  ].map((label) => (
    <motion.div key={label} variants={fadeIn}>
      <Badge label={label} />
    </motion.div>
  ))}
</motion.div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Make agent runs reproducible.
              <span className="block text-white/70">Ship agents with tests.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              AgentReplay records LLM + tool execution into a trace you can replay and diff.
              Turn “it worked yesterday” into a deterministic repro artifact you can share in PRs and CI.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <LinkBtn href="https://github.com/aasim-syed/Repro">View repo</LinkBtn>
              <LinkBtn href="#demo" variant="secondary">See demo</LinkBtn>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">No paid APIs required</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">SQLite default</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">Shareable .areplay</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white">Quick taste</div>
            <div className="mt-3">
              <CodeBlock>{`pip install agentreplay

# record (in your code)
with recorder.run("refund_flow"):
  recorder.llm("planner", input=..., output=...)
  recorder.tool("http.get", input=..., output=...)

# export a repro artifact
agentreplay export <RUN_ID> -o bug.areplay

# import on another machine
agentreplay import bug.areplay

# compare behavior
agentreplay diff <RUN_A> <RUN_B>`}</CodeBlock>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              <Badge label="CI-friendly" />
              <Badge label="First-divergence diff" />
              <Badge label="Strict tool-input replay" />
            </div>
          </div>
        </div>
      </section>

</motion.section>


<motion.section
  id="features"
  className="mx-auto w-full max-w-6xl px-6 py-10"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
      {/* demo */}
      <section id="demo" className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Demo</div>
              <div className="mt-1 text-sm text-white/70">
                Replace this placeholder with a GIF: <span className="font-mono">run → export → import → diff</span>
              </div>
            </div>
            <LinkBtn href="https://github.com/aasim-syed/Repro" variant="secondary">
              Demo instructions
            </LinkBtn>
          </div>

          <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-white/15 bg-black/30 p-10 text-center">
            <div className="max-w-md text-sm text-white/60">
              Drop a <span className="font-mono">demo.gif</span> here later.
              <div className="mt-2 text-xs">
                Tip: use ScreenToGif (Windows) and keep it under ~6–10MB.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-lg font-semibold">Features</div>
            <div className="mt-2 max-w-2xl text-sm text-white/70">
              A small core primitive: store runs + replay tool outputs + diff step-by-step.
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card
            title="Record"
            desc="Capture LLM calls, tool calls, and spans as structured steps. SQLite by default."
          />
          <Card
            title="Replay"
            desc="Reproduce runs by mocking recorded tool outputs. Strict mode validates tool inputs."
          />
          <Card
            title="Diff"
            desc="Compare two runs and pinpoint first divergence (kind/name/input/output/error)."
          />
          <Card
            title=".areplay artifacts"
            desc="Export a run into a single file. Share bug repros across machines and CI."
          />
          <Card
            title="Framework-agnostic"
            desc="Works with LangGraph/LangChain or plain Python. Wrap tools and LLM calls."
          />
          <Card
            title="Redaction hooks"
            desc="Redact common secret fields. Keep traces safe by default."
          />
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">How it works</div>
          <div className="mt-2 text-sm text-white/70">
            Three primitives: <span className="font-mono">Recorder</span>, <span className="font-mono">Store</span>,{" "}
            <span className="font-mono">Replayer</span>.
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-sm font-semibold">1) Instrument</div>
              <div className="mt-2 text-sm text-white/70">Wrap your LLM + tools to emit steps.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-sm font-semibold">2) Persist</div>
              <div className="mt-2 text-sm text-white/70">Store steps in SQLite (or your backend).</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-sm font-semibold">3) Reproduce</div>
              <div className="mt-2 text-sm text-white/70">Replay tool calls, then diff runs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* install */}
      <section id="install" className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-lg font-semibold">Install</div>
            <div className="mt-2 text-sm text-white/70">Editable install for dev; PyPI later.</div>
            <div className="mt-4">
              <CodeBlock>{`# dev
pip install -e ".[dev]"

# run demo
python examples/plain_python_agent.py

# list runs
agentreplay runs list --db agentreplay.db`}</CodeBlock>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Links</div>
            <div className="mt-3 grid gap-2 text-sm">
              <a className="text-white/80 hover:text-white" href="https://github.com/yourname/agentreplay" target="_blank" rel="noreferrer">
                GitHub repo
              </a>
              <a className="text-white/80 hover:text-white" href="https://github.com/yourname/agentreplay/issues" target="_blank" rel="noreferrer">
                Issues
              </a>
              <a className="text-white/80 hover:text-white" href="https://github.com/yourname/agentreplay/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">
                Contributing
              </a>
              <a className="text-white/80 hover:text-white" href="https://github.com/yourname/agentreplay/blob/main/SECURITY.md" target="_blank" rel="noreferrer">
                Security
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* roadmap */}
      <section id="roadmap" className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Roadmap</div>
          <div className="mt-2 text-sm text-white/70">Keep it small and sharp; ship primitives.</div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card
              title="v0.2"
              desc="Export/import (.areplay), strict replay, CI, OSS hygiene."
            />
            <Card
              title="v0.3"
              desc="Golden tests (agentreplay test), richer diff output, JSONL store."
            />
            <Card
              title="v0.4"
              desc="LangGraph/LangChain adapters + OpenTelemetry bridge."
            />
          </div>
        </div>
      </section>

</motion.section>
      {/* footer */}
      <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-white/60">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} AgentReplay • MIT</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="https://github.com/yourname/agentreplay" target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-white" href="#install">Install</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
