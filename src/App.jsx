import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Sidebar from './assets/components/Sidebar/Sidebar';
import Navbar from './assets/components/Navbar/Navbar';

// Vistas / Páginas
import Overview from './pages/Overview/Overview';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import Projects from './pages/Projects/Projects'; // <--- Nueva Importación

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <Navbar pageTitle="Panel Principal" />
          
          <div className="content-body">
            <Routes>
              {/* Ruta Principal */}
              <Route path="/" element={<Overview />} />
              
              {/* Rutas de Secciones */}
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/projects" element={<Projects />} /> {/* <--- Nueva Ruta */}
              <Route path="/settings" element={<Settings />} />

              {/* Redirección por si escriben mal la URL */}
              <Route path="*" element={<Overview />} /> 
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;