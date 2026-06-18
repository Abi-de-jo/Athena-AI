"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getSettings } from "@/lib/storage/settings"
import { MagiculeCounter } from "@/components/rimuru/MagiculeCounter"

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: "🌀" },
  { href: "/app/workspace", label: "Workspaces", icon: "📁" },
  { href: "/app/agents", label: "Agents", icon: "🐉" },
  { href: "/app/skills", label: "Skills", icon: "⚡" },
  { href: "/app/sessions", label: "Sessions", icon: "📜" },
  { href: "/app/settings/keys", label: "Settings", icon: "⚙️" },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const settings = typeof window !== "undefined" ? getSettings() : null

  return (
    <div className="h-screen flex flex-col bg-rimuru-dark">
      {/* ─── Topbar ─── */}
      <header className="h-14 border-b border-rimuru-border bg-rimuru-mid flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-rimuru-muted hover:text-rimuru-text transition-colors"
          >
            ☰
          </button>
          <Link href="/app/dashboard" className="font-display text-lg text-rimuru-blue hover:text-rimuru-purple transition-colors">
            Rimuru AI
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <MagiculeCounter tokens={0} />
          <Link
            href="/app/settings/keys"
            className="text-rimuru-muted hover:text-rimuru-text transition-colors text-sm"
          >
            ⚙️
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Sidebar ─── */}
        <aside
          className={`${
            sidebarOpen ? "w-56" : "w-0"
          } border-r border-rimuru-border bg-rimuru-mid transition-all duration-200 overflow-hidden shrink-0`}
        >
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? "bg-rimuru-blue/10 text-rimuru-blue border border-rimuru-blue/30"
                      : "text-rimuru-muted hover:text-rimuru-text hover:bg-rimuru-surface"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-heading font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User identity */}
          {settings?.userName && (
            <div className="px-4 py-3 mx-3 mt-auto border-t border-rimuru-border">
              <p className="text-rimuru-text text-sm font-heading font-medium">{settings.userName}</p>
              {settings.namakaeName && (
                <p className="text-rimuru-muted text-xs">{settings.namakaeName}</p>
              )}
            </div>
          )}
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
