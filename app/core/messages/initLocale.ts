import i18next from 'i18next'
import jaTranslations from './locales/ja.js'
import enTranslations from './locales/en.js'

const initLocale = () => {
  i18next.init({
    lng: 'ja',
    fallbackLng: 'ja',
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
