import { createEffect, createSignal, onCleanup, Show } from "solid-js"
import { useTheme } from "../context/theme"

/** Slime face frames — eyes blink, body bounces */
const THINK_FRAMES = [
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◔‿◔)", // half-blink
  "(◡‿◡)", // blink!
  "(◔‿◕)", // winking
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◡‿◡)", // blink!
  "(◕‿◕)", // open
  "(◕‿◕)", // open
]

/** Done state — subtle idle blink */
const DONE_FRAMES = [
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◔‿◔)", // half
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◕‿◕)", // open
  "(◡‿◡)", // blink
  "(◕‿◕)", // open
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
