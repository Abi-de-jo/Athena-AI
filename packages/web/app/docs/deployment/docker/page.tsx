export default function DockerDeploy() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold gradient-text">Docker Deployment</h1>
      <p className="text-rimuru-muted">Self-host Rimuru AI with Docker.</p>

      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">Quick Run</h2>
        <pre><code>docker run -p 4000:3000 ghcr.io/gowdaman-dev/rimuru-ai-web:latest</code></pre>
        <p className="text-rimuru-muted text-sm">Open <code>http://localhost:4000</code></p>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">Docker Compose</h2>
        <pre><code>{`version: '3.9'

services:
  rimuru-ai:
    image: ghcr.io/gowdaman-dev/rimuru-ai-web:latest
    ports:
      - "4000:3000"
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_APP_URL=http://localhost:4000
      - NEXT_PUBLIC_DEFAULT_OPENCODE_URL=http://localhost:3000
      - NODE_ENV=production`}</code></pre>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-rimuru-text">Build From Source</h2>
        <pre><code>git clone https://github.com/gowdaman-dev/rimuru-ai
cd rimuru-ai/packages/web
docker build -f deployment/Dockerfile -t rimuru-ai .
docker run -p 4000:3000 rimuru-ai</code></pre>
      </section>
    </div>
  )
}
