"use client"

import Link from "next/link"

const VELDORA_SKILLS = [
  "Code Generation", "Refactoring", "File Navigation",
  "Terminal Executor", "Git Operations", "Web Search",
  "TypeScript", "Docker", "Database",
]

const SUB_AGENTS = [
  { name: "Coder", emoji: "🔵", role: "Rimuru", desc: "Writes and edits code" },
  { name: "Reviewer", emoji: "🟢", role: "Ranga", desc: "Reviews for bugs and style" },
  { name: "Tester", emoji: "🟡", role: "Gobta", desc: "Writes and runs tests" },
  { name: "Documenter", emoji: "🟣", role: "Shuna", desc: "Writes docs and comments" },
  { name: "Searcher", emoji: "🔴", role: "Souei", desc: "Searches files and the web" },
  { name: "Planner", emoji: "⚪", role: "Benimaru", desc: "Plans before executing" },
]

export default function AgentHubPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold gradient-text">Agent Command Center</h1>
        <p className="text-rimuru-muted">Your forces, Rimuru. Deploy wisely.</p>
      </div>

      {/* VELDORA */}
      <div className="card p-8 lg:p-12 space-y-8 border-rimuru-gold/20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Orb */}
          <div className="shrink-0">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rimuru-gold to-amber-600 opacity-20 animate-pulse-glow" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-rimuru-gold to-amber-600 opacity-40 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full bg-rimuru-dark border-2 border-rimuru-gold/50 flex items-center justify-center">
                <span className="text-4xl">🐉</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="font-display text-4xl text-rimuru-gold">Veldora</h2>
              <p className="text-rimuru-muted text-sm font-mono mt-1">Storm Dragon · Standard Agent</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Sessions", value: "—" },
                { label: "Tokens Used", value: "—" },
                { label: "Tasks Done", value: "—" },
              ].map((s) => (
                <div key={s.label} className="bg-rimuru-surface rounded-lg p-3 text-center">
                  <p className="font-heading text-xl font-bold text-rimuru-text">{s.value}</p>
                  <p className="text-rimuru-muted text-[10px] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <p className="text-rimuru-muted text-xs uppercase tracking-wider mb-2">Active Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {VELDORA_SKILLS.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-rimuru-gold/10 border border-rimuru-gold/20 text-rimuru-gold text-[11px] font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/app/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rimuru-gold to-amber-600 text-white font-heading font-semibold hover:opacity-90 transition-opacity glow-gold"
            >
              Launch Veldora 🐉
            </Link>
          </div>
        </div>
      </div>

      {/* VELDORA-PRO */}
      <div className="card p-8 lg:p-12 space-y-8 border-rimuru-purple/20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Orb */}
          <div className="shrink-0">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rimuru-purple to-rimuru-blue opacity-20 animate-pulse-glow" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rimuru-purple to-rimuru-blue opacity-30 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-4 rounded-full border-2 border-rimuru-purple/30" />
              <div className="absolute inset-6 rounded-full border border-rimuru-blue/30" />
              <div className="absolute inset-8 rounded-full bg-rimuru-dark border-2 border-rimuru-purple/50 flex items-center justify-center">
                <span className="text-5xl">⚡</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-4xl gradient-text">Veldora-Pro</h2>
              <span className="px-3 py-1 rounded-full bg-rimuru-purple/20 border border-rimuru-purple/30 text-rimuru-purple text-xs font-mono">
                ⭐ AWAKENED
              </span>
            </div>
            <p className="text-rimuru-muted text-sm font-mono">Multi-Agent Orchestrator</p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Sessions", value: "—" },
                { label: "Tokens", value: "—" },
                { label: "Tasks", value: "—" },
                { label: "Sub-Agent Runs", value: "—" },
              ].map((s) => (
                <div key={s.label} className="bg-rimuru-surface rounded-lg p-3 text-center">
                  <p className="font-heading text-xl font-bold text-rimuru-text">{s.value}</p>
                  <p className="text-rimuru-muted text-[10px] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Sub-Agent Roster */}
            <details className="space-y-2" open>
              <summary className="cursor-pointer text-rimuru-muted text-xs uppercase tracking-wider font-heading font-medium">
                Sub-Agent Roster
              </summary>
              <div className="grid sm:grid-cols-2 gap-2 pt-2">
                {SUB_AGENTS.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-rimuru-surface border border-rimuru-border hover:border-rimuru-purple/50 transition-colors"
                  >
                    <span className="text-lg">{a.emoji}</span>
                    <div>
                      <p className="text-sm font-heading font-medium text-rimuru-text">{a.name}</p>
                      <p className="text-[11px] text-rimuru-muted">
                        <span className="text-rimuru-purple">{a.role}</span> — {a.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <Link
              href="/app/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rimuru-purple to-rimuru-blue text-white font-heading font-semibold hover:opacity-90 transition-opacity glow-purple"
            >
              Launch Veldora-Pro ⚡
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
