import type { Context } from 'hono'
import z from 'zod'
import { t } from 'i18next'
import {
  isAccountLock,
  authPassword,
  createLoginLog,
} from '../../app/services/authService.js'
import {
  LoginPageView,
} from '../../app/views/authView.js'
import { CmsView } from '../views/cmsView.js'

/**
 * ログインページ
 * GET /auth
 * @param c Context
 * @returns 
 */
export const loginPage = (c: Context) => {
  return c.render(LoginPageView({
    userid: '',
    password: '',
  }))
}

/**
 * パスワード認証
 * POST /auth
 * @param c Context
 * @returns 
 */
export const loginPassword = async (c: Context) => {
  // スキーマ定義
  const loginSchema = z.object({
    userid: z.string()
      .min(1, t('formRequired', { what: t('userid') })),
    password: z.string()
      .min(1, t('formRequired', { what: t('password') })),
  })
  type formData = z.infer<typeof loginSchema>

  try {
    // 入力情報の取得と検証
    const body: formData = await c.req.parseBody()
    const validated = loginSchema.safeParse(body)
    if (!validated.success) {
      const errorMap: Record<string, string> = {}
      for (const issue of validated.error.issues) {
        if (issue.path && issue.path.length > 0) {
          errorMap[issue.path[0] as string] = issue.message
        }
      }
      return c.render(LoginPageView({
        userid: body.userid,
        password: body.password,
        useridError: errorMap.userid,
        passwordError: errorMap.password,
      }))
    }
    const { userid, password } = validated.data
    const ip: string = c.get('ip')

    // ログイン試行回数確認
    if (await isAccountLock(userid, ip)) {
      return c.render(LoginPageView({
        userid: body.userid,
        password: body.password,
        loginError: t('loginAttemptExceeded'),
      }))
    }

    // パスワード認証
    if (await authPassword(userid, password)) {
      // 認証成功
      await createLoginLog(userid, ip, true)
      const session = c.get('session')
      await session.set('userid', userid)
      return c.redirect('/cms')
    } else {
      // 認証失敗
      await createLoginLog(userid, ip, false)
      return c.render(LoginPageView({
        userid: body.userid,
        password: body.password,
        loginError: t('loginFailed'),
      }))
    }
  } catch (e) {
    return c.render(LoginPageView({
      userid: '',
      password: '',
      loginError: t('unknownServerError'),
    }))
  }
}

/**
 * Google認証ページにリダイレクト
 * GET /auth/google/redirect
 * @param c Context
 * @returns 
 */
export const loginGoogleRedirect = (c: Context) => {
  return c.text('google redirect')
}
 
/**
 * Google認証のコールバック
 * GET /auth/google/callback
 * @param c Context
 * @returns 
 */
export const loginGoogleCallback = (c: Context) => {
  return c.text('google callback')
}

/**
 * ログアウト
 * POST /auth/logout
 * @param c Context
 * @returns
 */
export const logout = (c: Context) => {
  const session = c.get('session')
  session.deleteSession()
  c.set('isLogin', false)
  return c.redirect('/auth')
}
