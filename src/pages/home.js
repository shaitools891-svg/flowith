import { getText } from "../context/language_manager.js";
import { slideIn, stagger } from '../utils/animations.js';

export const renderHome = async () => {
    const container = document.createElement('div');
    container.className = "text-center";
    
    container.innerHTML = `
        <div class="relative overflow-hidden rounded-lg bg-blue-500/10 p-12 flex flex-col items-center justify-center min-h-[60vh]">
             <div class="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom mask-gradient"></div>
            <div class="relative z-10">
                <h1 id="home-title" class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 opacity-0">${getText('org_name')}</h1>
                <p id="home-tagline" class="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto opacity-0">${getText('home_tagline')}</p>
                <div id="home-buttons" class="mt-8 flex justify-center gap-4 opacity-0">
                    <a href="#/about" class="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                        ${getText('home_learn_more')}
                    </a>
                    <a href="#/contact" class="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        ${getText('nav_contact')}
                    </a>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const title = container.querySelector('#home-title');
        const tagline = container.querySelector('#home-tagline');
        const buttons = container.querySelector('#home-buttons');

        slideIn(title, { y: 20, duration: 0.6 });
        slideIn(tagline, { y: 20, delay: 0.2, duration: 0.6 });
        slideIn(buttons, { y: 20, delay: 0.4, duration: 0.6 });
    }, 100);

    return container.outerHTML;
};

const maskGradient = `
    -webkit-mask-image: linear-gradient(to bottom, white 40%, transparent 100%);
    mask-image: linear-gradient(to bottom, white 40%, transparent 100%);
`;
const style = document.createElement('style');
style.innerHTML = `.mask-gradient { ${maskGradient} }`;
document.head.appendChild(style);
