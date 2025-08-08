import type { Context } from 'hono'

/**
 * Google認証のコールバック
 * @param c 
 * @returns 
 */
const loginGoogleCallback = (c: Context) => {
  return c.text('google callback')
}

export default loginGoogleCallback
