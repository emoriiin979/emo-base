import type { FC } from 'hono/jsx';
import type { JSX } from 'hono/jsx/jsx-runtime';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type ButtonProps = {
  extendClass?: string;
  type?: 'submit' | 'reset' | 'button';
  children: string | JSX.Element | (string | JSX.Element)[];
};

/**
 * 共通ボタン
 * @param {string} extendClass
 * @param {'submit' | 'reset' | 'button'} type
 * @param {(string | JSX.Element | JSX.Element[])} children - required
 * @returns FunctionComponent
 */
export const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      class={ twMerge(`
        px-6 py-3
        text-base font-semibold text-white
        bg-main-dark
        rounded-lg border-none
        transition[all 0.3s ease]
        cursor-pointer
        hover:brightness-90
      `, props.extendClass) }
      type={ props.type }
    >
      { props.children }
    </button>
  )
};
