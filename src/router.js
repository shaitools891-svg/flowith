import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderTeam } from './pages/team.js';
import { renderPrograms } from './pages/programs.js';
import { renderProgramDetail } from './pages/program_detail.js';
import { renderCalendar } from './pages/calendar.js';
import { renderGallery } from './pages/gallery.js';
import { renderPostponed } from './pages/postponed.js';
import { renderContact } from './pages/contact.js';
import { renderAdminLogin } from './pages/admin_login.js';
import { renderAdminPanel } from './pages/admin_panel.js';
import { state } from './state.js';
import { fadeIn } from './utils/animations.js';

const routes = {
    '/': renderHome,
    '/home': renderHome,
    '/about': renderAbout,
    '/team': renderTeam,
    '/programs': renderPrograms,
    '/calendar': renderCalendar,
    '/gallery': renderGallery,
    '/postponed': renderPostponed,
    '/contact': renderContact,
    '/admin': () => state.isAdmin ? renderAdminPanel() : renderAdminLogin(),
};

const dynamicRoutes = [
    { path: new RegExp('^/programs/([a-zA-Z0-9-]+)$'), handler: renderProgramDetail }
];

const appMain = document.getElementById('app-main');

const navigate = async (path) => {

    appMain.style.opacity = 0;

    await new Promise(resolve => setTimeout(resolve, 150)); // Short delay for transition effect

    window.scrollTo(0, 0);

    let match;
    const dynamicRoute = dynamicRoutes.find(route => (match = path.match(route.path)));
    
    let content;
    if (dynamicRoute) {
        const param = match[1];
        content = await dynamicRoute.handler(param);
    } else {
        const render = routes[path] || routes['/'];
        content = await render();
    }

    appMain.innerHTML = content;
    fadeIn(appMain);
    lucide.createIcons();
    updateActiveLink();
};

const handleRouting = () => {
    const path = window.location.hash.slice(1) || '/';
    navigate(path);
};

const updateActiveLink = () => {
    const path = window.location.hash.slice(1) || '/home';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = new URL(link.href).hash.slice(1);
        if (linkPath === path || (path === '/' && linkPath === '/home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

export const initRouter = () => {
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
};


window.navigateTo = (path) => {
    window.location.hash = path;
};
