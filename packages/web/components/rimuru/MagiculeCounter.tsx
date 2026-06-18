"use client"

interface MagiculeCounterProps {
  tokens: number
  className?: string
}

export function MagiculeCounter({ tokens = 0, className = "" }: MagiculeCounterProps) {
  const formatted = tokens.toLocaleString()
  const color =
    tokens < 50000
      ? "text-rimuru-blue"
      : tokens < 100000
        ? "text-rimuru-gold"
        : "text-rimuru-purple"

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${color} ${className}`}>
      <span className="text-[10px]">⚡</span>
      {formatted} tokens
    </span>
  )
}
