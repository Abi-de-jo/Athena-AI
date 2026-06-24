import { createEffect, createSignal, onCleanup, Show } from "solid-js"
import { useTheme } from "../context/theme"

/** Warrior frames — ⚔ crossed swords clash during thought, rest when done */
const THINK_FRAMES = [
  "⚔",  // crossed swords
  "⚒",  // hammer & pick — striking
  "⚔",  // crossed swords
  "⚜",  // fleur-de-lis — heraldic badge
  "⚔",  // crossed swords
  "⚒",  // striking
  "⚔",  // crossed swords
  "⚜",  // heraldic
  "⚔",  // crossed swords
  "⚒",  // striking
  "⚔",  // crossed swords
  "⚜",  // heraldic
]

/** Done state — warrior at rest */
const DONE_FRAMES = [
  "⚔",  // crossed swords
  "⚔",  // crossed swords
  "⚒",  // hammer & pick
  "⚔",  // crossed swords
  "⚔",  // crossed swords
  "⚜",  // heraldic badge
  "⚔",  // crossed swords
  "⚔",  // crossed swords
  "⚒",  // hammer & pick
  "⚔",  // crossed swords
  "⚔",  // crossed swords
  "⚜",  // heraldic badge
]

export function SlimeThinking(props: { text?: string }) {
  const { theme } = useTheme()
  const [frame, setFrame] = createSignal(0)

  let interval: ReturnType<typeof setInterval> | undefined
  createEffect(() => {
    interval = setInterval(() => setFrame((f) => (f + 1) % THINK_FRAMES.length), 150)
  })
  onCleanup(() => clearInterval(interval))

  return (
    <box flexDirection="row" flexShrink={0} gap={1} paddingLeft={3} marginTop={1}>
      <text fg={theme.primary}>{THINK_FRAMES[frame()]}</text>
      <text fg={theme.warning}>{props.text ?? "Thinking..."}</text>
    </box>
  )
}

export function SlimeThought(props: { toggleable: boolean; open: boolean; title: string | null; duration?: string }) {
  const { theme } = useTheme()
  const [frame, setFrame] = createSignal(0)

  let interval: ReturnType<typeof setInterval> | undefined
  createEffect(() => {
    interval = setInterval(() => setFrame((f) => (f + 1) % DONE_FRAMES.length), 400)
  })
  onCleanup(() => clearInterval(interval))

  return (
    <box flexDirection="row" flexShrink={0} gap={1} paddingLeft={3} marginTop={1}>
      <text fg={theme.primary}>{DONE_FRAMES[frame()]}</text>
      <text fg={theme.textMuted} wrapMode="none">
        <Show when={props.toggleable}>
          <span>{props.open ? "- " : "+ "}</span>
        </Show>
        <span>Thought</span>
        <Show when={props.title || props.duration}>
          <span>: </span>
        </Show>
        <Show when={props.title}>
          <span>{props.title}</span>
        </Show>
        <Show when={props.duration}>
          <span>
            {props.title ? " · " : ""}
            {props.duration}
          </span>
        </Show>
      </text>
    </box>
  )
}
