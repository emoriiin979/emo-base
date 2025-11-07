import type { FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type LogoProps = {
  extendClass?: string;
  href?: string;
};

/**
 * ロゴ画像
 * @param {string} extendClass
 * @param {string} href
 * @returns FunctionComponent
 */
export const Logo: FC<LogoProps> = (props) => {
  const imageJsx = (
    <img
      class={ twMerge(``, props.extendClass) }
      src="/img/logo.svg"
      alt="Logo"
    />
  );
  return props.href ? (
    <a href={ props.href }>{ imageJsx }</a>
  ) : (
    imageJsx
  );
};
