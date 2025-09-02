import 'dotenv/config'
import { Hono, type MiddlewareHandler } from 'hono'
import { languageDetector } from 'hono/language'
import { csrf } from 'hono/csrf'
import { sessionMiddleware } from 'hono-sessions'
import { serveStatic } from '@hono/node-server/serve-static'
import { handleNodeAdapter } from '@emo-adapters/index.js'
import { initLocaleMiddleware, ipMiddleware } from '@emo-middlewares/index.js'
import { FileStore } from '@emo-session/index.js'
import authRoutes from './routes/authRoute.js'
import cmsRoutes from './routes/cmsRoute.js'
import { healthPage } from './controllers/healthController.js'

const app = new Hono()

// 静的ファイル設定
app.use('/*', serveStatic({ root: './public' }))

// 言語情報取得
app.use(languageDetector({
  supportedLanguages: ['ja', 'en'],
  fallbackLanguage: 'ja',
}))
app.use('/*', initLocaleMiddleware)

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

// ルーティング設定(ログイン不要)
app.route('/auth', authRoutes)
app.get('/', healthPage)

// 未ログインの場合はリダイレクト
const redirectMiddleware: MiddlewareHandler = async (c, next) => {
  const session = c.get('session')
  if (!session.get('loginUser')) {
    return c.redirect('/auth')
  }
  await next()
}
app.use('/*', redirectMiddleware)

// ルーティング設定(ログイン必須)
app.route('/cms', cmsRoutes)

// アダプター設定
handleNodeAdapter(app)
