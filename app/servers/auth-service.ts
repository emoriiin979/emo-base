import type { Context } from 'hono';

// ダミーユーザー
const users: Record<string, string> = {
  'emo-user': 'password123',
}

/**
 * パスワード認証
 * @param c 
 * @returns 
 */
export const postPasswordLogin = async (c: Context) => {
  type formData = {
    userid: string;
    password: string;
  }
  const { userid, password } = await c.req.parseBody() as formData

  if (users[userid] && users[userid] === password) {
    const session = c.get('session')
    await session.set('userid', userid)
    await session.set('is_logged_in', true)

    // 認証成功
    return c.json({
      message: 'login success',
    })
  } else {
    // 認証失敗
    return c.json({
      message: 'login failed',
    }, 401)
  }
}

/**
 * Google認証ページにリダイレクト
 * @param c 
 * @returns 
 */
export const getGoogleLoginRedirect = (c: Context) => {
  return c.text('google redirect')
}

/**
 * Google認証のコールバック
 * @param c 
 * @returns 
 */
export const getGoogleLoginCallback = (c: Context) => {
  return c.text('google callback')
}

export const getLogout = (c: Context) => {
  const session = c.get('session')
  session.deleteSession()
  return c.json({
    message: 'logout success',
  })
}
