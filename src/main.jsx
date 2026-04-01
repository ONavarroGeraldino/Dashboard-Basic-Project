import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Importamos todos los providers
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext'; 
import { HashRouter } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProjectProvider> 
            <UserProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </UserProvider>
          </ProjectProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);