import type { Context } from 'hono';
import { Header } from './components/Header.js'

const HealthPage = (c: Context) => {
  return c.render(
    <html>
      <Header title="Health" />
      <body>
        <h1>It works!</h1>
      </body>
    </html>
  )
}

export default HealthPage
