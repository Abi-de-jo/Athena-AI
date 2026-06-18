// lib/storage/workspaces.ts — localStorage workspace CRUD

export interface Workspace {
  id: string
  name: string
  path: string
  description?: string
  agentType: "veldora" | "veldora-pro"
  language?: string
  createdAt: string
  lastOpenedAt: string
}

const STORAGE_KEY = "rimuru-workspaces"

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function getWorkspaces(): Workspace[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWorkspaces(workspaces: Workspace[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaces))
}

export function createWorkspace(data: Omit<Workspace, "id" | "createdAt" | "lastOpenedAt">): Workspace {
  const workspace: Workspace = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
    lastOpenedAt: new Date().toISOString(),
  }
  const workspaces = getWorkspaces()
  workspaces.push(workspace)
  saveWorkspaces(workspaces)
  return workspace
}

export function updateWorkspace(id: string, patch: Partial<Workspace>): Workspace | null {
  const workspaces = getWorkspaces()
  const idx = workspaces.findIndex((w) => w.id === id)
  if (idx === -1) return null
  workspaces[idx] = { ...workspaces[idx], ...patch, lastOpenedAt: new Date().toISOString() }
  saveWorkspaces(workspaces)
  return workspaces[idx]
}

export function deleteWorkspace(id: string): void {
  const workspaces = getWorkspaces().filter((w) => w.id !== id)
  saveWorkspaces(workspaces)
}

export function getWorkspace(id: string): Workspace | undefined {
  return getWorkspaces().find((w) => w.id === id)
}

export function touchWorkspace(id: string): void {
  updateWorkspace(id, {})
}
