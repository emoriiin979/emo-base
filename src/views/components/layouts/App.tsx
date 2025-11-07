import type { FC } from 'hono/jsx';
import type { JSX } from 'hono/jsx/jsx-runtime';

/**
 * 引数型
 */
type AppProps = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

/**
 * アプリ基本構造
 * @param {string} title - required
 * @param {(JSX.Element | JSX.Element[])} children
 * @returns FunctionComponent
 */
export const App: FC<AppProps> = (props) => (
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{ props.title }</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/css/dist/style.css" />
    </head>
    <body
      class={`
        font-display
        min-h-screen
        flex flex-col
        p-0 m-0 box-border
      `}
    >
      { props.children }
    </body>
  </html>
);
