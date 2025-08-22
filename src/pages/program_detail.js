import { getProgramsData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';
import { slideIn, stagger } from '../utils/animations.js';

export const renderProgramDetail = async (programId) => {
    const programsData = await getProgramsData();
    if (!programsData) return `<p>${getText('error_loading_data')}</p>`;

    const program = programsData.find(p => p.id === programId);
    if (!program) return `<p>${getText('programs_not_found')}</p>`;

    const container = document.createElement('div');
    container.innerHTML = `
        <div>
            <a href="#/programs" class="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600 font-semibold">
                <i data-lucide="arrow-left" class="mr-2 h-4 w-4"></i> ${getText('programs_back')}
            </a>
            <div id="program-header" class="opacity-0">
                <h1 class="text-4xl font-bold tracking-tight text-slate-900">${program['title_' + state.currentLanguage]}</h1>
                <p class="mt-4 text-lg text-slate-600">${program['description_' + state.currentLanguage]}</p>
            </div>
            
            <div class="mt-12">
                <h2 class="text-3xl font-bold text-slate-800 border-b pb-4 mb-6">${getText('programs_updates')}</h2>
                <div class="space-y-6">
                    ${program.updates.length > 0 ? program.updates.map(update => `
                        <div class="program-update-item opacity-0 bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                            <p class="font-semibold text-slate-700">${new Date(update.date).toLocaleDateString(state.currentLanguage === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p class="mt-1 text-slate-600">${update['text_' + state.currentLanguage]}</p>
                        </div>
                    `).join('') : `<p class="text-slate-500">${getText('programs_no_updates')}</p>`}
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        slideIn(container.querySelector('#program-header'), { y: -20, duration: 0.5 });
        stagger('.program-update-item', { y: 20, delay: 0.1, duration: 0.4 });
    }, 100);

    return container.outerHTML;
};
