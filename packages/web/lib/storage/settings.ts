// lib/storage/settings.ts — localStorage settings for Rimuru AI
// No backend, no database — everything lives in the browser.

export interface RimuruSettings {
  openCodeUrl: string
  anthropicApiKey: string
  openaiApiKey: string
  defaultAgent: "veldora" | "veldora-pro"
  defaultModel: string
  proModel: string
  userName: string
  namakaeName: string
}

const STORAGE_KEY = "rimuru-settings"

const defaults: RimuruSettings = {
  openCodeUrl: "http://localhost:3000",
  anthropicApiKey: "",
  openaiApiKey: "",
  defaultAgent: "veldora",
  defaultModel: "claude-sonnet-4-6",
  proModel: "claude-opus-4-8",
  userName: "",
  namakaeName: "",
}

export function getSettings(): RimuruSettings {
  if (typeof window === "undefined") return { ...defaults }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return { ...defaults }
  }
}

export function saveSettings(settings: RimuruSettings): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function updateSettings(patch: Partial<RimuruSettings>): RimuruSettings {
  const current = getSettings()
  const updated = { ...current, ...patch }
  saveSettings(updated)
  return updated
}
