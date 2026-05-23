import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { Users, Briefcase, CheckCircle, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './overView.css';

const Overview = () => {
  const { users } = useAuth();
  const { projects } = useProjects();

  // --- LÓGICA DE DATOS ---
  const totalUsers = users.length;
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Terminado').length;
  const pendingProjects = projects.filter(p => p.status === 'En Progreso' || p.status === 'Pendiente').length;

  // Datos para la gráfica (mapeamos los estados actuales)
  const chartData = [
    { name: 'Pendientes', cantidad: projects.filter(p => p.status === 'Pendiente').length, color: '#ffd500' },
    { name: 'En Progreso', cantidad: projects.filter(p => p.status === 'En Progreso').length, color: '#39b8ff' },
    { name: 'Terminados', cantidad: completedProjects, color: '#05cd99' },
  ];

  const stats = [
    { id: 1, label: 'Usuarios Totales', value: totalUsers, icon: <Users />, color: '#4318ff' },
    { id: 2, label: 'Proyectos Activos', value: totalProjects, icon: <Briefcase />, color: '#39b8ff' },
    { id: 3, label: 'Completados', value: completedProjects, icon: <CheckCircle />, color: '#05cd99' },
    { id: 4, label: 'Pendientes', value: pendingProjects, icon: <Clock />, color: '#ffd500' },
  ];

  return (
    <div className="overview-container animate-in">
      <header className="overview-header">
        <div className="header-text">
          <h1>Panel de Control</h1>
          <p>Bienvenido, Oswaldo. Aquí tienes el resumen real de tu plataforma.</p>
        </div>
        <button className="view-report-btn">Descargar Reporte</button>
      </header>

      {/* 1. SECCIÓN DE ESTADÍSTICAS (Cards) */}
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

      <div className="main-charts-section">
        {/* 2. SECCIÓN DE GRÁFICA */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <span className="chart-subtitle">Estado de Flujo</span>
              <h3 className="chart-title"><TrendingUp size={18} /> Proyectos por Estado</h3>
            </div>
          </div>
          <div className="chart-container" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3aed0', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3aed0', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="cantidad" radius={[10, 10, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. SECCIÓN DE TABLA RECIENTE */}
        <div className="tabla-container">
          <div className="tabla-header">
            <h3>Proyectos Recientes</h3>
            <button className="btn-icon"><ExternalLink size={18} /></button>
          </div>
          <div className="tabla-wrapper">
            <table className="proyectos-tabla">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>CLIENTE</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id}>
                    <td className="proyecto-nombre">{project.name}</td>
                    <td>{project.client}</td>
                    <td>
                      <span className={`status-badge ${project.status.toLowerCase().replace(/\s/g, '-')}`}>
                         {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;