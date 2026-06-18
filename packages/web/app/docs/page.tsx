import Link from "next/link"

export default function DocsHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold gradient-text">Welcome to Rimuru AI</h1>
        <p className="text-rimuru-muted text-lg mt-2">
          Open-source, anime-themed frontend for OpenCode — featuring Veldora and Veldora-Pro agents.
        </p>
      </div>

      <div className="card p-6 space-y-3">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">What Rimuru AI is</h2>
        <ul className="space-y-2 text-rimuru-muted">
          <li className="flex gap-2"><span className="text-rimuru-blue">✦</span> A <strong className="text-rimuru-text">static frontend</strong> — no server, no database, no accounts</li>
          <li className="flex gap-2"><span className="text-rimuru-blue">✦</span> A <strong className="text-rimuru-text">beautiful UI</strong> for OpenCode with two agent modes</li>
          <li className="flex gap-2"><span className="text-rimuru-blue">✦</span> <strong className="text-rimuru-text">Fully open source</strong> — MIT licensed, fork and self-host freely</li>
          <li className="flex gap-2"><span className="text-rimuru-blue">✦</span> <strong className="text-rimuru-text">Your data stays local</strong> — API keys and sessions in your browser only</li>
        </ul>
      </div>

      <div className="card p-6 space-y-3 border-rimuru-gold/20">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">What Rimuru AI is not</h2>
        <ul className="space-y-2 text-rimuru-muted">
          <li className="flex gap-2"><span className="text-rimuru-gold">◇</span> Not a model provider — you bring your own API keys</li>
          <li className="flex gap-2"><span className="text-rimuru-gold">◇</span> Not a hosted service — you run OpenCode yourself</li>
          <li className="flex gap-2"><span className="text-rimuru-gold">◇</span> Not a SaaS — there are no subscriptions or payments</li>
        </ul>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/docs/getting-started/quick-start" className="card p-6 hover:border-rimuru-blue transition-colors space-y-2 group">
          <span className="text-2xl">🚀</span>
          <h3 className="font-heading font-semibold text-rimuru-text group-hover:text-rimuru-blue transition-colors">Quick Start</h3>
          <p className="text-rimuru-muted text-sm">Get up and running in 5 minutes with OpenCode + Rimuru AI.</p>
        </Link>
        <Link href="/docs/agents/veldora-pro" className="card p-6 hover:border-rimuru-purple transition-colors space-y-2 group">
          <span className="text-2xl">⚡</span>
          <h3 className="font-heading font-semibold text-rimuru-text group-hover:text-rimuru-purple transition-colors">Veldora-Pro</h3>
          <p className="text-rimuru-muted text-sm">Multi-agent orchestration with 6 specialized sub-agents.</p>
        </Link>
        <Link href="/docs/deployment/docker" className="card p-6 hover:border-rimuru-blue transition-colors space-y-2 group">
          <span className="text-2xl">🐳</span>
          <h3 className="font-heading font-semibold text-rimuru-text group-hover:text-rimuru-blue transition-colors">Docker</h3>
          <p className="text-rimuru-muted text-sm">Self-host with Docker and Docker Compose.</p>
        </Link>
        <Link href="/docs/configuration/api-keys" className="card p-6 hover:border-rimuru-blue transition-colors space-y-2 group">
          <span className="text-2xl">🔑</span>
          <h3 className="font-heading font-semibold text-rimuru-text group-hover:text-rimuru-blue transition-colors">API Keys</h3>
          <p className="text-rimuru-muted text-sm">Configure your Anthropic and OpenAI keys in the browser.</p>
        </Link>
      </div>
    </div>
  )
}
