import type { Context } from 'hono'
import initLocale from '../../core/messages/initLocale.js'
import z from 'zod'
import { t } from 'i18next'
import {
  loginable,
  authPassword,
  createLoginLog,
} from '../../app/services/authService.js'
import {
  LoginPageView,
} from '../../app/views/authView.js'

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
  // 言語ファイル取得
  initLocale(c)

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
      return c.json({
        message: t('validationFailed'),
        errors: validated.error.issues.map(issue => issue.message),
      })
    }
    const { userid, password } = validated.data
    const ip: string = c.get('ip')

    // ログイン試行回数確認
    if (await loginable(userid, ip)) {
      return c.json({
        message: t('loginAttemptExceeded'),
      }, 401)
    }

    // パスワード認証
    if (await authPassword(userid, password)) {
      // 認証成功
      await createLoginLog(userid, ip, true)
      const session = c.get('session')
      await session.set('userid', userid)
      return c.json({
        message: t('loginSuccess'),
      })
    } else {
      // 認証失敗
      await createLoginLog(userid, ip, false)
      return c.json({
        message: t('loginFailed'),
      }, 401)
    }
  } catch (e) {
    return c.json({
      message: t('unknownServerError'),
      error: e instanceof Error ? e.message : 'unknown error',
    }, 500)
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
  // 言語ファイル取得
  initLocale(c)

  const session = c.get('session')
  session.deleteSession()
  return c.json({
    message: t('logout'),
  })
}
