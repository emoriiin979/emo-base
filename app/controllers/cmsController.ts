import type { Context } from 'hono'
import { countContents, findContents } from '../services/cmsService.js'
import { CmsView } from '../views/cmsView.js'

/**
 * 1ページに表示するコンテンツ数
 */
const PER_PAGE = 10

/**
 * コンテンツ検索
 * GET /cms
 * @param c Context
 * @returns 
 */
export const searchContents = async (c: Context) => {
  const session = c.get('session')
  const user = await session.get('loginUser')
  const currentPage = parseInt(c.req.query('page') ?? '1')
  const total = await countContents(user.id)
  const contents = total > 0 ? await findContents(
    user.id,
    currentPage,
    PER_PAGE,
  ) : []
  return c.render(CmsView({
    contents: contents,
    currentPage: currentPage,
    countTotalPages: Math.ceil(total / PER_PAGE),
    loginUser: user,
  }))
}
