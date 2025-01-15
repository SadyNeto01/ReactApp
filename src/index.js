import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';


// Encontre o elemento root no HTML
const rootElement = document.getElementById('root');

// Crie a instância de root com createRoot
const root = ReactDOM.createRoot(rootElement);

// Renderize o componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
