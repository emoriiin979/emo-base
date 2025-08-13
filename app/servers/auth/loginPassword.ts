import type { Context } from 'hono';
import { PrismaClient } from '../../generated/prisma/index.js';
import bcrypt from 'bcrypt'

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

  const prisma = new PrismaClient()
  const user = await prisma.user.findFirst({
    where: { name: userid }
  })
  if (user && await bcrypt.compare(password, user.password)) {
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
