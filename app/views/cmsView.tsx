import { Head } from '../../core/components/Head.js'
import { Header } from '../../core/components/Header.js'
import { t } from 'i18next'
import { Pagination } from '../../core/components/Pagination.js'

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
  countTotalPages: number
  isLogin: boolean
}

/**
 * コンテンツ一覧ページ
 * @param props Props
 * @returns JSX.Element
 */
export const CmsView = (props: Props) => {
  return (
    <html>
      <Head title="CMS" />
      <body>
        <Header isLogin={props.isLogin} />
        <main class="cms-main">
          {props.contents.length === 0 ? (
            <p>
              {t('noData')}
            </p>
          ) : (
            <>
              <Pagination
                currentPage={props.currentPage}
                totalPages={props.countTotalPages}
              />
              <ul>
                {props.contents.map(content => (
                  <li key={content.id}>
                    <a href={`/cms/${content.id}`} class="cms-title">
                      {content.title}
                    </a>
                    <p class="cms-info">
                      {content.author} - {new Date(content.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={props.currentPage}
                totalPages={props.countTotalPages}
              />
            </>
          )}
        </main>
      </body>
    </html>
  )
}
