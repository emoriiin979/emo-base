import { t } from 'i18next'
import { Head, Header, Pagination } from '@emo-components/index.js'
import { Prisma, type User } from '../models/index.js'

/**
 * 引数型
 */
type ContentWithUser = Prisma.ContentGetPayload<{
  include: { user: true }
}>

type Props = {
  contents: ContentWithUser[]
  currentPage: number
  countTotalPages: number
  loginUser?: User
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
        <Header loginUserName={props.loginUser?.name} />
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
                      {content.user.name} - {new Date(content.created_at).toLocaleDateString('ja-JP')}
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
