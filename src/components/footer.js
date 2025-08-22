import { getText } from "../context/language_manager.js";

export const renderFooter = () => {
    const footer = document.getElementById('app-footer');
    footer.innerHTML = `
        <div class="bg-gray-800 text-white">
            <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold">${getText('org_name')}</h3>
                        <p class="mt-2 text-gray-400">${getText('footer_tagline')}</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold">${getText('footer_quick_links')}</h3>
                        <ul class="mt-4 space-y-2">
                            <li><a href="#/about" class="text-gray-400 hover:text-white transition-colors">${getText('nav_about')}</a></li>
                            <li><a href="#/programs" class="text-gray-400 hover:text-white transition-colors">${getText('nav_programs')}</a></li>
                            <li><a href="#/contact" class="text-gray-400 hover:text-white transition-colors">${getText('nav_contact')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold">${getText('footer_follow_us')}</h3>
                        <div class="mt-4 flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="facebook" class="h-6 w-6"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="twitter" class="h-6 w-6"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="youtube" class="h-6 w-6"></i></a>
                        </div>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
                    <p>&copy; ${new Date().getFullYear()} ${getText('org_name')}. ${getText('footer_rights_reserved')}.</p>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
};
