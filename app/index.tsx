import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.render(
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>emo-base</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
})

export default app
