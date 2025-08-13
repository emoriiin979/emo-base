import type { FC } from 'hono/jsx'

type HeaderProps = {
  title: string;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{props.title} - emo-base</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/style.css" />
    </head>
  )
}
