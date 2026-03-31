import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import UsersManager from './pages/Users/UsersManager'; // Asegúrate de haber creado esta carpeta y archivo

function App() {
  const { user, loading } = useAuth();

  // 1. Evitamos parpadeos mientras se lee el localStorage
  if (loading) {
    return <div className="loading-screen">Cargando Dashboard...</div>;
  }

  return (
    <Routes>
      {/* 2. RUTAS PÚBLICAS: Solo accesibles si NO estás logueado */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/" />} 
      />

      {/* 3. RUTAS PRIVADAS: Solo accesibles si SÍ estás logueado */}
      <Route 
        path="/*" 
        element={
          user ? (
            <div className="dashboard-container">
              <Sidebar />
              <main className="main-content">
                <Navbar pageTitle="Panel Principal" />
                
                <div className="content-body">
                  <Routes>
                    {/* Inicio del Dashboard */}
                    <Route path="/" element={<Overview />} />
                    
                    {/* Secciones del Dashboard */}
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/users" element={<UsersManager />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* Redirección automática si la sub-ruta no existe */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </main>
            </div>
          ) : (
            /* Si intenta entrar a cualquier ruta privada sin user, va al Login */
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
}

export default App;