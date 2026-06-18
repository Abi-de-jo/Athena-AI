"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getSettings } from "@/lib/storage/settings"

export default function DashboardPage() {
  const [settings, setSettings] = useState<ReturnType<typeof getSettings> | null>(null)

  useEffect(() => {
    setSettings(getSettings())
  }, [])

  const hasConfig = settings?.openCodeUrl && settings?.anthropicApiKey

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-10">
      {/* Welcome */}
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold gradient-text">
          Welcome back{settings?.userName ? `, ${settings.userName}` : ", Rimuru"}
        </h1>
        {settings?.namakaeName && (
          <p className="text-rimuru-muted text-sm font-mono">{settings.namakaeName}</p>
        )}
      </div>

      {/* Connection Status */}
      <div className={`card p-4 ${hasConfig ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
        <p className={`text-sm ${hasConfig ? "text-green-400" : "text-amber-400"}`}>
          {hasConfig
            ? `✓ Configured — OpenCode at ${settings?.openCodeUrl}`
            : "⚠ OpenCode not configured. Set your server URL and API key in Settings."}
        </p>
        {!hasConfig && (
          <Link href="/app/settings/keys" className="text-rimuru-blue text-xs hover:underline mt-2 inline-block">
            Go to Settings →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: "0", icon: "📜" },
          { label: "Tokens Used", value: "0", icon: "⚡" },
          { label: "Workspaces", value: "0", icon: "📁" },
          { label: "Skills Active", value: "12", icon: "⚡" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 space-y-1">
            <span className="text-lg">{stat.icon}</span>
            <p className="font-heading text-2xl font-bold text-rimuru-text">{stat.value}</p>
            <p className="text-rimuru-muted text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/app/workspace"
            className="px-6 py-3 rounded-xl border border-rimuru-gold/50 text-rimuru-gold font-heading font-medium hover:bg-rimuru-gold/10 transition-colors flex items-center gap-2"
          >
            🐉 + New Veldora Session
          </Link>
          <Link
            href="/app/workspace"
            className="px-6 py-3 rounded-xl border border-rimuru-purple/50 text-rimuru-purple font-heading font-medium hover:bg-rimuru-purple/10 transition-colors flex items-center gap-2"
          >
            ⚡ + New Veldora-Pro Session
          </Link>
        </div>
      </div>

      {/* Recent Sessions placeholder */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-rimuru-text">Recent Sessions</h2>
        <div className="card p-12 text-center">
          <p className="text-5xl mb-4">🌀</p>
          <p className="text-rimuru-muted">No sessions yet.</p>
          <p className="text-rimuru-muted/60 text-sm mt-1">
            Your first Veldora session will appear here.
          </p>
          <Link
            href="/app/workspace"
            className="inline-block mt-4 px-6 py-2 rounded-lg border border-rimuru-blue/50 text-rimuru-blue text-sm hover:bg-rimuru-blue/10 transition-colors"
          >
            Open a Workspace →
          </Link>
        </div>
      </div>
    </div>
  )
}
