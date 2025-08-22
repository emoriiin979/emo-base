import { PrismaClient } from '../../app/generated/prisma/index.js'
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
 * アカウントロック確認
 * @param userid string - ユーザーID
 * @param ip string - IPアドレス
 * @returns Promise<boolean> - アカウントロック有無
 */
export const isAccountLock = async (userid: string, ip: string) => {
  const gteCreatedAt = new Date(Date.now() - 1000 * 60 * 60 * RECOVERY_HOURS)

  // ユーザーID単位でカウント
  const cntUserFail = await prisma.login.count({
    where: {
      name: userid,
      success: false,
      created_at: { gte: gteCreatedAt }
    }
  })

  // IPアドレス単位でカウント
  const cntIpFail = await prisma.login.count({
    where: {
      AND: [
        { ip: ip },
        { ip: { not: 'unknown' } },
      ],
      success: false,
      created_at: { gte: gteCreatedAt },
    },
  })

  return cntUserFail >= MAX_ATTEMPTS || cntIpFail >= MAX_ATTEMPTS
}

/**
 * パスワード認証
 * @param userid string - ユーザーID
 * @param password string - パスワード
 * @returns Promise<boolean> - 認証成否
 */
export const authPassword = async (userid: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { name: userid }
  })
  return user && await bcrypt.compare(password, user.password)
}

/**
 * ログイン履歴登録
 * @param userid string - ユーザーID
 * @param ip string - IPアドレス
 * @param success boolean - ログイン成否
 */
export const createLoginLog = async (userid: string, ip: string, success: boolean) => {
  await prisma.login.create({
    data: {
      name: userid,
      ip: ip,
      success: success,
    }
  })
}
