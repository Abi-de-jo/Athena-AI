export default function QuickStart() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold gradient-text">Quick Start</h1>
      <p className="text-rimuru-muted">Up and running in 5 minutes.</p>

      <div className="space-y-6">
        <section className="card p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-rimuru-text">1. Run OpenCode</h2>
          <pre><code>npx opencode</code></pre>
          <p className="text-rimuru-muted text-sm">OpenCode starts at <code>http://localhost:3000</code></p>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-rimuru-text">2. Run Rimuru AI</h2>
          <pre><code>docker run -p 4000:3000 ghcr.io/gowdaman-dev/rimuru-ai-web:latest</code></pre>
          <p className="text-rimuru-muted text-sm">Or from source:</p>
          <pre><code>git clone https://github.com/gowdaman-dev/rimuru-ai{"\n"}cd rimuru-ai/packages/web && npm install && npm run dev</code></pre>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-rimuru-text">3. Configure</h2>
          <p className="text-rimuru-muted text-sm">
            Open <code>http://localhost:4000/app/settings/keys</code>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-rimuru-muted text-sm">
            <li>Set <strong>OpenCode URL</strong>: <code>http://localhost:3000</code></li>
            <li>Add your <strong>Anthropic API Key</strong></li>
            <li>Click <strong>Save Settings</strong></li>
          </ul>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-rimuru-text">4. Create a Workspace</h2>
          <p className="text-rimuru-muted text-sm">
            Go to <strong>Workspaces → New Workspace</strong>, enter the path to your project.
            Launch Veldora and start coding!
          </p>
        </section>
      </div>
    </div>
  )
}
