import type { FC } from 'hono/jsx'

type HeadProps = {
  title: string
}

export const Head: FC<HeadProps> = (props) => {
  const title = props.title + ' - ' + 'emo-base'
  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{ title }</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/css/dist/style.css" />
      </head>
    </>
  )
}
