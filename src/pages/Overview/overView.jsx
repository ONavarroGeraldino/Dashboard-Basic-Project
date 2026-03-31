import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { Users, Briefcase, CheckCircle, Clock } from 'lucide-react';
import './overView.css';

const Overview = () => {
  const { users } = useAuth();
  const { projects } = useProjects();

  // Cálculos dinámicos basados en tus datos reales
  const totalUsers = users.length;
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Terminado').length;
  const pendingProjects = projects.filter(p => p.status === 'En Progreso' || p.status === 'Pendiente').length;

  const stats = [
    { id: 1, label: 'Usuarios Totales', value: totalUsers, icon: <Users />, color: '#4318ff' },
    { id: 2, label: 'Proyectos Activos', value: totalProjects, icon: <Briefcase />, color: '#39b8ff' },
    { id: 3, label: 'Completados', value: completedProjects, icon: <CheckCircle />, color: '#05cd99' },
    { id: 4, label: 'Pendientes', value: pendingProjects, icon: <Clock />, color: '#ffd500' },
  ];

  return (
    <div className="overview-container animate-in">
      <header className="overview-header">
        <h1>Panel de Control</h1>
        <p>Bienvenido, aquí tienes el resumen de tu plataforma.</p>
      </header>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí podrías añadir un gráfico pequeño o una lista de actividad reciente */}
    </div>
  );
};

export default Overview;