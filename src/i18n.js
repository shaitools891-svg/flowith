import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.11.2/+esm';
import { initReactI18next } from 'https://cdn.jsdelivr.net/npm/react-i18next@14.1.1/+esm';
import i18nextHttpBackend from 'https://cdn.jsdelivr.net/npm/i18next-http-backend@2.5.1/+esm';
import i18nextBrowserLanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@7.2.1/+esm';

i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: true,
    }
  });

export default i18next;
