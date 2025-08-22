import { getGalleryData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';
import { observeForAnimation, slideIn } from '../utils/animations.js';

export const renderGallery = async () => {
    const galleryData = await getGalleryData();
    if (!galleryData) return `<p>${getText('error_loading_data')}</p>`;
    
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('gallery_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('gallery_subtitle')}</p>
        </div>
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            ${galleryData.map((item, index) => `
                <div class="gallery-item opacity-0 break-inside-avoid" style="--stagger-index: ${index};">
                    <div class="bg-slate-200 rounded-lg shadow-md overflow-hidden group cursor-pointer relative">
                         <div class="w-full h-64 bg-slate-300 flex items-center justify-center">
                            <i data-lucide="image" class="w-16 h-16 text-slate-400"></i>
                         </div>
                         <!-- Real implementation: <img class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" src="${item.imageUrl}" alt="${item['caption_' + state.currentLanguage]}"> -->
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4">
                            <p class="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">${item['caption_' + state.currentLanguage]}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    setTimeout(() => {
        const items = container.querySelectorAll('.gallery-item');
        items.forEach(item => {
            observeForAnimation(item, () => {
                const index = parseInt(item.style.getPropertyValue('--stagger-index'));
                slideIn(item, { y: 40, duration: 0.5, delay: index * 0.05 });
            });
        });
    }, 100);

    return container.outerHTML;
};
