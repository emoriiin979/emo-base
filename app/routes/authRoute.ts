import { Hono, type MiddlewareHandler } from 'hono'
import {
  loginPage,
  loginPassword,
  loginGoogleRedirect,
  loginGoogleCallback,
  logout,
} from '../controllers/authController.js'

const authRoutes = new Hono()

// ログアウト処理
authRoutes.post('/logout', logout)

// ログイン中の場合はリダイレクト
const redirectMiddleware: MiddlewareHandler = async (c, next) => {
  const session = c.get('session')
  if (await session.get('loginUser')) {
    return c.redirect('/cms')
  }
  await next()
}
authRoutes.use('/*', redirectMiddleware)

// ログイン処理
authRoutes.get('/', loginPage)
authRoutes.post('/', loginPassword)
authRoutes.get('/google/redirect', loginGoogleRedirect)
authRoutes.get('/google/callback', loginGoogleCallback)

export default authRoutes
