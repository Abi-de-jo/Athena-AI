import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-rimuru-dark">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
        {/* Background glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-rimuru-blue/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-rimuru-purple/5 blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rimuru-blue/30 bg-rimuru-blue/5 text-rimuru-blue text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rimuru-blue animate-pulse-glow" />
              Open Source · MIT License
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight gradient-text">
              Absorb. Evolve. Ship.
            </h1>

            <p className="font-heading text-xl sm:text-2xl text-rimuru-muted">
              The open-source anime-themed UI for OpenCode
            </p>

            <p className="text-rimuru-muted text-lg leading-relaxed max-w-lg">
              Rimuru AI is a beautiful, free frontend for OpenCode — featuring
              Veldora and Veldora-Pro agent modes with a full anime-themed
              experience. No accounts. No subscriptions. Just pure coding power.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/app/settings/keys"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rimuru-blue to-rimuru-purple text-white font-heading font-semibold text-lg hover:opacity-90 transition-opacity glow-blue"
              >
                ⬇ Get Started Free →
              </Link>
              <a
                href="https://github.com/gowdaman-dev/rimuru-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl border border-rimuru-border text-rimuru-text font-heading font-semibold text-lg hover:border-rimuru-blue hover:text-rimuru-blue transition-all"
              >
                ⭐ Star on GitHub
              </a>
            </div>

            <p className="text-rimuru-muted/60 text-sm pt-2">
              Open source · Self-hostable · MIT Licensed
            </p>
          </div>

          {/* Right: Orb animation */}
          <div className="relative flex items-center justify-center h-[400px] lg:h-[500px]">
            {/* Orbiting skill badges */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[
                { label: "TypeScript", color: "bg-rimuru-blue/20 border-rimuru-blue/50 text-rimuru-blue", orbit: 0 },
                { label: "Docker", color: "bg-rimuru-purple/20 border-rimuru-purple/50 text-rimuru-purple", orbit: 1 },
                { label: "Testing", color: "bg-rimuru-gold/20 border-rimuru-gold/50 text-rimuru-gold", orbit: 2 },
                { label: "Docs", color: "bg-rimuru-blue/20 border-rimuru-blue/50 text-rimuru-blue", orbit: 3 },
                { label: "Git", color: "bg-rimuru-purple/20 border-rimuru-purple/50 text-rimuru-purple", orbit: 4 },
              ].map((skill) => (
                <div
                  key={skill.label}
                  className={`absolute px-3 py-1 rounded-full border text-xs font-mono ${skill.color} backdrop-blur-sm`}
                  style={{
                    animation: `orbit ${12 + skill.orbit * 2}s linear infinite`,
                    animationDelay: `${skill.orbit * 1.5}s`,
                  }}
                >
                  {skill.label}
                </div>
              ))}
            </div>

            {/* Center orb */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rimuru-blue to-rimuru-purple opacity-20 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-rimuru-blue to-rimuru-purple opacity-40 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full bg-rimuru-dark border-2 border-rimuru-blue/50 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl">🌀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Agent Showcase ─── */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl font-bold gradient-text-gold">
            Two Agents. One Vision.
          </h2>
          <p className="text-rimuru-muted text-xl">Choose your power level.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Veldora Card */}
          <div className="card p-8 space-y-6 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rimuru-gold to-amber-600 flex items-center justify-center text-2xl glow-gold animate-spin-slow">
              🐉
            </div>
            <h3 className="font-display text-3xl text-rimuru-gold">Veldora</h3>
            <p className="text-rimuru-muted text-sm font-mono">Standard Agent</p>
            <p className="text-rimuru-text leading-relaxed">
              Single-threaded, fast, focused. Veldora handles your coding tasks with the precision of a storm dragon.
            </p>
            <ul className="space-y-2 text-rimuru-muted">
              {["Code generation & refactoring", "File system navigation", "Terminal command execution", "Git operations", "128K context window"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-rimuru-gold">✦</span> {f}
                </li>
              ))}
            </ul>
            <span className="inline-block px-3 py-1 rounded-full bg-rimuru-gold/10 border border-rimuru-gold/30 text-rimuru-gold text-xs font-mono">
              Free · Open Source
            </span>
          </div>

          {/* Veldora-Pro Card */}
          <div className="card p-8 space-y-6 group border-rimuru-purple/30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rimuru-purple to-rimuru-blue flex items-center justify-center text-2xl glow-purple animate-spin-slow">
              ⚡
            </div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-3xl gradient-text">Veldora-Pro</h3>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-rimuru-purple/20 text-rimuru-purple border border-rimuru-purple/30">
                ⭐ Most Powerful
              </span>
            </div>
            <p className="text-rimuru-muted text-sm font-mono">Multi-Agent Orchestrator</p>
            <p className="text-rimuru-text leading-relaxed">
              Six specialized sub-agents in parallel. Veldora-Pro decomposes complex tasks and runs agents simultaneously — like Rimuru commanding the Great Jura Forest.
            </p>

            {/* Sub-agent row */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Coder", emoji: "🔵" },
                { name: "Reviewer", emoji: "🟢" },
                { name: "Tester", emoji: "🟡" },
                { name: "Docs", emoji: "🟣" },
                { name: "Searcher", emoji: "🔴" },
                { name: "Planner", emoji: "⚪" },
              ].map((a) => (
                <span key={a.name} className="px-2.5 py-1 rounded-lg bg-rimuru-surface border border-rimuru-border text-xs font-mono hover:border-rimuru-blue transition-colors">
                  {a.emoji} {a.name}
                </span>
              ))}
            </div>

            <ul className="space-y-2 text-rimuru-muted">
              {["6 parallel sub-agents", "Autonomous task decomposition", "Cross-agent memory sharing", "200K context window"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-rimuru-purple">✦</span> {f}
                </li>
              ))}
            </ul>
            <span className="inline-block px-3 py-1 rounded-full bg-rimuru-purple/10 border border-rimuru-purple/30 text-rimuru-purple text-xs font-mono">
              Free · Open Source
            </span>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold gradient-text">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: "🔌",
              title: "Connect",
              body: "Point to your OpenCode server URL in settings. Rimuru AI connects in seconds — local or remote.",
            },
            {
              step: "2",
              icon: "🔑",
              title: "Configure",
              body: "Your Anthropic or OpenAI key stays in your browser. We never see it. You own your stack.",
            },
            {
              step: "3",
              icon: "🚀",
              title: "Ship",
              body: "Open a workspace, type your task. Watch Veldora (or 6 sub-agents in Pro mode) get to work.",
            },
          ].map((item) => (
            <div key={item.step} className="card p-8 text-center space-y-4">
              <div className="text-4xl">{item.icon}</div>
              <div className="font-display text-sm text-rimuru-blue">Step {item.step}</div>
              <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
              <p className="text-rimuru-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: "🌀", title: "Zero Backend", desc: "No server, no database, no accounts. Pure frontend." },
            { emoji: "🔑", title: "Your Keys", desc: "API keys stay in localStorage. Never leave your device." },
            { emoji: "🐉", title: "Veldora-Pro", desc: "Multi-agent orchestration with 6 specialized sub-agents." },
            { emoji: "📖", title: "Built-in Docs", desc: "Full documentation portal, searchable, offline-ready." },
            { emoji: "🚀", title: "One-Click Deploy", desc: "Docker, Vercel, or Coolify. Ready in seconds." },
            { emoji: "⚡", title: "OpenCode Powered", desc: "Built on OpenCode's battle-tested agent engine." },
          ].map((f) => (
            <div key={f.title} className="card p-6 space-y-3">
              <span className="text-2xl">{f.emoji}</span>
              <h3 className="font-heading font-semibold text-lg">{f.title}</h3>
              <p className="text-rimuru-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Open Source Banner ─── */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 p-16 rounded-2xl bg-gradient-to-br from-rimuru-blue/10 to-rimuru-purple/10 border border-rimuru-blue/20">
          <h2 className="font-display text-4xl font-bold gradient-text">
            Free. Forever. Open Source.
          </h2>
          <p className="text-rimuru-muted text-lg leading-relaxed max-w-xl mx-auto">
            Rimuru AI is MIT licensed. Fork it, self-host it, contribute to it. The slime belongs to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/app/settings/keys"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-rimuru-blue to-rimuru-purple text-white font-heading font-semibold hover:opacity-90 transition-opacity"
            >
              ⬇ Download
            </Link>
            <a
              href="https://github.com/gowdaman-dev/rimuru-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl border border-rimuru-border text-rimuru-text font-heading font-semibold hover:border-rimuru-blue transition-all"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 border-t border-rimuru-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-rimuru-muted text-sm">
          <p>Rimuru AI · MIT Licensed · Open Source</p>
          <div className="flex gap-6">
            <a href="https://github.com/gowdaman-dev/rimuru-ai" className="hover:text-rimuru-blue transition-colors">GitHub</a>
            <Link href="/docs" className="hover:text-rimuru-blue transition-colors">Docs</Link>
            <Link href="/changelog" className="hover:text-rimuru-blue transition-colors">Changelog</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
