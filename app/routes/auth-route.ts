import { Hono } from 'hono'
import {
  LoginPage,
} from '../pages/auth/index.js'
import {
  loginPassword,
  loginGoogleRedirect,
  loginGoogleCallback,
  logout,
} from '../servers/auth/index.js'

const authRoutes = new Hono()

authRoutes.get('/', LoginPage)
authRoutes.post('/', loginPassword)
authRoutes.get('/google/redirect', loginGoogleRedirect)
authRoutes.get('/google/callback', loginGoogleCallback)
authRoutes.get('/logout', logout)

export default authRoutes
