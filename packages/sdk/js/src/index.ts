export * from "./client.js"
export * from "./server.js"

import { createRimuruClient } from "./client.js"
import { createRimuruServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createRimuru(options?: ServerOptions) {
  const server = await createRimuruServer({
    ...options,
  })

  const client = createRimuruClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
