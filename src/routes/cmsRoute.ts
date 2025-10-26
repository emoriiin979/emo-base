import { Hono } from 'hono'
import { searchContents } from '../controllers/cmsController.js'

const cmsRoutes = new Hono()

cmsRoutes.get('/', searchContents)

export default cmsRoutes
