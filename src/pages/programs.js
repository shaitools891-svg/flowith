import { getProgramsData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';
import { observeForAnimation, slideIn } from '../utils/animations.js';

export const renderPrograms = async () => {
    const programsData = await getProgramsData();
    if (!programsData) return `<p>${getText('error_loading_data')}</p>`;

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('programs_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('programs_subtitle')}</p>
        </div>
        <div class="space-y-8">
            ${programsData.map((program, index) => `
                <div class="program-card opacity-0 bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl" style="--stagger-index: ${index};">
                    <div class="p-6 md:p-8">
                        <h2 class="text-2xl font-bold text-slate-800">${program['title_' + state.currentLanguage]}</h2>
                        <p class="mt-3 text-slate-600 leading-relaxed">${program['description_' + state.currentLanguage]}</p>
                        <div class="mt-6">
                            <a href="#/programs/${program.id}" class="inline-flex items-center font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                                ${getText('programs_view_details')} <i data-lucide="arrow-right" class="ml-2 h-4 w-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setTimeout(() => {
        const cards = container.querySelectorAll('.program-card');
        cards.forEach(card => {
            observeForAnimation(card, () => {
                const index = parseInt(card.style.getPropertyValue('--stagger-index'));
                slideIn(card, { y: 40, duration: 0.5, delay: index * 0.1 });
            });
        });
    }, 100);

    return container.outerHTML;
};
