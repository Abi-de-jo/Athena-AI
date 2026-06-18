"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/getting-started/quick-start", label: "Quick Start" },
      { href: "/docs/getting-started/installation", label: "Installation" },
    ],
  },
  {
    title: "Agents",
    items: [
      { href: "/docs/agents/veldora", label: "Veldora" },
      { href: "/docs/agents/veldora-pro", label: "Veldora-Pro" },
      { href: "/docs/agents/sub-agents", label: "Sub-Agents" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { href: "/docs/configuration/api-keys", label: "API Keys" },
      { href: "/docs/configuration/opencode-setup", label: "OpenCode Setup" },
    ],
  },
  {
    title: "Deployment",
    items: [
      { href: "/docs/deployment/docker", label: "Docker" },
      { href: "/docs/deployment/vercel", label: "Vercel" },
      { href: "/docs/deployment/coolify", label: "Coolify" },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-rimuru-border bg-rimuru-mid/50 shrink-0 hidden md:block overflow-auto">
        <div className="p-6 sticky top-0">
          <Link href="/docs" className="font-display text-lg text-rimuru-blue hover:text-rimuru-purple transition-colors">
            Docs
          </Link>
          <nav className="mt-6 space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-rimuru-muted text-[10px] font-heading uppercase tracking-widest mb-2">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-1.5 rounded-lg text-sm transition-all ${
                          active
                            ? "bg-rimuru-blue/10 text-rimuru-blue border-l-2 border-rimuru-blue"
                            : "text-rimuru-muted hover:text-rimuru-text hover:bg-rimuru-surface"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto py-12 px-6 prose prose-invert prose-rimuru">
          {children}
        </div>
      </main>
    </div>
  )
}
