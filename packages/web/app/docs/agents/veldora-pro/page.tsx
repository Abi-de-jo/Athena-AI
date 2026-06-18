const agents = [
  { emoji: "🔵", name: "Coder", role: "Rimuru", desc: "Writes and edits code" },
  { emoji: "🟢", name: "Reviewer", role: "Ranga", desc: "Reviews for bugs and style" },
  { emoji: "🟡", name: "Tester", role: "Gobta", desc: "Writes and runs tests" },
  { emoji: "🟣", name: "Documenter", role: "Shuna", desc: "Writes docs and comments" },
  { emoji: "🔴", name: "Searcher", role: "Souei", desc: "Searches files and the web" },
  { emoji: "⚪", name: "Planner", role: "Benimaru", desc: "Plans execution strategy" },
]

export default function VeldoraProDocs() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold gradient-text">Veldora-Pro</h1>
      <p className="text-rimuru-muted">Multi-agent orchestration with 6 specialized sub-agents.</p>

      <div className="card p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rimuru-border text-left text-rimuru-muted">
              <th className="py-2 pr-4">Agent</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2">Inspiration</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.name} className="border-b border-rimuru-border/50">
                <td className="py-2.5 pr-4 text-rimuru-text">{a.emoji} {a.name}</td>
                <td className="py-2.5 pr-4 text-rimuru-muted">{a.desc}</td>
                <td className="py-2.5 text-rimuru-purple">{a.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2 text-rimuru-muted text-sm">
          <li>You send a task to Veldora-Pro</li>
          <li>The orchestrator decomposes it into sub-tasks</li>
          <li>Relevant sub-agents are spawned in parallel</li>
          <li>Results are synthesized into a final response</li>
        </ol>
        <p className="text-rimuru-muted text-sm">
          Each sub-agent&apos;s activity streams live in the Sub-Agent Panel on the right side of the IDE workspace.
        </p>
      </section>

      <section className="card p-6 space-y-3">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">Best For</h2>
        <ul className="space-y-1 text-rimuru-muted text-sm">
          <li className="flex gap-2"><span className="text-rimuru-purple">✦</span> Complex multi-file refactors</li>
          <li className="flex gap-2"><span className="text-rimuru-purple">✦</span> Full-stack feature implementation</li>
          <li className="flex gap-2"><span className="text-rimuru-purple">✦</span> Code review + test generation in one pass</li>
          <li className="flex gap-2"><span className="text-rimuru-purple">✦</span> Documentation generation for large codebases</li>
        </ul>
      </section>
    </div>
  )
}
