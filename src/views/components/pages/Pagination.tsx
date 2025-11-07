import type { FC } from 'hono/jsx';
import { t } from 'i18next';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

/**
 * ページリンクCSS
 */
const pageLinkClass = `
  bg-item border-none lounded-lg
  px-6 py-3
  text-black text-base font-normal no-underline whitespace-nowrap
  cursor-pointer transition[all 0.3s ease]
  hover:brightness-90
  disabled:pointer-events-none disabled:opacity-50
`;

/**
 * ページネーション
 * @param {number} currentPage - required
 * @param {number} totalPages - required
 * @returns FunctionComponent
 */
export const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPages } = props;
  const pages = [];

  // 最初のページへのリンク作成
  pages.push(
    <button
      type="button"
      onclick="location.href='?page=1'"
      class={ twMerge(pageLinkClass, "mr-4 h-full") }
      disabled={ currentPage === 1 }
    >
      &laquo; {t('firstPage')}
    </button>
  );

  // 前のページのリンク作成
  pages.push(
    <button
      type="button"
      onclick={ `location.href='?page=${currentPage - 1}'` }
      class={ twMerge(pageLinkClass, "mr-4 h-full") }
      disabled={ currentPage === 1 }
    >
      &laquo; {t('prevPage')}
    </button>
  );

  // ページ番号の範囲計算
  const maxVisible = 3;
  const halfVisible = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - halfVisible);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  // ページリンクを生成
  if (start > 1) {
    pages.push(
      <span class="mr-4 px-1">...</span>
    );
  }
  for (let i = start; i <= end; i++) {
    pages.push(
      <>
        {i === currentPage ? (
          <span
            class={ twMerge(pageLinkClass, `
              mr-4 h-full
              bg-main-dark text-white font-semibold
              pointer-events-none
            `) }
          >
            {i}
          </span>
        ) : (
          <button
            type="button"
            onclick={ `location.href='?page=${i}'` }
            class={ twMerge(pageLinkClass, "mr-4 h-full") }
          >
            {i}
          </button>
        )}
      </>
    );
  }
  if (end < totalPages) {
    pages.push(
      <span class="mr-4 px-1">...</span>
    );
  }

  // 次のページのリンク作成
  pages.push(
    <button
      type="button"
      onclick={ `location.href='?page=${currentPage + 1}'` }
      class={ twMerge(pageLinkClass, "mr-4 h-full") }
      disabled={ currentPage === totalPages }
    >
      {t('nextPage')} &raquo;
    </button>
  );

  // 最後ページのリンク作成
  pages.push(
    <button
      type="button"
      onclick={ `location.href='?page=${totalPages}'` }
      class={ twMerge(pageLinkClass, "h-full") }
      disabled={ currentPage === totalPages }
    >
      {t('lastPage')} &raquo;
    </button>
  );

  // ページリンクを返却
  return (
    <div class="flex flex-none justify-center items-center">
      {pages}
    </div>
  );
};
