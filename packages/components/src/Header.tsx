import type { FC } from 'hono/jsx'
import { t } from 'i18next'

type HeaderProps = {
  loginUserName?: string
}

/**
 * 共通ヘッダー
 * @param props HeaderProps
 * @returns FunctionComponent
 */
export const Header: FC<HeaderProps> = (props) => {
  return (
    <header>
      <a href="/cms">
        <img src="/img/logo.svg" alt="Logo" />
      </a>
      {props.loginUserName ? (
        <form action="/auth/logout" method="post">
          <p>
            {props.loginUserName} さん
          </p>
          <button type="submit" class="btn">
            {t('logout')}
          </button>
        </form>
      ) : (<></>)}
    </header>
  )
}
