import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from './locales/de/translations.json'
import en from './locales/en/translations.json'

void i18n.use(initReactI18next).init({
  resources: {
    en,
    de
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
})
