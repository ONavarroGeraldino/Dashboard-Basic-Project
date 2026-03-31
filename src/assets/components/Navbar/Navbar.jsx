import React from 'react';
// Importamos solo de los Contextos (eliminamos la carpeta hooks)
import { useTheme } from '../../../context/ThemeContext';
import { useUser } from '../../../context/UserContext';
import { Search, Bell, Settings, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ pageTitle = "Dashboard" }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser(); // Traemos los datos de Oswaldo desde el contexto
  const { searchQuery, setSearchQuery } = useUser();

  return (
    <nav className="navbar">
      {/* Lado Izquierdo: Breadcrumbs y Título */}
      <div className="navbar-left">
        <span className="breadcrumb">Páginas / {pageTitle}</span>
        <h1 className="nav-title">{pageTitle}</h1>
      </div>

      {/* Lado Derecho: Buscador y Acciones */}
      <div className="navbar-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
         <input type="text" placeholder="Buscar proyectos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>

        <div className="nav-actions">
          {/* BOTÓN DE TEMA: Ahora usa el contexto global */}
          <button 
            onClick={toggleTheme} 
            className="nav-btn theme-toggle" 
            title={theme === 'light' ? "Activar Modo Oscuro" : "Activar Modo Claro"}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="nav-btn" title="Notificaciones">
            <Bell size={20} />
          </button>
          
          <button className="nav-btn" title="Configuración">
            <Settings size={20} />
          </button>
          
          {/* Perfil del Usuario: Los datos vienen de UserContext */}
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <div className="user-avatar">
              <img 
                src={user.avatar} 
                alt="User Avatar" 
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;