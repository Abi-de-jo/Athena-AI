import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "@rimuru-ai/core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~rimuru/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~rimuru/WorkspaceRef", {
  defaultValue: () => undefined,
})
