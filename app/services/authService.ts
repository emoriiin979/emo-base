import { PrismaClient, type User } from '../models/index.js'
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
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
const prisma = globalForPrisma.prisma ?? new PrismaClient()

/**
 * アカウントロック確認
 * @param userid string - ユーザーID
 * @param ip string - IPアドレス
 * @returns Promise<boolean> - アカウントロック有無
 */
export const isAccountLock = async (userid: string, ip: string) => {
  const gteCreatedAt = new Date(Date.now() - 1000 * 60 * 60 * RECOVERY_HOURS)

  // ユーザーID単位でカウント
  const recentUserLogins = await prisma.login.findMany({
    where: {
      name: userid,
      created_at: { gte: gteCreatedAt },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: MAX_ATTEMPTS,
  })
  const userFail = recentUserLogins.filter(login => !login.success).length === MAX_ATTEMPTS

  // IPアドレス単位でカウント
  const recentIpLogins = await prisma.login.findMany({
    where: {
      AND: [
        { ip: ip },
        { ip: { not: 'unknown' } },
      ],
      created_at: { gte: gteCreatedAt },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: MAX_ATTEMPTS,
  })
  const ipFail = recentIpLogins.filter(login => !login.success).length === MAX_ATTEMPTS

  return userFail || ipFail
}

/**
 * パスワード照合
 * @param userid string - ユーザーID
 * @param password string - パスワード
 * @returns Promise<boolean> - 認証成否
 */
export const authPassword = async (user: User, password: string) => {
  return await bcrypt.compare(password, user.password)
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
