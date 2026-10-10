import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/inter';
import { inject } from '@vercel/analytics';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

const raiz = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No build o HTML já vem pré-renderizado (scripts/prerender.mjs): só hidrata.
if (raiz.firstElementChild) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);

// Visitas anônimas, sem cookies. Ative em Vercel → projeto → Analytics.
inject();
