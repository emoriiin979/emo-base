import type { Context } from 'hono'
import { PrismaClient } from '../../generated/prisma/index.js'
import bcrypt from 'bcrypt'
import i18next, { t } from 'i18next'
import initLocale from '../../core/messages/initLocale.js'
import z from 'zod'

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
 * パスワード認証
 * @param c Context
 * @returns - jsonレスポンス
 */
const loginPassword = async (c: Context) => {
  // 言語ファイル取得
  initLocale(c)

  // スキーマ定義
  const loginSchema = z.object({
    userid: z.string()
        .min(1, t('formRequired', { what: t('userid') })),
    password: z.string()
        .min(1, t('formRequired', { what: t('password') })),
  })
  type formData = z.infer<typeof loginSchema>

  try {
    // 入力情報の取得と検証
    const body: formData = await c.req.parseBody()
    const validated = loginSchema.safeParse(body)
    if (!validated.success) {
      return c.json({
        message: t('validationFailed'),
        errors: validated.error.issues.map(issue => issue.message),
      })
    }
    const { userid, password } = validated.data
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
        message: t('loginAttemptExceeded'),
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
        message: t('loginSuccess'),
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
        message: t('loginFailed'),
      }, 401)
    }
  } catch (e) {
    return c.json({
      message: t('unknownServerError'),
      error: e instanceof Error ? e.message : 'unknown error',
    }, 500)
  }
}

export default loginPassword
