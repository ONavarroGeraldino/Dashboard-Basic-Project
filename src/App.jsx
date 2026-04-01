import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Menu } from 'lucide-react'; // Importamos el icono del menú
import './App.css';

// --- COMPONENTES DE INTERFAZ ---
import Sidebar from './assets/components/Sidebar/Sidebar';
import Navbar from './assets/components/Navbar/Navbar';

// --- PÁGINAS / VISTAS ---
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Overview from './pages/Overview/Overview';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import Projects from './pages/Projects/ProjectsManager';
import UsersManager from './pages/Users/UsersManager';

function App() {
  const { user, loading } = useAuth();
  
  // 1. Estado para controlar la Sidebar en móviles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return <div className="loading-screen">Cargando Dashboard...</div>;
  }

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/" />} 
      />

      {/* RUTAS PRIVADAS */}
      <Route 
        path="/*" 
        element={
          user ? (
            <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-active' : ''}`}>
              
              {/* Botón Hamburguesa: Visible solo en móviles por CSS */}
              <button className="hamburger-menu" onClick={toggleSidebar}>
                <Menu size={24} />
              </button>

              {/* Sidebar: Ahora recibe las props de estado */}
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              
              <main className="main-content">
                {/* Pasamos toggleSidebar a la Navbar por si quieres poner el botón ahí también */}
                <Navbar pageTitle="Panel Principal" toggleSidebar={toggleSidebar} />
                
                <div className="content-body">
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/users" element={<UsersManager />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </main>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
}

export default App;