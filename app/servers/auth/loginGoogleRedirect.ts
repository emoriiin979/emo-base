import type { Context } from 'hono'

/**
 * Google認証ページにリダイレクト
 * @param c 
 * @returns 
 */
const loginGoogleRedirect = (c: Context) => {
  return c.text('google redirect')
}

export default loginGoogleRedirect
