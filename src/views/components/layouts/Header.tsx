import type { FC } from 'hono/jsx';
import { t } from 'i18next';
import { Button } from '../buttons/Button.js';
import { Logo } from '../images/Logo.js';

/**
 * 引数型
 */
type HeaderProps = {
  loginUserName?: string;
};

/**
 * 共通ヘッダー
 * @param {string} loginUserName
 * @returns FunctionComponent
 */
export const Header: FC<HeaderProps> = (props) => {
  return (
    <header
      class={`
        flex justify-between items-center
        px-8 py-4
        bg-white
      `}
    >
      <Logo href="/cms" extendClass="h-10 hover:brightness-90" />
      {props.loginUserName ? (
        <form
          class="flex items-center gap-2"
          action="/auth/logout"
          method="post"
        >
          <p>{ props.loginUserName } さん</p>
          <Button type="submit">
            { t('logout') }
          </Button>
        </form>
      ) : (<></>)}
    </header>
  );
};
