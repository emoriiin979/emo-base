import { Hono } from 'hono'
import {
  loginPage,
  loginPassword,
  loginGoogleRedirect,
  loginGoogleCallback,
  logout,
} from '../controllers/authController.js'

const authRoutes = new Hono()

authRoutes.get('/', loginPage)
authRoutes.post('/', loginPassword)
authRoutes.get('/google/redirect', loginGoogleRedirect)
authRoutes.get('/google/callback', loginGoogleCallback)
authRoutes.post('/logout', logout)

export default authRoutes
