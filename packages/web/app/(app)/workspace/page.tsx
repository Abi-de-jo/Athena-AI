"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getWorkspaces, createWorkspace, deleteWorkspace, type Workspace } from "@/lib/storage/workspaces"

export default function WorkspaceListPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({
    name: "",
    path: "",
    description: "",
    agentType: "veldora" as "veldora" | "veldora-pro",
    language: "",
  })

  useEffect(() => {
    setWorkspaces(getWorkspaces())
  }, [])

  const refresh = () => setWorkspaces(getWorkspaces())

  const handleCreate = () => {
    if (!form.name || !form.path) return
    createWorkspace(form)
    setForm({ name: "", path: "", description: "", agentType: "veldora", language: "" })
    setShowNew(false)
    refresh()
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this workspace?")) return
    deleteWorkspace(id)
    refresh()
  }

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-rimuru-surface border border-rimuru-border text-rimuru-text text-sm placeholder:text-rimuru-muted/50 focus:border-rimuru-blue outline-none transition-colors"

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Workspaces</h1>
          <p className="text-rimuru-muted mt-1">Your territories in the Great Jura Forest.</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rimuru-blue to-rimuru-purple text-white font-heading font-medium text-sm hover:opacity-90 transition-opacity"
        >
          + New Workspace
        </button>
      </div>

      {/* New Workspace Modal */}
      {showNew && (
        <div className="card p-6 space-y-4 border-rimuru-blue/30">
          <h2 className="font-heading font-semibold text-rimuru-text">Create Workspace</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-rimuru-muted mb-1">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="my-project"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-rimuru-muted mb-1">Path</label>
              <input
                value={form.path}
                onChange={(e) => setForm({ ...form, path: e.target.value })}
                placeholder="/home/user/projects/my-app"
                className={inputClass + " font-mono"}
              />
            </div>
            <div>
              <label className="block text-xs text-rimuru-muted mb-1">Agent</label>
              <select
                value={form.agentType}
                onChange={(e) => setForm({ ...form, agentType: e.target.value as "veldora" | "veldora-pro" })}
                className={inputClass}
              >
                <option value="veldora">🐉 Veldora</option>
                <option value="veldora-pro">⚡ Veldora-Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-rimuru-muted mb-1">Language (optional)</label>
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className={inputClass}
              >
                <option value="">Auto-detect</option>
                <option value="TypeScript">TypeScript</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Rust">Rust</option>
                <option value="Go">Go</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-rimuru-muted mb-1">Description (optional)</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A brief description..."
              className={inputClass}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              className="px-6 py-2 rounded-lg bg-rimuru-blue text-white font-medium text-sm hover:opacity-90"
            >
              Create Workspace
            </button>
            <button
              onClick={() => setShowNew(false)}
              className="px-6 py-2 rounded-lg border border-rimuru-border text-rimuru-muted text-sm hover:text-rimuru-text"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Workspace Grid */}
      {workspaces.length === 0 ? (
        <div className="card p-16 text-center space-y-4">
          <p className="text-6xl">🌀</p>
          <p className="text-rimuru-muted text-lg">No workspaces yet.</p>
          <p className="text-rimuru-muted/60 text-sm">
            Create your first territory and let Veldora explore it.
          </p>
          <button
            onClick={() => setShowNew(true)}
            className="inline-block px-6 py-2 rounded-lg border border-rimuru-blue/50 text-rimuru-blue text-sm hover:bg-rimuru-blue/10 transition-colors"
          >
            + New Workspace
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <div key={ws.id} className="card p-5 space-y-3 group">
              <div className="flex items-start justify-between">
                <h3 className="font-heading font-semibold text-rimuru-text">{ws.name}</h3>
                <button
                  onClick={() => handleDelete(ws.id)}
                  className="text-rimuru-muted/40 hover:text-red-400 transition-colors text-sm opacity-0 group-hover:opacity-100"
                >
                  🗑
                </button>
              </div>
              <p className="font-mono text-xs text-rimuru-muted truncate" title={ws.path}>
                {ws.path}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {ws.language && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rimuru-surface border border-rimuru-border text-rimuru-muted">
                    {ws.language}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    ws.agentType === "veldora-pro"
                      ? "bg-rimuru-purple/10 border-rimuru-purple/30 text-rimuru-purple"
                      : "bg-rimuru-gold/10 border-rimuru-gold/30 text-rimuru-gold"
                  }`}
                >
                  {ws.agentType === "veldora-pro" ? "Veldora-Pro" : "Veldora"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-rimuru-muted/60 text-xs">{timeAgo(ws.lastOpenedAt)}</span>
                <Link
                  href={`/app/workspace/${ws.id}`}
                  className="px-3 py-1 rounded-lg bg-rimuru-blue/10 border border-rimuru-blue/30 text-rimuru-blue text-xs font-medium hover:bg-rimuru-blue/20 transition-colors"
                >
                  Open →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
