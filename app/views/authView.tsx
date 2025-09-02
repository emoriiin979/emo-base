import { t } from 'i18next'
import { Head } from '@emo-components/index.js'

/**
 * 引数型
 */
type Props = {
  userid: string
  password: string
  useridError?: string
  passwordError?: string
  loginError?: string
}

/**
 * ログインページ
 * @param c Context
 * @returns 
 */
export const LoginPageView = (props: Props) => {
  return (
    <html>
      <Head title="Login" />
      <body>
        <main class="login-main">
          <div class="login-container">
            <div class="login-header">
              <img src="/img/logo.svg" alt="Logo" />
            </div>

            <form action="/auth" method="post">
              <div class="form-group">
                <input 
                  type="text" 
                  id="userid" 
                  name="userid" 
                  placeholder={t('userid')}
                  value={props.userid}
                />
                {props.useridError && (
                  <p class="error-message">{props.useridError}</p>
                )}
              </div>
              <div class="form-group">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder={t('password')}
                  value={props.password}
                />
                {props.passwordError && (
                  <p class="error-message">{props.passwordError}</p>
                )}
              </div>
              <button type="submit" class="submit-btn">
                {t('login')}
              </button>
              {props.loginError && (
                <p class="error-message">{props.loginError}</p>
              )}
            </form>
            
            <div class="divider"></div>
            
            <div class="social-login">
              <button type="button" class="social-btn" disabled>
                <span class="google-icon"></span>
                {t('googleLogin')}
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}