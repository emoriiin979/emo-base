import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import FileStore from './session/store/FileStore.js'
import { sessionMiddleware } from 'hono-sessions'
import authRoutes from './auth/auth-route.js'
import { Header } from './components/header.js'
import { handle } from './adapters/node-adapter.js'

const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))

const store = new FileStore()
app.use('/*', sessionMiddleware({
  store,
  expireAfterSeconds: 900,
}))

app.route('/auth', authRoutes)

app.get('/', (c) => {
  return c.render(
    <html>
      <Header title="TOP" />
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
})

handle(app)
