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
const loginPassword = async (c: Context) => {
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

export default loginPassword
