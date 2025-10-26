import type { MiddlewareHandler } from 'hono'

const ipMiddleware: MiddlewareHandler = async (c, next) => {
  let ip = c.req.header('x-forwarded-for')?.split(',')[0].trim()

  if (!ip && (c.req.raw as any)?.socket?.remoteAddress) {
    ip = (c.req.raw as any).socket.remoteAddress
  }

  c.set('ip', ip || 'unknown')

  await next()
}

export default ipMiddleware
