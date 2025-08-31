import { PrismaClient, type Content } from '../models/index.js'
import { Prisma } from '../models/index.js'
/**
 * Prismaクライアント
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
const prisma = globalForPrisma.prisma ?? new PrismaClient()

/**
 * コンテンツ型
 */
type ContentWithUser = Prisma.ContentGetPayload<{
  include: { user: true }
}>

/**
 * コンテンツ件数確認
 * @param userid string - ユーザーID
 * @returns Promise<number> - コンテンツ件数
 */
export const countContents = async (userid: string): Promise<number> => {
  return await prisma.content.count({
    where: { user_id: userid },
  })
}

/**
 * コンテンツ検索
 * @param userid string - ユーザーID
 * @returns Promise<ContentWithUser[]> - コンテンツ情報リスト
 */
export const findContents = async (
  userid: string,
  page: number,
  perPage: number,
): Promise<ContentWithUser[]> => {
  return await prisma.content.findMany({
    where: { user_id: userid },
    include: { user: true },
    orderBy: { created_at: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
  })
}
