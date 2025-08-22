import { getTranslations } from '../api/data_service.js';
import { state } from '../state.js';
import { renderHeader } from '../components/header.js';

let translations = {};

export const initLanguageManager = async () => {
    translations = await getTranslations();
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
};

export const setLanguage = (lang) => {
    if (['en', 'bn'].includes(lang)) {
        state.currentLanguage = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
    }
};

export const toggleLanguage = () => {
    const newLang = state.currentLanguage === 'en' ? 'bn' : 'en';
    setLanguage(newLang);

    renderHeader();

    window.dispatchEvent(new HashChangeEvent('hashchange'));
};

export const getText = (key) => {
    return translations[key]?.[state.currentLanguage] || key;
};
