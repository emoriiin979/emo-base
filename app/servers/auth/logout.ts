import type { Context } from 'hono';

/**
 * ログアウト
 * @param c 
 * @returns 
 */
const logout = (c: Context) => {
  const session = c.get('session')
  session.deleteSession()
  return c.json({
    message: 'logout success',
  })
}

export default logout
