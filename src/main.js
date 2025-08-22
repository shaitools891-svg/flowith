import { initRouter } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initLanguageManager } from './context/language_manager.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initLanguageManager();
        
        renderHeader();
        renderFooter();
        
        initRouter();
        
        lucide.createIcons();
    } catch (error) {
        console.error("Failed to initialize the application:", error);
        document.getElementById('app-main').innerHTML = `
            <div class="text-center text-red-500">
                <h1 class="text-2xl font-bold">Application Failed to Load</h1>
                <p>Please try refreshing the page. If the problem persists, contact support.</p>
            </div>
        `;
    }
});
