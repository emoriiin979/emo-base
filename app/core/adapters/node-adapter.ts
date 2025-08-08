import type { Hono } from 'hono'
import { serve } from '@hono/node-server'

export const handle = async (
  app: Hono,
) => {
  serve({
    fetch: app.fetch,
    port: 3000,
  }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}
