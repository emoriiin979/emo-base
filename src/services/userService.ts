import { PrismaClient, type User } from '../models/generated/index.js'

/**
 * Prismaクライアント
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
const prisma = globalForPrisma.prisma ?? new PrismaClient()

/**
 * ユーザー取得
 * @param userid string - ユーザーID
 * @returns Promise<User|null> - ユーザー情報
 */
export const findUser = async (userid: string): Promise<User|null> => {
  return await prisma.user.findFirst({
    where: {
      id: userid,
    },
  })
}
