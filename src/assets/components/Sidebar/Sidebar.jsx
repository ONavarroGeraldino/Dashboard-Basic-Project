import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, FolderOpen, Settings, LogOut, Gauge, Users, X } from 'lucide-react';
import './Sidebar.css';
import { useAuth } from '../../../context/AuthContext';

// Recibimos isOpen y toggle del padre (Layout o App)
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: '', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'analytics', label: 'Estadísticas', icon: <BarChart3 size={20} /> },
    { id: 'projects', label: 'Proyectos', icon: <FolderOpen size={20} /> },
    { id: 'users', label: 'Gestión de Usuarios', icon: <Users size={20} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (isOpen) toggleSidebar(); // Cerramos la sidebar al cerrar sesión en móvil
  };

  return (
    <>
      {/* Botón para cerrar dentro de la sidebar (solo visible en móvil por CSS) */}
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-logo">
          <h2>Dashboard <Gauge /></h2>
          <button className="close-sidebar" onClick={toggleSidebar}>
            
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id || 'home'}>
                <NavLink 
                  to={`/${item.id}`} 
                  className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
                  onClick={() => isOpen && toggleSidebar()} // Cerramos al hacer clic en un link (móvil)
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Overlay: Fondo oscuro que cierra la sidebar al tocar fuera */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;