import { Hono } from 'hono'
import {
  getLoginPage,
} from '../pages/auth-page.js'
import {
  postPasswordLogin,
  getGoogleLoginRedirect,
  getGoogleLoginCallback,
  getLogout,
} from '../servers/auth-service.js'

const authRoutes = new Hono()

authRoutes.get('/', getLoginPage)
authRoutes.post('/', postPasswordLogin)
authRoutes.get('/google/redirect', getGoogleLoginRedirect)
authRoutes.get('/google/callback', getGoogleLoginCallback)
authRoutes.get('/logout', getLogout)

export default authRoutes
