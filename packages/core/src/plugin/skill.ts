/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { Effect } from "effect"
import { PluginV2 } from "../plugin"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeRimuruContent from "./skill/customize-rimuru.md" with { type: "text" }

export const CustomizeRimuruContent = customizeRimuruContent

export const Plugin = PluginV2.define({
  id: PluginV2.ID.make("skill"),
  effect: Effect.gen(function* () {
    const skill = yield* SkillV2.Service
    const transform = yield* skill.transform()

    yield* transform((editor) => {
      editor.source(
        new SkillV2.EmbeddedSource({
          type: "embedded",
          skill: new SkillV2.Info({
            name: "customize-rimuru",
            description:
              "Use ONLY when the user is editing or creating rimuru's own configuration: rimuru.json, rimuru.jsonc, files under .rimuru/, or files under ~/.config/rimuru/. Also use when creating or fixing rimuru agents, subagents, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring rimuru itself.",
            location: AbsolutePath.make("/builtin/customize-rimuru.md"),
            content: CustomizeRimuruContent,
          }),
        }),
      )
    })
  }),
})
