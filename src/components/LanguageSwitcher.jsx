import { useTranslation } from 'https://cdn.jsdelivr.net/npm/react-i18next@14.1.1/+esm';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => changeLanguage('en')} 
        disabled={i18n.language.startsWith('en')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('bn')} 
        disabled={i18n.language.startsWith('bn')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${i18n.language.startsWith('bn') ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        BN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
