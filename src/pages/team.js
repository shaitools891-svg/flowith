import { getTeamData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';
import { observeForAnimation, slideIn } from '../utils/animations.js';

export const renderTeam = async () => {
    const teamData = await getTeamData();
    if (!teamData) return `<p>${getText('error_loading_data')}</p>`;
    
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('team_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('team_subtitle')}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            ${teamData.map((member, index) => `
                <div class="team-card opacity-0 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style="--stagger-index: ${index};">
                    <div class="h-48 bg-slate-200 flex items-center justify-center">
                        <i data-lucide="user-circle-2" class="w-24 h-24 text-slate-400"></i>
                        <!-- In a real scenario, replace with: <img src="${member.imageUrl}" alt="${member['name_' + state.currentLanguage]}" class="w-full h-full object-cover"> -->
                    </div>
                    <div class="p-6 text-center">
                        <h3 class="text-xl font-semibold text-slate-800">${member['name_' + state.currentLanguage]}</h3>
                        <p class="text-blue-500 font-medium">${member['role_' + state.currentLanguage]}</p>
                        <p class="mt-4 text-sm text-slate-600">${member['bio_' + state.currentLanguage]}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setTimeout(() => {
        const cards = container.querySelectorAll('.team-card');
        cards.forEach(card => {
            observeForAnimation(card, () => {
                const index = parseInt(card.style.getPropertyValue('--stagger-index'));
                slideIn(card, { y: 40, duration: 0.5, delay: index * 0.1 });
            });
        });
    }, 100);

    return container.outerHTML;
};
