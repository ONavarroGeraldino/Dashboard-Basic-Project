import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, FolderOpen, Settings, LogOut, Gauge, Users } from 'lucide-react';
import './Sidebar.css';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 1. Añadimos el nuevo item aquí para que se renderice con el estilo correcto
  const menuItems = [
    { id: '', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'analytics', label: 'Estadísticas', icon: <BarChart3 size={20} /> },
    { id: 'projects', label: 'Proyectos', icon: <FolderOpen size={20} /> },
    { id: 'users', label: 'Gestión de Usuarios', icon: <Users size={20} /> }, // <-- Nuevo item
    { id: 'settings', label: 'Configuración', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Dashboard <Gauge /></h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id || 'home'}>
              <NavLink 
                to={`/${item.id}`} 
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
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
  );
};

export default Sidebar;