import { Head } from '../../core/components/Head.js'
import { Header } from '../../core/components/Header.js'

export const HealthPageView = () => {
  const isLogin = false
  return (
    <html>
      <Head title="Health" />
      <body>
        <Header isLogin={isLogin}/>
        <h1>It works!</h1>
      </body>
    </html>
  )
}
