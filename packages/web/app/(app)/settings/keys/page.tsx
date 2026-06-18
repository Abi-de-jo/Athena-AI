"use client"

import { useState, useEffect } from "react"
import { getSettings, saveSettings, type RimuruSettings } from "@/lib/storage/settings"

export default function KeysPage() {
  const [settings, setSettings] = useState<RimuruSettings | null>(null)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    setSettings(getSettings())
  }, [])

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-rimuru-muted animate-pulse">Great Sage is analyzing...</div>
      </div>
    )
  }

  const update = (patch: Partial<RimuruSettings>) => {
    const next = { ...settings, ...patch }
    setSettings(next)
  }

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const testConnection = async () => {
    setTesting(true)
    setConnectionStatus("idle")
    try {
      const res = await fetch(`${settings.openCodeUrl}/api/health`, {
        signal: AbortSignal.timeout(5000),
      })
      setConnectionStatus(res.ok ? "success" : "error")
    } catch {
      setConnectionStatus("error")
    }
    setTesting(false)
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-rimuru-surface border border-rimuru-border text-rimuru-text placeholder:text-rimuru-muted/50 focus:border-rimuru-blue focus:ring-1 focus:ring-rimuru-blue outline-none transition-colors font-mono text-sm"

  const labelClass = "block text-sm font-heading font-medium text-rimuru-text mb-2"
  const helperClass = "text-xs text-rimuru-muted mt-1.5"

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold gradient-text">Configuration</h1>
        <p className="text-rimuru-muted">Everything lives in your browser. We see nothing.</p>
      </div>

      {/* OpenCode Server */}
      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text border-b border-rimuru-border pb-2">
          🔌 OpenCode Server
        </h2>
        <div>
          <label className={labelClass}>OpenCode Server URL</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={settings.openCodeUrl}
              onChange={(e) => update({ openCodeUrl: e.target.value })}
              placeholder="http://localhost:3000"
              className={inputClass + " flex-1"}
            />
            <button
              onClick={testConnection}
              disabled={testing}
              className="px-4 py-3 rounded-xl border border-rimuru-blue/50 text-rimuru-blue font-mono text-sm hover:bg-rimuru-blue/10 transition-colors disabled:opacity-50"
            >
              {testing ? "..." : "Test"}
            </button>
          </div>
          <p className={helperClass}>The URL where your OpenCode instance is running</p>
          {connectionStatus === "success" && (
            <p className="text-green-400 text-xs mt-2">✓ Connected to OpenCode</p>
          )}
          {connectionStatus === "error" && (
            <p className="text-red-400 text-xs mt-2">✗ Could not connect. Check the URL and ensure OpenCode is running.</p>
          )}
        </div>
      </section>

      {/* API Keys */}
      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text border-b border-rimuru-border pb-2">
          🔑 API Keys
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Anthropic API Key</label>
            <input
              type="password"
              value={settings.anthropicApiKey}
              onChange={(e) => update({ anthropicApiKey: e.target.value })}
              placeholder="sk-ant-..."
              className={inputClass}
            />
            <p className={helperClass}>Used by Veldora and Veldora-Pro agents</p>
          </div>
          <div>
            <label className={labelClass}>OpenAI API Key (optional)</label>
            <input
              type="password"
              value={settings.openaiApiKey}
              onChange={(e) => update({ openaiApiKey: e.target.value })}
              placeholder="sk-..."
              className={inputClass}
            />
            <p className={helperClass}>Fallback provider or for GPT-based models</p>
          </div>
        </div>
      </section>

      {/* Agent Defaults */}
      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text border-b border-rimuru-border pb-2">
          ⚙️ Agent Defaults
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Default Agent</label>
            <select
              value={settings.defaultAgent}
              onChange={(e) => update({ defaultAgent: e.target.value as "veldora" | "veldora-pro" })}
              className={inputClass}
            >
              <option value="veldora">Veldora</option>
              <option value="veldora-pro">Veldora-Pro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Veldora Model</label>
            <select
              value={settings.defaultModel}
              onChange={(e) => update({ defaultModel: e.target.value })}
              className={inputClass}
            >
              <option value="claude-sonnet-4-6">Claude Sonnet 4</option>
              <option value="claude-haiku-4-5">Claude Haiku 4</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4o-mini">GPT-4o Mini</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Veldora-Pro Model</label>
            <select
              value={settings.proModel}
              onChange={(e) => update({ proModel: e.target.value })}
              className={inputClass}
            >
              <option value="claude-opus-4-8">Claude Opus 4</option>
              <option value="claude-sonnet-4-6">Claude Sonnet 4</option>
              <option value="gpt-4o">GPT-4o</option>
            </select>
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="card p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text border-b border-rimuru-border pb-2">
          🌀 Identity
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Your Name</label>
            <input
              type="text"
              value={settings.userName}
              onChange={(e) => update({ userName: e.target.value })}
              placeholder="Rimuru Tempest"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Your Namakaé Title</label>
            <input
              type="text"
              value={settings.namakaeName}
              onChange={(e) => update({ namakaeName: e.target.value })}
              placeholder="Great Sage · Storm Dragon"
              className={inputClass}
            />
            <p className={helperClass}>Your anime title, shown in the sidebar</p>
          </div>
        </div>
      </section>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-rimuru-blue to-rimuru-purple text-white font-heading font-semibold text-lg hover:opacity-90 transition-all"
      >
        {saved ? "✓ Settings Saved!" : "Save Settings"}
      </button>

      {/* Privacy notice */}
      <div className="card p-4 bg-rimuru-blue/5 border-rimuru-blue/20">
        <p className="text-rimuru-muted text-xs leading-relaxed">
          ⚠️ All settings are stored in your browser&apos;s localStorage. Nothing is sent to any server — not even ours.
          Rimuru AI has no backend.
        </p>
      </div>
    </div>
  )
}
