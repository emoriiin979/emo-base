import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import app from '../index.js'

app.use('/*', serveStatic({ root: './public' }))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
