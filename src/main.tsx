import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initEmailJS } from './services/email-service'

// Initialisation d'EmailJS au démarrage
initEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
