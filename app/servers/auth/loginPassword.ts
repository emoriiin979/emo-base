import type { Context } from 'hono';
import { PrismaClient } from '../../generated/prisma/index.js';
import bcrypt from 'bcrypt'

/**
 * 認証失敗が回復するまでにかかる時間(hour)
 */
const RECOVERY_HOURS: number = 1

/**
 * 認証失敗になる回数
 */
const MAX_ATTEMPTS: number = 5

/**
 * Prismaクライアント
 */
const prisma = new PrismaClient()

/**
 * フォームデータ型
 */
type formData = {
  userid: string;
  password: string;
}

/**
 * パスワード認証
 * @param c Context
 * @returns - jsonレスポンス
 */
const loginPassword = async (c: Context) => {
  // 入力情報の取得
  const { userid, password } = await c.req.parseBody() as formData
  const ip = c.get('ip') as string

  // ログイン回数確認
  const gteCreatedAt = new Date(Date.now() - 1000 * 60 * 60 * RECOVERY_HOURS)
  const cntUserFail = await prisma.login.count({
    where: {
      name: userid,
      success: false,
      created_at: { gte: gteCreatedAt }
    }
  })
  const cntIpFail = await prisma.login.count({
    where: {
      AND: [
        { ip: ip },
        { ip: { not: 'unknown' } },
      ],
      success: false,
      created_at: { gte: gteCreatedAt },
    }
  })
  if (cntUserFail >= MAX_ATTEMPTS || cntIpFail >= MAX_ATTEMPTS) {
    return c.json({
      message: 'login attempt exceeded',
    }, 401)
  }

  // パスワード認証
  const user = await prisma.user.findFirst({
    where: { name: userid }
  })
  if (user && await bcrypt.compare(password, user.password)) {
    // 認証成功
    await prisma.login.create({
      data: {
        name: userid,
        ip: ip,
        success: true,
      }
    })
    const session = c.get('session')
    await session.set('userid', userid)
    await session.set('is_logged_in', true)
    return c.json({
      message: 'login success',
    })
  } else {
    // 認証失敗
    await prisma.login.create({
      data: {
        name: userid,
        ip: c.get('ip'),
        success: false,
      }
    })
    return c.json({
      message: 'login failed',
    }, 401)
  }
}

export default loginPassword
