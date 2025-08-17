import type { Context } from 'hono';
import { Header } from '../components/Header.js'

const LoginPage = (c: Context) => {
  return c.render(
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
              />
            </div>
            <div class="form-group">
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="パスワード"
              />
            </div>
            <button type="submit" class="submit-btn">
              ログイン
            </button>
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

export default LoginPage
