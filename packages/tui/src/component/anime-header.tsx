import { useTheme } from "../context/theme"
import { useRoute } from "../context/route"
import { TextAttributes } from "@opentui/core"
import { createMemo, Show } from "solid-js"

export function AnimeHeader() {
  const { theme } = useTheme()
  const route = useRoute()

  const routeLabel = createMemo(() => {
    if (!route.data) return ""
    if (route.data.type === "home") return "✦"
    if (route.data.type === "session") return "◇"
    return ""
  })

  return (
    <box flexShrink={0} flexDirection="row" paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
      <text fg={theme.primary} attributes={TextAttributes.BOLD}>
        Athena
      </text>
      <box flexGrow={1} />
      <Show when={routeLabel()}>
        <text fg={theme.accent}>{routeLabel()}</text>
      </Show>
    </box>
  )
}
