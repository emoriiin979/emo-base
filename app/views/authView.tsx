import { Header } from './components/Header.js'

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
      <Header title="Login" />
      <body>
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
                placeholder="ユーザーID"
                value={props.userid}
              />
              {props.useridError && (
                <div class="error-message">{props.useridError}</div>
              )}
            </div>
            <div class="form-group">
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="パスワード"
                value={props.password}
              />
              {props.passwordError && (
                <div class="error-message">{props.passwordError}</div>
              )}
            </div>
            <button type="submit" class="submit-btn">
              ログイン
            </button>
            {props.loginError && (
              <div class="error-message">{props.loginError}</div>
            )}
          </form>
          
          <div class="divider"></div>
          
          <div class="social-login">
            <a href="/auth/google/redirect" class="social-btn" disabled>
              <span class="google-icon"></span>
              Googleでログイン
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}