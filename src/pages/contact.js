import { getText } from "../context/language_manager.js";
import { slideIn, stagger } from '../utils/animations.js';

export const renderContact = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('contact_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('contact_subtitle')}</p>
        </div>
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div id="contact-form-container" class="opacity-0">
                <form id="contact-form" class="space-y-6 bg-white p-8 rounded-xl shadow-lg">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">${getText('contact_name')}</label>
                        <input type="text" name="name" id="name" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">${getText('contact_email')}</label>
                        <input type="email" name="email" id="email" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700">${getText('contact_message')}</label>
                        <textarea name="message" id="message" rows="4" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                           ${getText('contact_send')}
                        </button>
                    </div>
                </form>
                <div id="form-feedback" class="mt-4"></div>
            </div>
            <div id="contact-info-container" class="opacity-0 space-y-6">
                <div class="contact-info-item bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                        <i data-lucide="mail" class="h-6 w-6"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold">${getText('contact_email_us')}</h3>
                        <p class="text-slate-600">contact@brighthearts.org</p>
                    </div>
                </div>
                <div class="contact-info-item bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                        <i data-lucide="map-pin" class="h-6 w-6"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold">${getText('contact_location')}</h3>
                        <p class="text-slate-600">Dhaka, Bangladesh</p>
                    </div>
                </div>
                 <div class="contact-info-item bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                        <i data-lucide="share-2" class="h-6 w-6"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold">${getText('footer_follow_us')}</h3>
                        <div class="flex space-x-4 mt-2">
                             <a href="#" class="text-slate-500 hover:text-blue-500"><i data-lucide="facebook" class="h-6 w-6"></i></a>
                             <a href="#" class="text-slate-500 hover:text-blue-500"><i data-lucide="twitter" class="h-6 w-6"></i></a>
                             <a href="#" class="text-slate-500 hover:text-blue-500"><i data-lucide="youtube" class="h-6 w-6"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        slideIn('#contact-form-container', { x: -50, duration: 0.7 });
        slideIn('#contact-info-container', { x: 50, duration: 0.7 });
    
        const form = container.querySelector('#contact-form');
        const feedback = container.querySelector('#form-feedback');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            feedback.innerHTML = `
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                    <p class="font-bold">${getText('contact_success_title')}</p>
                    <p>${getText('contact_success_message')}</p>
                </div>
            `;
            form.reset();
            setTimeout(() => feedback.innerHTML = '', 5000);
        });
    }, 100);

    return container.outerHTML;
};
