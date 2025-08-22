import { getEventsData } from '../api/data_service.js';
import { getText, state } from '../context/language_manager.js';

export const renderCalendar = async () => {
    const eventsData = await getEventsData();
    if (!eventsData) return `<p>${getText('error_loading_data')}</p>`;

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">${getText('calendar_title')}</h1>
            <p class="mt-4 text-lg text-slate-600">${getText('calendar_subtitle')}</p>
        </div>
        <div id="calendar-container" class="bg-white p-4 md:p-6 rounded-xl shadow-lg"></div>
        
        <!-- Modal -->
        <div id="event-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 hidden z-50">
            <div id="modal-content" class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all opacity-0 -translate-y-4">
                <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i data-lucide="x" class="h-6 w-6"></i>
                </button>
                <h2 id="modal-title" class="text-2xl font-bold text-slate-800"></h2>
                <p id="modal-date" class="text-slate-500 mt-2"></p>
                <p id="modal-details" class="text-slate-600 mt-4"></p>
            </div>
        </div>
    `;

    setTimeout(() => {
        const calendarEl = container.querySelector('#calendar-container');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: state.currentLanguage,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
            },
            events: eventsData.map(event => ({
                id: event.id,
                title: event['title_' + state.currentLanguage],
                start: event.start,
                end: event.end,
                extendedProps: {
                    details_en: event.details_en,
                    details_bn: event.details_bn
                }
            })),
            eventClick: function(info) {
                showModal(info.event);
            }
        });
        calendar.render();
        lucide.createIcons();

        const modal = container.querySelector('#event-modal');
        const modalContent = container.querySelector('#modal-content');
        const closeModalBtn = container.querySelector('#close-modal');

        const showModal = (event) => {
            container.querySelector('#modal-title').textContent = event.title;
            const start = event.start.toLocaleString(state.currentLanguage === 'bn' ? 'bn-BD' : 'en-US', { dateStyle: 'full', timeStyle: 'short' });
            container.querySelector('#modal-date').textContent = start;
            container.querySelector('#modal-details').textContent = event.extendedProps['details_' + state.currentLanguage];
            
            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('opacity-0', '-translate-y-4');
                modalContent.classList.add('opacity-100', 'translate-y-0');
            }, 10);
        };

        const hideModal = () => {
            modalContent.classList.add('opacity-0', '-translate-y-4');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        closeModalBtn.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

    }, 100);

    return container.outerHTML;
};
