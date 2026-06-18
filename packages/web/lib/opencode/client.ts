// lib/opencode/client.ts — OpenCode HTTP + SSE + WebSocket client

export interface OpenCodeEvent {
  type: "thinking" | "tool_call" | "tool_result" | "response" | "sub_agent_start" | "sub_agent_output" | "sub_agent_complete" | "done" | "error"
  content?: string
  tool?: string
  input?: Record<string, unknown>
  output?: string | unknown
  error?: string
  agent?: string
  task?: string
  tokensUsed?: number
  durationMs?: number
  message?: string
  delta?: string
}

export class OpenCodeClient {
  private baseUrl: string

  constructor(baseUrl: string = "http://localhost:3000") {
    this.baseUrl = baseUrl.replace(/\/$/, "")
  }

  /** Stream a message and yield parsed SSE events */
  async *stream(params: {
    workspacePath: string
    message: string
    model: string
    sessionId?: string
    tools?: string[]
  }): AsyncGenerator<OpenCodeEvent> {
    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      throw new Error(`OpenCode request failed: ${res.status} ${res.statusText}`)
    }

    const reader = res.body?.getReader()
    if (!reader) throw new Error("No response body")

    const decoder = new TextDecoder()
    let buffer = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const event = JSON.parse(line.slice(6)) as OpenCodeEvent
            yield event
            if (event.type === "done" || event.type === "error") return
          } catch {
            // Skip unparseable lines
          }
        }
      }
    }
  }

  /** Health check */
  async ping(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/health`, {
        signal: AbortSignal.timeout(3000),
      })
      return res.ok
    } catch {
      return false
    }
  }

  /** List files in workspace directory */
  async listFiles(path: string): Promise<FileNode[]> {
    const res = await fetch(`${this.baseUrl}/api/files?path=${encodeURIComponent(path)}`)
    if (!res.ok) throw new Error(`Failed to list files: ${res.status}`)
    return res.json()
  }

  /** Read file content */
  async readFile(path: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/api/file?path=${encodeURIComponent(path)}`)
    if (!res.ok) throw new Error(`Failed to read file: ${res.status}`)
    return res.text()
  }

  /** Write file content */
  async writeFile(path: string, content: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/file`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, content }),
    })
    if (!res.ok) throw new Error(`Failed to write file: ${res.status}`)
  }

  /** Connect WebSocket for terminal I/O */
  connectTerminal(sessionId: string): WebSocket {
    const wsUrl = this.baseUrl.replace("http", "ws")
    return new WebSocket(`${wsUrl}/ws/terminal/${sessionId}`)
  }
}

export interface FileNode {
  name: string
  path: string
  type: "file" | "directory"
  children?: FileNode[]
}
