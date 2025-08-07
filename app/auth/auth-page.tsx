import type { Context } from 'hono';
import { Header } from '../components/header.js'

export const getLoginPage = (c: Context) => {
  return c.render(
    <html>
      <Header
        title="Login"
      />
      <body>
        <h1>Login Page</h1>
        <form action="/auth" method="post">
          <div>
            <label for="userid">ユーザーID:</label>
            <input type="text" id="userid" name="userid" required />
          </div>
          <div>
            <label for="password">パスワード:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">ログイン</button>
        </form>
      </body>
    </html>
  )
}
