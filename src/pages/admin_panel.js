import { getProgramsData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';

export const renderAdminPanel = async () => {
    const programs = await getProgramsData();

    const container = document.createElement('div');
    container.className = 'space-y-12';
    container.innerHTML = `
        <h1 class="text-3xl font-bold text-slate-800">${getText('admin_panel_title')}</h1>

        <!-- Add Program Update -->
        <section class="bg-white p-8 rounded-xl shadow-lg">
            <h2 class="text-2xl font-semibold text-slate-700">${getText('admin_add_update')}</h2>
            <form id="update-form" class="mt-6 space-y-4">
                <div>
                    <label for="program-select" class="block text-sm font-medium text-gray-700">${getText('admin_select_program')}</label>
                    <select id="program-select" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        ${programs.map(p => `<option value="${p.id}">${p.title_en} / ${p.title_bn}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label for="update-text-en" class="block text-sm font-medium text-gray-700">Update (English)</label>
                    <textarea id="update-text-en" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                 <div>
                    <label for="update-text-bn" class="block text-sm font-medium text-gray-700">Update (Bengali)</label>
                    <textarea id="update-text-bn" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <div>
                    <label for="update-date" class="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" id="update-date" value="${new Date().toISOString().split('T')[0]}" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                </div>
                <button type="button" id="generate-update-btn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">${getText('admin_generate_json')}</button>
            </form>
            <div id="update-output" class="mt-4 hidden">
                <label class="block text-sm font-medium text-gray-700">${getText('admin_copy_json')}</label>
                <textarea readonly id="update-json-output" class="w-full h-32 mt-1 font-mono text-sm bg-slate-100 p-2 rounded-md"></textarea>
            </div>
        </section>

        <!-- Add Gallery Image -->
        <section class="bg-white p-8 rounded-xl shadow-lg">
            <h2 class="text-2xl font-semibold text-slate-700">${getText('admin_add_gallery')}</h2>
            <form id="gallery-form" class="mt-6 space-y-4">
                 <div>
                    <label for="gallery-image-url" class="block text-sm font-medium text-gray-700">Image Filename (e.g., photo.jpg)</label>
                    <input type="text" id="gallery-image-url" placeholder="Uploaded file name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                     <p class="text-xs text-gray-500 mt-1">Upload image to <code>src/assets/images/gallery/</code> folder in GitHub first, then enter filename here.</p>
                </div>
                <div>
                    <label for="gallery-caption-en" class="block text-sm font-medium text-gray-700">Caption (English)</label>
                    <input type="text" id="gallery-caption-en" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="gallery-caption-bn" class="block text-sm font-medium text-gray-700">Caption (Bengali)</label>
                    <input type="text" id="gallery-caption-bn" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                </div>
                <button type="button" id="generate-gallery-btn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">${getText('admin_generate_json')}</button>
            </form>
            <div id="gallery-output" class="mt-4 hidden">
                <label class="block text-sm font-medium text-gray-700">${getText('admin_copy_json')}</label>
                <textarea readonly id="gallery-json-output" class="w-full h-32 mt-1 font-mono text-sm bg-slate-100 p-2 rounded-md"></textarea>
            </div>
        </section>
    `;

    setTimeout(() => {

        container.querySelector('#generate-update-btn').addEventListener('click', () => {
            const date = container.querySelector('#update-date').value;
            const text_en = container.querySelector('#update-text-en').value;
            const text_bn = container.querySelector('#update-text-bn').value;

            const jsonObject = { date, text_en, text_bn };
            const jsonString = JSON.stringify(jsonObject, null, 4);

            const outputContainer = container.querySelector('#update-output');
            const outputTextarea = container.querySelector('#update-json-output');
            outputTextarea.value = jsonString;
            outputContainer.classList.remove('hidden');
        });


        container.querySelector('#generate-gallery-btn').addEventListener('click', () => {
            const imageUrl = `src/assets/images/gallery/${container.querySelector('#gallery-image-url').value}`;
            const caption_en = container.querySelector('#gallery-caption-en').value;
            const caption_bn = container.querySelector('#gallery-caption-bn').value;
            

            const newId = new Date().getTime(); 

            const jsonObject = { id: newId, imageUrl, caption_en, caption_bn };
            const jsonString = JSON.stringify(jsonObject, null, 4);

            const outputContainer = container.querySelector('#gallery-output');
            const outputTextarea = container.querySelector('#gallery-json-output');
            outputTextarea.value = jsonString;
            outputContainer.classList.remove('hidden');
        });
    }, 100);

    return container.outerHTML;
};
