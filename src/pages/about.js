import { getText } from '../context/language_manager.js';
import { slideIn, observeForAnimation } from '../utils/animations.js';

export const renderAbout = () => {
    const container = document.createElement('div');
    container.className = "space-y-16";

    container.innerHTML = `
        <section class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('about_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('about_subtitle')}</p>
        </section>

        <section class="about-section opacity-0">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl font-bold text-slate-800">${getText('about_history_title')}</h2>
                    <p class="mt-4 text-slate-600 leading-relaxed">${getText('about_history_content')}</p>
                </div>
                <div class="rounded-lg bg-slate-200 h-64 flex items-center justify-center">
                    <i data-lucide="landmark" class="w-24 h-24 text-slate-400"></i>
                </div>
            </div>
        </section>

        <section class="about-section opacity-0">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="rounded-lg bg-slate-200 h-64 flex items-center justify-center md:order-last">
                    <i data-lucide="rocket" class="w-24 h-24 text-slate-400"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-slate-800">${getText('about_mission_title')}</h2>
                    <p class="mt-4 text-slate-600 leading-relaxed">${getText('about_mission_content')}</p>
                </div>
            </div>
        </section>

        <section class="about-section opacity-0">
             <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl font-bold text-slate-800">${getText('about_vision_title')}</h2>
                    <p class="mt-4 text-slate-600 leading-relaxed">${getText('about_vision_content')}</p>
                </div>
                <div class="rounded-lg bg-slate-200 h-64 flex items-center justify-center">
                    <i data-lucide="eye" class="w-24 h-24 text-slate-400"></i>
                </div>
            </div>
        </section>
    `;

    setTimeout(() => {
        const sections = container.querySelectorAll('.about-section');
        sections.forEach(section => {
            observeForAnimation(section, () => slideIn(section, { y: 50, duration: 0.8 }));
        });
    }, 100);

    return container.outerHTML;
};
