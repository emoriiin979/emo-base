import 'dotenv/config'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { serveStatic } from '@hono/node-server/serve-static'
import FileStore from './core/session/stores/FileStore.js'
import { sessionMiddleware } from 'hono-sessions'
import authRoutes from './routes/authRoute.js'
import HealthPage from './pages/HealthPage.js'
import {
  handle,
  NodeAdapter,
} from './core/adapters/index.js'

const app = new Hono()

// 静的ファイル設定
app.use('/*', serveStatic({ root: './public' }))

// セッション設定
const store = new FileStore()
app.use('/*', sessionMiddleware({
  store,
  encryptionKey: process.env.SESSION_ENCRYPTION_KEY,
  expireAfterSeconds: 900,
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  },
}))

// CSRF設定
app.use(csrf())

// ルーティング設定
app.route('/auth', authRoutes)

app.get('/', HealthPage)

// アダプター設定
handle(new NodeAdapter(app))
