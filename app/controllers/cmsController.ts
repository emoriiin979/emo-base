import type { Context } from 'hono'
import { CmsView } from '../views/cmsView.js'

/**
 * 1ページに表示するコンテンツ数
 */
const PER_PAGE = 10

// サンプルデータ
const blogs = [
  {
    id: 1,
    title: 'ブログ記事1',
    author: 'ユーザー1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'ブログ記事2',
    author: 'ユーザー2',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'ブログ記事3',
    author: 'ユーザー3',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'ブログ記事4',
    author: 'ユーザー4',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'ブログ記事5',
    author: 'ユーザー5',
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'ブログ記事6',
    author: 'ユーザー6',
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'ブログ記事7',
    author: 'ユーザー7',
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: 'ブログ記事8',
    author: 'ユーザー8',
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    title: 'ブログ記事9',
    author: 'ユーザー9',
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    title: 'ブログ記事10',
    author: 'ユーザー10',
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    title: 'ブログ記事11',
    author: 'ユーザー11',
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    title: 'ブログ記事12',
    author: 'ユーザー12',
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    title: 'ブログ記事13',
    author: 'ユーザー13',
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    title: 'ブログ記事14',
    author: 'ユーザー14',
    createdAt: new Date().toISOString(),
  },
  {
    id: 15,
    title: 'ブログ記事15',
    author: 'ユーザー15',
    createdAt: new Date().toISOString(),
  },
  {
    id: 16,
    title: 'ブログ記事16',
    author: 'ユーザー16',
    createdAt: new Date().toISOString(),
  },
]

/**
 * コンテンツ型
 */
type Content = {
  id: number
  title: string
  author: string
  createdAt: string
}

/**
 * ページネーション用ユーティリティ
 * @param items Content[]
 * @param page number
 * @param perPage number
 * @returns Content[]
 */
const paginate = (contents: Content[], page: number, perPage: number): Content[] => {
  const start = (page - 1) * perPage
  return contents.slice(start, start + perPage)
}

/**
 * コンテンツ検索
 * GET /cms
 * @param c Context
 * @returns 
 */
export const searchContents = async (c: Context) => {
  const session = c.get('session')
  return c.render(CmsView({
    contents: paginate(blogs, parseInt(c.req.query('page') ?? '1'), PER_PAGE),
    currentPage: parseInt(c.req.query('page') ?? '1'),
    countTotalPages: Math.ceil(blogs.length / PER_PAGE),
    loginUser: await session.get('loginUser'),
  }))
}
