import type { FC } from 'hono/jsx'
import { t } from 'i18next'

type PaginationProps = {
  currentPage: number
  totalPages: number
}

/**
 * ページネーション
 * @param props PaginationProps
 * @returns FunctionComponent
 */
export const Pagination: FC<PaginationProps> = (props) => {
const { currentPage, totalPages } = props
  const pages = []

  // 前のページのリンク作成
  pages.push(
    <a
      href={`?page=${currentPage - 1}`}
      class="page-link"
      style={currentPage === 1 ? { display: 'none' } : {}}
    >
      &laquo; {t('prevPage')}
    </a>
  )

  // ページリンクを生成
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <>
        {i === currentPage ? (
          <span
            class="page-link active"
          >
            {i}
          </span>
        ) : (
          <a
            href={`?page=${i}`}
            class="page-link"
          >
            {i}
          </a>
        )}
      </>
    )
  }

  // 次のページのリンク作成
  pages.push(
    <a
      href={`?page=${currentPage + 1}`}
      class="page-link"
      style={currentPage === totalPages ? { display: 'none' } : {}}
    >
      {t('nextPage')} &raquo;
    </a>
  )

  // ページリンクを返却
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {pages}
    </div>
  )
}

