"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { getWorkspace, touchWorkspace } from "@/lib/storage/workspaces"
import { getSettings } from "@/lib/storage/settings"
import { OpenCodeClient, type OpenCodeEvent } from "@/lib/opencode/client"
import { MagiculeCounter } from "@/components/rimuru/MagiculeCounter"
import type { Workspace } from "@/lib/storage/workspaces"

interface ChatMessage {
  id: string
  role: "user" | "agent" | "tool" | "sub-agent"
  content: string
  agent?: string
  toolName?: string
  toolInput?: string
  toolOutput?: string
  timestamp: string
}

interface SubAgentState {
  name: string
  status: "idle" | "thinking" | "working" | "done"
  task: string
  output: string
  emoji: string
}

export default function WorkspaceIDEPage() {
  const params = useParams()
  const router = useRouter()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [tokenCount, setTokenCount] = useState(0)
  const [subAgents, setSubAgents] = useState<SubAgentState[]>([
    { name: "Coder", status: "idle", task: "", output: "", emoji: "🔵" },
    { name: "Reviewer", status: "idle", task: "", output: "", emoji: "🟢" },
    { name: "Tester", status: "idle", task: "", output: "", emoji: "🟡" },
    { name: "Documenter", status: "idle", task: "", output: "", emoji: "🟣" },
    { name: "Searcher", status: "idle", task: "", output: "", emoji: "🔴" },
    { name: "Planner", status: "idle", task: "", output: "", emoji: "⚪" },
  ])
  const [showTerminal, setShowTerminal] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<OpenCodeClient | null>(null)

  useEffect(() => {
    const id = params?.id as string
    if (!id) return
    const ws = getWorkspace(id)
    if (!ws) {
      router.push("/app/workspace")
      return
    }
    setWorkspace(ws)
    touchWorkspace(id)
    const settings = getSettings()
    clientRef.current = new OpenCodeClient(settings.openCodeUrl)
  }, [params, router])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !workspace || !clientRef.current || streaming) return

    const settings = getSettings()
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setStreaming(true)

    try {
      const stream = clientRef.current.stream({
        workspacePath: workspace.path,
        message: input,
        model: workspace.agentType === "veldora-pro" ? settings.proModel : settings.defaultModel,
      })

      for await (const event of stream) {
        switch (event.type) {
          case "thinking":
          case "response": {
            const content = event.content || event.delta || ""
            setMessages((prev) => {
              const last = prev[prev.length - 1]
              if (last?.role === "agent" && last.id === "streaming") {
                last.content += content
                return [...prev.slice(0, -1), { ...last }]
              }
              return [
                ...prev,
                { id: "streaming", role: "agent", content, timestamp: new Date().toISOString() },
              ]
            })
            break
          }
          case "tool_call": {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "tool",
                content: event.tool || "Tool",
                toolName: event.tool,
                toolInput: JSON.stringify(event.input, null, 2),
                timestamp: new Date().toISOString(),
              },
            ])
            break
          }
          case "tool_result": {
            const id = Date.now().toString()
            setMessages((prev) => {
              const idx = prev.findIndex(
                (m) => m.role === "tool" && m.toolName === event.tool && !m.toolOutput
              )
              if (idx === -1) return prev
              const updated = [...prev]
              updated[idx] = { ...updated[idx], toolOutput: event.error || (typeof event.output === "string" ? event.output : JSON.stringify(event.output)) }
              return updated
            })
            break
          }
          case "sub_agent_start": {
            setSubAgents((prev) =>
              prev.map((a) =>
                a.name === event.agent ? { ...a, status: "working" as const, task: event.task || "" } : a
              )
            )
            break
          }
          case "sub_agent_output": {
            setSubAgents((prev) =>
              prev.map((a) =>
                a.name === event.agent ? { ...a, output: a.output + (event.content || "") } : a
              )
            )
            break
          }
          case "sub_agent_complete": {
            setSubAgents((prev) =>
              prev.map((a) =>
                a.name === event.agent ? { ...a, status: "done" as const } : a
              )
            )
            break
          }
          case "done": {
            setMessages((prev) =>
              prev.map((m) => (m.id === "streaming" ? { ...m, id: Date.now().toString() } : m))
            )
            if (event.tokensUsed) setTokenCount((t) => t + event.tokensUsed!)
            break
          }
          case "error": {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "agent",
                content: `Error: ${event.message}`,
                timestamp: new Date().toISOString(),
              },
            ])
            break
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "agent",
          content: `Connection error: ${err instanceof Error ? err.message : "Unknown error"}. Make sure OpenCode is running at ${getSettings().openCodeUrl}.`,
          timestamp: new Date().toISOString(),
        },
      ])
    }

    setStreaming(false)
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "thinking": return "bg-amber-500"
      case "working": return "bg-rimuru-blue animate-pulse"
      case "done": return "bg-green-500"
      default: return "bg-rimuru-border"
    }
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-rimuru-muted">Loading workspace...</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* IDE Topbar */}
      <header className="h-12 border-b border-rimuru-border bg-rimuru-mid/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-rimuru-muted">←</span>
          <span className="font-heading font-medium text-rimuru-text">{workspace.name}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
            workspace.agentType === "veldora-pro"
              ? "bg-rimuru-purple/10 border-rimuru-purple/30 text-rimuru-purple"
              : "bg-rimuru-gold/10 border-rimuru-gold/30 text-rimuru-gold"
          }`}>
            {workspace.agentType === "veldora-pro" ? "Veldora-Pro" : "Veldora"}
          </span>
        </div>
        <MagiculeCounter tokens={tokenCount} />
      </header>

      {/* Main IDE area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Agent Chat Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <p className="text-5xl">
                    {workspace.agentType === "veldora-pro" ? "⚡" : "🐉"}
                  </p>
                  <p className="text-rimuru-muted">
                    {workspace.agentType === "veldora-pro"
                      ? "Veldora-Pro is ready. Send a task to deploy the sub-agents."
                      : "Veldora awaits your command, Rimuru."}
                  </p>
                  <p className="text-rimuru-muted/50 text-xs">
                    Path: <code className="text-rimuru-blue">{workspace.path}</code>
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl p-4 space-y-2 ${
                    msg.role === "user"
                      ? "bg-rimuru-blue/10 border border-rimuru-blue/30 text-rimuru-text"
                      : msg.role === "tool"
                        ? "bg-rimuru-surface border border-rimuru-border text-rimuru-muted text-sm"
                        : "bg-rimuru-mid border border-rimuru-border text-rimuru-text"
                  }`}
                >
                  {msg.role === "tool" ? (
                    <details className="space-y-2">
                      <summary className="cursor-pointer font-mono text-xs text-rimuru-blue">
                        {msg.toolOutput ? "✓" : "▶"} {msg.toolName}
                        {msg.toolInput && " ▶"}
                      </summary>
                      {msg.toolInput && (
                        <pre className="text-[11px] bg-rimuru-dark/50 p-2 rounded overflow-x-auto">
                          {msg.toolInput}
                        </pre>
                      )}
                      {msg.toolOutput && (
                        <pre className="text-[11px] bg-rimuru-dark/50 p-2 rounded overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {msg.toolOutput.slice(0, 2000)}
                          {msg.toolOutput.length > 2000 && "\n... truncated"}
                        </pre>
                      )}
                    </details>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="flex justify-start">
                <div className="bg-rimuru-mid border border-rimuru-border rounded-xl p-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-rimuru-blue animate-pulse" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-rimuru-border bg-rimuru-mid/30">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Tell Veldora what to do..."
                rows={2}
                className="flex-1 px-4 py-3 rounded-xl bg-rimuru-surface border border-rimuru-border text-rimuru-text placeholder:text-rimuru-muted/50 focus:border-rimuru-blue outline-none resize-none text-sm font-body"
                disabled={streaming}
              />
              <button
                onClick={sendMessage}
                disabled={streaming || !input.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rimuru-blue to-rimuru-purple text-white font-heading font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
              >
                Send ⚡
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-rimuru-muted/50 text-xs">~{Math.ceil(input.length / 4)} tokens</span>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="text-rimuru-muted text-xs hover:text-rimuru-blue transition-colors"
              >
                {showTerminal ? "Hide Terminal" : "Show Terminal ▼"}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Agent Panel (Veldora-Pro only) */}
        {workspace.agentType === "veldora-pro" && (
          <div className="w-64 border-l border-rimuru-border bg-rimuru-mid/30 overflow-auto shrink-0 hidden lg:block">
            <div className="p-3 border-b border-rimuru-border">
              <p className="font-heading text-xs font-semibold text-rimuru-muted uppercase tracking-wider">
                Sub-Agents
              </p>
            </div>
            <div className="p-2 space-y-1">
              {subAgents.map((agent) => (
                <div key={agent.name} className="p-3 rounded-lg hover:bg-rimuru-surface transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColor(agent.status)}`} />
                    <span className="text-sm font-heading font-medium text-rimuru-text">
                      {agent.emoji} {agent.name}
                    </span>
                  </div>
                  {agent.task && (
                    <p className="text-[11px] text-rimuru-muted truncate" title={agent.task}>
                      {agent.task}
                    </p>
                  )}
                  {agent.status === "done" && (
                    <span className="text-[10px] text-green-400 font-mono">✓ Complete</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Terminal (collapsible) */}
      {showTerminal && (
        <div className="h-48 border-t border-rimuru-border bg-rimuru-dark shrink-0">
          <div className="flex items-center justify-between px-4 py-1.5 bg-rimuru-mid border-b border-rimuru-border">
            <span className="text-xs font-mono text-rimuru-muted">Terminal</span>
            <button
              onClick={() => setShowTerminal(false)}
              className="text-rimuru-muted hover:text-rimuru-text text-xs"
            >
              ✕
            </button>
          </div>
          <div className="p-4 font-mono text-xs text-rimuru-muted">
            <p className="text-rimuru-blue">$ Connected to OpenCode terminal</p>
            <p className="text-rimuru-muted/50 mt-1">Terminal I/O will stream here via WebSocket connection.</p>
          </div>
        </div>
      )}
    </div>
  )
}
