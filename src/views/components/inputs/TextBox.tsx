import type { FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type TextBoxProps = {
  id: string;
  extendClass?: string;
  masked?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

/**
 * テキストボックス
 * @param {string} id - required
 * @param {string} extendClass
 * @param {boolean} masked
 * @param {string} placeholder
 * @param {string} defaultValue
 * @returns FunctionComponent
 */
export const TextBox: FC<TextBoxProps> = (props) => {
  const masked = props.masked || false;
  return (
    <input
      class={ twMerge(`
        p-4
        border-2 border-solid border-gray-200 rounded-lg
        text-base
        bg-[#f8f9fa]
        transition[all 0.3s ease]
        focus:outline-none focus:border-highlight focus:bg-white
        focus:shadow-[0 0 0 3px rgba(255, 107, 157, 0.1)]
      `, props.extendClass) }
      type={ masked ? 'password' : 'text' }
      id={ props.id }
      name={ props.id }
      placeholder={ props.placeholder }
      value={ props.defaultValue }
    />
  );
};
