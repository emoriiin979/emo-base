import { Hono } from 'hono'
import {
  getLoginPage,
} from './auth-page.js'
import {
  postPasswordLogin,
  getGoogleLoginRedirect,
  getGoogleLoginCallback,
} from './auth-service.js'

const authRoutes = new Hono()

authRoutes.get('/', getLoginPage)
authRoutes.post('/', postPasswordLogin)
authRoutes.get('/google/redirect', getGoogleLoginRedirect)
authRoutes.get('/google/callback', getGoogleLoginCallback)

export default authRoutes
