import type { MiddlewareHandler } from 'hono'

const authMiddleware: MiddlewareHandler = async (c, next) => {
  // ログイン中かどうか？
  const session = await c.get('session')
  c.set('isLogin', !!session.get('userid'))

  await next()
}

export default authMiddleware
