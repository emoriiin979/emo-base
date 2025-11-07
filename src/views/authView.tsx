import { t } from 'i18next';
import { App } from './components/layouts/App.js';
import { Button } from './components/buttons/Button.js';
import { ErrorMessage } from './components/messages/ErrorMessage.js';
import { Divider } from './components/spaces/Divider.js';
import { Logo } from './components/images/Logo.js';
import { TextBoxSet } from './components/forms/TextBoxSet.js';
import { SocialButton } from './components/buttons/SocialButton.js';

/**
 * 引数型
 */
type Props = {
  userid: string;
  password: string;
  useridError?: string;
  passwordError?: string;
  loginError?: string;
}

/**
 * ログインページ
 * @param {string} props.userid - required
 * @param {string} props.password - required
 * @param {string} props.useridError
 * @param {string} props.passwordError
 * @param {string} props.loginError
 * @returns {JSX.Element}
 */
export const loginView = (props: Props) => (
  <App title="Login">
    <main
      class={`
        flex flex-1 justify-center items-center
        px-6 py-8 m-2
        bg-main-light
      `}
    >
      <div
        class={`
          bg-white backfrop-blur-sm
          rounded-2xl
          p-10
          shadow-[0 20px 40px rgba(0, 0, 0, 0.1)]
          w-full max-w-96
        `}
      >
        <div class="flex justify-center mb-8">
          <Logo extendClass="opacity-80 max-w-64 h-auto" />
        </div>
        <form action="/auth" method="post">
          <TextBoxSet
            id="userid"
            extendClass="mb-8"
            placeholder={ t('userid') }
            defaultValue={ props.userid }
            errorMessage={ props.useridError }
          />
          <TextBoxSet
            id="password"
            extendClass="mb-8"
            placeholder={ t('password') }
            defaultValue={ props.password }
            masked={ true }
            errorMessage={ props.passwordError }
          />
          <Button type="submit" extendClass="mt-4 w-full">
            { t('login') }
          </Button>
          {props.loginError && (
            <ErrorMessage extendClass="my-4">
              { props.loginError }
            </ErrorMessage>
          )}
        </form>
        <Divider extendClass="my-8" />
        <SocialButton sns="google" text={ t('googleLogin') } />
      </div>
    </main>
  </App>
);
