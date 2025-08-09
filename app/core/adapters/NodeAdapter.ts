import type { Adapter } from './Adapter.d.js'
import type { Hono } from 'hono'
import { serve } from '@hono/node-server'

class NodeAdapter implements Adapter {
  app: Hono

  constructor(app: Hono) {
    this.app = app
  }

  async handle() {
    serve({
      fetch: this.app.fetch,
      port: 3000,
    }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`)
    })
  }
}

export default NodeAdapter
