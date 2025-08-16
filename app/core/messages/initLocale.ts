import i18next from 'i18next'

const initLocale = () => {
  i18next.init({
    lng: 'ja',
    fallbackLng: 'ja',
    resources: {
      ja: {
        translation: {
          loginAttemptExceeded: 'ログイン試行回数が上限に達しました',
          loginFailed: 'ログインに失敗しました',
          loginSuccess: 'ログインに成功しました',
        },
      },
      en: {
        translation: {
          loginAttemptExceeded: 'Login attempt exceeded',
          loginFailed: 'Login failed',
          loginSuccess: 'Login success',
        },
      },
    },
  })
}

export default initLocale
