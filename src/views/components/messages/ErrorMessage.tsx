import type { FC } from 'hono/jsx';
import type { JSX } from 'hono/jsx/jsx-runtime';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type ErrorMessageProps = {
  extendClass?: string;
  children: String | JSX.Element | JSX.Element[];
};

/**
 * エラーメッセージ
 * @param {string} extendClass
 * @param {(String | JSX.Element | JSX.Element[])} children - required
 * @returns FunctionComponent
 */
export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  return (
    <p
      class={ twMerge(`
        text-red-500 text-base font-medium
        pl-4
      `, props.extendClass) }
    >
      { props.children }
    </p>
  );
};
