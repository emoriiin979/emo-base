import type { MiddlewareHandler } from 'hono'
import initLocale from '../messages/initLocale.js'

const initSessionMiddleware: MiddlewareHandler = async (c, next) => {
  initLocale(c)
  await next()
}

export default initSessionMiddleware
