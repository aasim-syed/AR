import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeIn, stagger, hoverLift } from "./motion";

const Badge = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    {label}
  </span>
);

const Card = ({ title, desc }) => (
  <motion.div
    className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur"
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
      target={href?.startsWith("#") ? undefined : "_blank"}
      rel={href?.startsWith("#") ? undefined : "noreferrer"}
    >
      {children}
    </motion.a>
  );
};

const Section = ({ id, title, subtitle, children }) => (
  <div id={id} className="mx-auto w-full max-w-6xl px-6 py-10">
    <div className="flex items-end justify-between gap-6">
      <div>
        {title ? <div className="text-lg font-semibold">{title}</div> : null}
        {subtitle ? <div className="mt-2 max-w-2xl text-sm text-white/70">{subtitle}</div> : null}
      </div>
    </div>
    <div className="mt-6">{children}</div>
  </div>
);

export default function App() {
  const reduce = useReducedMotion();

  const heroBadges = [
    "OSS • MIT",
    "Local-first",
    "Framework-agnostic",
    "v0.2: export/import + strict replay",
  ];

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      {/* Background glow (BEHIND content) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-180px] h-[650px] w-[1250px] -translate-x-1/2 rounded-full
                     bg-gradient-to-r from-cyan-500/55 via-purple-500/55 to-pink-500/55 blur-3xl"
          animate={reduce ? undefined : { opacity: [0.35, 0.55, 0.35] }}
          transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-[-220px] top-[120px] h-[520px] w-[520px] rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute right-[-240px] bottom-[-220px] h-[620px] w-[620px] rounded-full bg-cyan-500/25 blur-3xl" />
      </div>

      {/* Content (ABOVE glow) */}
      <div className="relative z-10">
        {/* Header */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
              <span className="font-mono text-sm">AR</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">AgentReplayx</div>
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
            <LinkBtn href="https://github.com/aasim-syed/Repro" variant="secondary">GitHub</LinkBtn>
            <LinkBtn href="#install">Get started</LinkBtn>
          </div>
        </header>

        {/* Hero */}
        <motion.div
          className="mx-auto w-full max-w-6xl px-6 pt-10 pb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {heroBadges.map((label) => (
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
                AgentReplayx records LLM + tool execution into a trace you can replay and diff.
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

            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="text-sm font-semibold text-white">Quick taste</div>
              <div className="mt-3">
                <CodeBlock>{`pip install agentreplayx

# record (in your code)
with recorder.run("refund_flow"):
  recorder.llm("planner", input=..., output=...)
  recorder.tool("http.get", input=..., output=...)

# export a repro artifact
agentreplayx export <RUN_ID> -o bug.areplay

# import on another machine
agentreplayx import bug.areplay

# compare behavior
agentreplayx diff <RUN_A> <RUN_B>`}</CodeBlock>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                <Badge label="CI-friendly" />
                <Badge label="First-divergence diff" />
                <Badge label="Strict tool-input replay" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Demo (scroll reveal) */}
        <motion.div
          id="demo"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Section
            title="Demo"
            subtitle={
              <>
                Replace this placeholder with a GIF:{" "}
                <span className="font-mono">run → export → import → diff</span>
              </>
            }
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-white/70">Make a 10–15s GIF with ScreenToGif.</div>
                <LinkBtn href="https://github.com/aasim-syed/Repro" variant="secondary">
                  Demo instructions
                </LinkBtn>
              </div>

              <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-white/15 bg-black/30 p-10 text-center">
                <div className="max-w-md text-sm text-white/60">
                  Drop a <span className="font-mono">demo.gif</span> here later.
                  <div className="mt-2 text-xs">Keep it under ~6–10MB.</div>
                </div>
              </div>
            </div>
          </Section>
        </motion.div>

        {/* Features */}
        <motion.div
          id="features"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Section
            title="Features"
            subtitle="A small core primitive: store runs + replay tool outputs + diff step-by-step."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card title="Record" desc="Capture LLM calls, tool calls, and spans as structured steps. SQLite by default." />
              <Card title="Replay" desc="Reproduce runs by mocking recorded tool outputs. Strict mode validates tool inputs." />
              <Card title="Diff" desc="Compare two runs and pinpoint first divergence (kind/name/input/output/error)." />
              <Card title=".areplay artifacts" desc="Export a run into a single file. Share bug repros across machines and CI." />
              <Card title="Framework-agnostic" desc="Works with LangGraph/LangChain or plain Python. Wrap tools and LLM calls." />
              <Card title="Redaction hooks" desc="Redact common secret fields. Keep traces safe by default." />
            </div>
          </Section>
        </motion.div>

        {/* How it works */}
        <motion.div
          id="how"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Section
            title="How it works"
            subtitle={
              <>
                Three primitives: <span className="font-mono">Recorder</span>,{" "}
                <span className="font-mono">Store</span>, <span className="font-mono">Replayer</span>.
              </>
            }
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid gap-4 md:grid-cols-3">
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
          </Section>
        </motion.div>

        {/* Install */}
        <motion.div
          id="install"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Section title="Install" subtitle="Editable install for dev; PyPI later.">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <CodeBlock>{`# dev
pip install agentreplayx

# run demo
python examples/plain_python_agent.py

# list runs
agentreplayx runs list --db agentreplay.db

`}</CodeBlock>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-lg font-semibold">Links</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <a className="text-white/80 hover:text-white" href="https://github.com/aasim-syed/Repro" target="_blank" rel="noreferrer">
                    GitHub repo
                  </a>
                  <a className="text-white/80 hover:text-white" href="https://github.com/aasim-syed/Repro/issues" target="_blank" rel="noreferrer">
                    Issues
                  </a>
                </div>
              </div>
            </div>
          </Section>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          id="roadmap"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Section title="Roadmap" subtitle="Keep it small and sharp; ship primitives.">
            <div className="grid gap-4 md:grid-cols-3">
              <Card title="v0.2" desc="Export/import (.areplay), strict replay, CI, OSS hygiene." />
              <Card title="v0.3" desc="Golden tests (agentreplayx test), richer diff output, JSONL store." />
              <Card title="v0.4" desc="LangGraph/LangChain adapters + OpenTelemetry bridge." />
            </div>
          </Section>
        </motion.div>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-white/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} AgentReplayx • MIT</div>
            <div className="flex gap-4">
              <a className="hover:text-white" href="https://github.com/aasim-syed/Repro" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-white" href="https://pypi.org/project/agentreplayx">Install</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}