import type { FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';
import { TextBox } from '../inputs/TextBox.js';
import { ErrorMessage } from '../messages/ErrorMessage.js';

/**
 * 引数型
 */
type TextBoxSetProps = {
  id: string;
  extendClass?: string;
  masked?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
};

/**
 * テキストボックス＆エラーメッセージ
 * @param {string} id - required
 * @param {string} extendClass
 * @param {boolean} masked
 * @param {string} placeholder
 * @param {string} defaultValue
 * @param {string} errorMessage
 * @returns FunctionComponent
 */
export const TextBoxSet: FC<TextBoxSetProps> = (props) => {
  const masked = props.masked || false;
  return (
    <div class={ twMerge(``, props.extendClass) }>
      <TextBox
        id={ props.id }
        extendClass="w-full"
        masked={ masked }
        placeholder={ props.placeholder }
        defaultValue={ props.defaultValue }
      />
      {props.errorMessage && (
        <ErrorMessage extendClass="my-4">
          { props.errorMessage }
        </ErrorMessage>
      )}
    </div>
  );
};
