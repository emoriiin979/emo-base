import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import FileStore from './core/sessions/stores/FileStore.js'
import { sessionMiddleware } from 'hono-sessions'
import authRoutes from './routes/auth-route.js'
import HealthPage from './pages/HealthPage.js'
import { handle } from './core/adapters/node-adapter.js'

const app = new Hono()

// 静的ファイル設定
app.use('/*', serveStatic({ root: './public' }))

// セッション設定
const store = new FileStore()
app.use('/*', sessionMiddleware({
  store,
  expireAfterSeconds: 900,
}))

// ルーティング設定
app.route('/auth', authRoutes)

app.get('/', HealthPage)

// アダプター設定
handle(app)
