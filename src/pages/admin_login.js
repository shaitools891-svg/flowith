import { state } from '../state.js';
import { getText } from '../context/language_manager.js';
import { slideIn } from '../utils/animations.js';



const PWD_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

export const renderAdminLogin = () => {
    const container = document.createElement('div');
    container.className = 'max-w-md mx-auto mt-10';
    container.innerHTML = `
        <div id="login-card" class="bg-white p-8 rounded-xl shadow-lg opacity-0">
            <h1 class="text-2xl font-bold text-center text-slate-800">${getText('admin_login_title')}</h1>
            <p class="text-center text-slate-500 mt-2">${getText('admin_login_subtitle')}</p>
            <form id="login-form" class="mt-6 space-y-4">
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">${getText('admin_login_password')}</label>
                    <input type="password" id="password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    ${getText('admin_login_button')}
                </button>
            </form>
            <div id="login-feedback" class="mt-4 text-center"></div>
        </div>
    `;

    setTimeout(() => {
        slideIn('#login-card', { y: -50, duration: 0.6 });

        const form = container.querySelector('#login-form');
        const feedback = container.querySelector('#login-feedback');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = container.querySelector('#password').value;
            const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
            const hash = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');

            if (hash === PWD_HASH) {
                state.isAdmin = true;
                window.navigateTo('/admin');
            } else {
                feedback.innerHTML = `<p class="text-red-500">${getText('admin_login_error')}</p>`;
                container.querySelector('#login-card').classList.add('animate-shake');
                setTimeout(() => container.querySelector('#login-card').classList.remove('animate-shake'), 500);
            }
        });
    }, 100);
    

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.5s ease-in-out; }
    `;
    document.head.appendChild(style);

    return container.outerHTML;
};
