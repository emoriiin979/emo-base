import type { MiddlewareHandler } from 'hono'
import i18next from 'i18next'
import { jaTranslations, enTranslations } from '../../../config/index.js'

const initLocaleMiddleware: MiddlewareHandler = async (c, next) => {
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
  await next()
}

export default initLocaleMiddleware
