import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enBilling from './locales/en/billing.json'
import enDashboard from './locales/en/dashboard.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      billing: enBilling,
      dashboard: enDashboard,
    },
  },
  interpolation: { escapeValue: false },
})

export default i18n
