import { t } from 'i18next';
import { App } from './components/layouts/App.js';
import { Header } from './components/layouts/Header.js';
import { Pagination } from './components/pages/Pagination.js';
import { Prisma, type User } from '../models/generated/index.js';

/**
 * 引数型
 */
type ContentWithUser = Prisma.ContentGetPayload<{
  include: { user: true }
}>;

type Props = {
  contents: ContentWithUser[];
  currentPage: number;
  countTotalPages: number;
  loginUser?: User;
};

/**
 * コンテンツ一覧ページ
 * @param {ContentWithUser[]} props.contents - required
 * @param {number} props.currentPage - required
 * @param {number} props.countTotalPages - required
 * @param {User} props.loginUser
 * @returns JSX.Element
 */
export const cmsView = (props: Props) => (
  <App title="CMS">
    <Header loginUserName={ props.loginUser?.name } />
    <main class={`
      flex
      flex-col gap-8 items-center
      w-3xl
      p-8 mx-auto my-0
      bg-[rgba(255, 255, 255, 0.97)]
    `}>
      {props.contents.length === 0 ? (
        <p class="text-center text-[#888888] text-base">
          { t('noData') }
        </p>
      ) : (
        <>
          <Pagination
            currentPage={ props.currentPage }
            totalPages={ props.countTotalPages }
          />
          <ul class="list-none p-0 w-full">
            {props.contents.map(content => (
              <li
                key={ content.id }
                class="px-0 py-4 border-b border-solid border-[#eeeeee]"
              >
                <a
                  href={ `/cms/${content.id}` }
                  class="no-underline hover:brightness-80"
                >
                  <p class="text-main-dark text-xl font-semibold">
                    { content.title }
                  </p>
                  <p class="text-base text-[#666666] mt-1.5 mb-2">
                    {
                      content.user.name
                      + ' - '
                      + content.created_at.toLocaleDateString('ja-JP')
                    }
                  </p>
                </a>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={ props.currentPage }
            totalPages={ props.countTotalPages }
          />
        </>
      )}
    </main>
  </App>
);
