import type { Context } from 'hono';
import { Header } from './components/header.js'

export const getHealthPage = (c: Context) => {
  return c.render(
    <html>
      <Header title="Health" />
      <body>
        <h1>It works!</h1>
      </body>
    </html>
  )
}
