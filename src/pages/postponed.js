import { getPostponedData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';
import { observeForAnimation, slideIn } from '../utils/animations.js';

export const renderPostponed = async () => {
    const postponedData = await getPostponedData();
    if (!postponedData) return `<p>${getText('error_loading_data')}</p>`;

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('postponed_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('postponed_subtitle')}</p>
        </div>
        <div class="max-w-4xl mx-auto space-y-6">
            ${postponedData.map((plan, index) => `
                <div class="postponed-item opacity-0 bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400" style="--stagger-index: ${index};">
                    <h2 class="text-xl font-semibold text-slate-500 line-through">${plan['title_' + state.currentLanguage]}</h2>
                    <div class="mt-3 pl-4 border-l-2 border-slate-200">
                        <p class="text-sm font-medium text-slate-700">${getText('postponed_reason')}:</p>
                        <p class="text-slate-600">${plan['reason_' + state.currentLanguage]}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setTimeout(() => {
        const items = container.querySelectorAll('.postponed-item');
        items.forEach(item => {
            observeForAnimation(item, () => {
                const index = parseInt(item.style.getPropertyValue('--stagger-index'));
                slideIn(item, { y: 40, duration: 0.5, delay: index * 0.1 });
            });
        });
    }, 100);

    return container.outerHTML;
};
