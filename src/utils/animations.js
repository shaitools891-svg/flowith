import * as framerMotion from 'https://esm.run/framer-motion';

const { animate } = framerMotion;

export const fadeIn = (element, options = {}) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) return;
    
    animate(element, { opacity: [0, 1] }, { duration: 0.5, ...options });
};

export const slideIn = (element, { x = 0, y = 0, duration = 0.5, delay = 0, ...rest }) => {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) return;
    
    element.style.opacity = 0; // Ensure it's hidden before animation
    animate(
        element,
        { x: [x, 0], y: [y, 0], opacity: [0, 1] },
        { duration, delay, ease: 'easeOut', ...rest }
    );
};

export const stagger = (selector, { x = 0, y = 0, duration = 0.5, delay = 0.1, ...rest }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
        el.style.opacity = 0;
        slideIn(el, { x, y, duration, delay: i * delay, ...rest });
    });
};

export const observeForAnimation = (element, animationCallback, options = { threshold: 0.1 }) => {
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animationCallback();
                observerInstance.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(element);
};
