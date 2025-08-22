// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './main.js'; // Import your main App component

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('React app initialized successfully');
