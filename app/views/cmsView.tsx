import { Head } from '../../core/components/Head.js'
import { Header } from '../../core/components/Header.js'
import { Pagination } from '../../core/components/Pagination.js'

/**
 * 1ページに表示するコンテンツ数
 */
const PER_PAGE = 10

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
 * 引数型
 */
type Props = {
  contents: Content[]
  currentPage: number
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
 * コンテンツ一覧ページ
 * @param props Props
 * @returns JSX.Element
 */
export const CmsView = (props: Props) => {
  const contents = paginate(props.contents, props.currentPage, PER_PAGE)
  const totalPages = Math.ceil(props.contents.length / PER_PAGE)
  return (
    <html>
      <Head title="CMS" />
      <body>
        <Header />
        <div class="cms-container">
          <h1>ブログ一覧</h1>
          {props.contents.length === 0 ? (
            <div class="cms-nocontent">
              記事がありません。
            </div>
          ) : (
            <>
              <Pagination
                currentPage={props.currentPage}
                totalPages={totalPages}
              />
              <ul>
                {contents.map(content => (
                  <li key={content.id}>
                    <a href={`/cms/${content.id}`} class="cms-title">
                      {content.title}
                    </a>
                    <div class="cms-info">
                      {content.author} - {new Date(content.createdAt).toLocaleDateString('ja-JP')}
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={props.currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </body>
    </html>
  )
}
