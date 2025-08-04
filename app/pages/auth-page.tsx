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
      </body>
    </html>
  )
}
