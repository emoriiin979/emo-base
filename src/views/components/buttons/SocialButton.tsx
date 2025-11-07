import type { FC } from 'hono/jsx';

/**
 * SNSリスト
 */
const snsList = {
  google: {
    icon: (
      <span
        class={`
          inline-block
          w-4 h-4
          bg-[#4285f4]
          rounded-xs
        `}
      ></span>
    ),
    text: 'Google',
  },
} as const;

/**
 * 引数型
 */
type SocialButtonProps = {
  sns: keyof typeof snsList;
  text?: string;
  disabled?: boolean;
};

/**
 * SNSボタン
 * @param {string} sns - required
 * @param {boolean} disabled
 * @returns FunctionComponent
 */
export const SocialButton: FC<SocialButtonProps> = (props) => {
  const sns = snsList[props.sns];
  const text = props.text || sns.text;
  const disabled = props.disabled || false;
  return (
    <div class={`flex gap-4`}>
      <button
        class={`
          flex
          flex-1 gap-2 justify-center items-center
          p-3 mb-2
          text-sm font-medium text-center text-[#333] no-underline
          bg-white
          rounded-lg border-2 border-[#e1e5e9] border-solid
          transition-[all 0.3s ease]
          cursor-pointer
          last-child:mb-0
          hover:brightness-90
          disabled:opacity-50 disabled:pointer-events-none
        `}
        type="button"
        disabled={ disabled }
      >
        { sns.icon }
        { text }
      </button>
    </div>
  );
};
