import type { FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';

/**
 * 引数型
 */
type DividerProps = {
  extendClass?: string;
};

/**
 * 分割線
 * @param {string} extendClass
 * @returns FunctionComponent
 */
export const Divider: FC<DividerProps> = (props) => {
  return (
    <div class={ twMerge("h-px bg-[#e1e5e9]", props.extendClass) }></div>
  );
};
