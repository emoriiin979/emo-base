import type { MiddlewareHandler } from 'hono'

const authMiddleware: MiddlewareHandler = async (c, next) => {
  // ログイン中かどうか？
  const session = await c.get('session')
  c.set('isLogin', !!session.get('loginUser'))

  await next()
}

export default authMiddleware
