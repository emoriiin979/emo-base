import type { FC } from 'hono/jsx'

type HeaderProps = {
  isLogin: boolean
}

/**
 * 共通ヘッダー
 * @param props HeaderProps
 * @returns FunctionComponent
 */
export const Header: FC<HeaderProps> = (props) => {
  return (
    <header>
      {props.isLogin ? (
        <form action="/auth/logout" method="post" style={{ display: 'inline' }}>
          <button type="submit" class="logout-btn">
            ログアウト
          </button>
        </form>
      ) : (<></>)}
    </header>
  )
}
