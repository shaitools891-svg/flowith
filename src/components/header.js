import { getText, toggleLanguage } from '../context/language_manager.js';
import { state } from '../state.js';

export const renderHeader = () => {
    const header = document.getElementById('app-header');
    
    const navItems = [
        { href: '#/home', key: 'nav_home' },
        { href: '#/about', key: 'nav_about' },
        { href: '#/team', key: 'nav_team' },
        { href: '#/programs', key: 'nav_programs' },
        { href: '#/calendar', key: 'nav_calendar' },
        { href: '#/gallery', key: 'nav_gallery' },
        { href: '#/postponed', key: 'nav_postponed' },
        { href: '#/contact', key: 'nav_contact' },
    ];
    
    header.innerHTML = `
        <nav class="glassmorphism shadow-md">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <a href="#/home" class="flex-shrink-0 flex items-center space-x-2">
                        <span class="text-3xl">💖</span>
                        <span class="text-xl font-bold text-gray-800">${getText('org_name')}</span>
                    </a>
                    <div class="hidden md:flex items-center space-x-6">
                        ${navItems.map(item => `
                            <a href="${item.href}" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700">${getText(item.key)}</a>
                        `).join('')}
                    </div>
                    <div class="flex items-center">
                         <button id="lang-switcher" class="border-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors duration-300
                            ${state.currentLanguage === 'en' ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-transparent text-gray-600'}"
                         >
                            ${state.currentLanguage === 'en' ? 'বাংলা' : 'English'}
                         </button>
                         <div class="md:hidden ml-4">
                            <button id="mobile-menu-button" class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                <i data-lucide="menu" class="h-6 w-6"></i>
                            </button>
                         </div>
                    </div>
                </div>
            </div>
            <!-- Mobile menu, show/hide based on menu state. -->
            <div id="mobile-menu" class="md:hidden hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    ${navItems.map(item => `
                        <a href="${item.href}" class="nav-link mobile-nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700">${getText(item.key)}</a>
                    `).join('')}
                </div>
            </div>
        </nav>
    `;

    lucide.createIcons();
    
    document.getElementById('lang-switcher').addEventListener('click', toggleLanguage);
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
        });
    });
};
