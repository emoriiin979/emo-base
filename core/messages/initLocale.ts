import type { Context } from 'hono'
import i18next from 'i18next'
import jaTranslations from './locales/ja.js'
import enTranslations from './locales/en.js'

const initLocale = (c: Context) => {
  i18next.init({
    lng: c.get('language'),
    fallbackLng: c.get('fallbackLanguage'),
    resources: {
      ja: {
        translation: jaTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
  })
}

export default initLocale
