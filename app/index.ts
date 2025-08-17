import 'dotenv/config'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { languageDetector } from 'hono/language'
import FileStore from '../core/session/stores/FileStore.js'
import { sessionMiddleware } from 'hono-sessions'
import { csrf } from 'hono/csrf'
import authRoutes from './routes/authRoute.js'
import { healthPage } from './controllers/healthController.js'
import { handleNodeAdapter } from '../core/adapters/index.js'
import ipMiddleware from '../core/middlewares/ipMiddleware.js'

const app = new Hono()

// 静的ファイル設定
app.use('/*', serveStatic({ root: './public' }))

// 言語情報取得
app.use(languageDetector({
  supportedLanguages: ['ja', 'en'],
  fallbackLanguage: 'ja',
}))

// IPアドレス取得
app.use('/*', ipMiddleware)

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

app.get('/', healthPage)

// アダプター設定
handleNodeAdapter(app)
