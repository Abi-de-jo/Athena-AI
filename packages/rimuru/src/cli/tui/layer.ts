import { run as runTui, type TuiInput } from "@rimuru-ai/tui"
import { Global } from "@rimuru-ai/core/global"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(Global.defaultLayer))
}
