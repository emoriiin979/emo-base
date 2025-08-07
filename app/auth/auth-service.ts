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
    // 認証成功
    return c.text('success!')
  } else {
    // 認証失敗
    return c.text('failed!')
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
