import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, Briefcase, Filter } from 'lucide-react';
import './Projects.css';

const ProjectsManager = () => {
  const { projects, addProject, deleteProject } = useProjects();
  const { addToast } = useToast();
  
  // 1. Estados nuevos: uno para el formulario y otro para el FILTRO
  const [newProject, setNewProject] = useState({ name: '', client: '', status: 'Pendiente' });
  const [filter, setFilter] = useState('Todos'); // <--- Estado del filtro

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.client.trim()) return;
    addProject(newProject);
    setNewProject({ name: '', client: '', status: 'Pendiente' });
    addToast("Proyecto creado", "success");
  };

  // 2. Lógica de filtrado: filtramos la lista original antes de mostrarla
  const filteredProjects = projects.filter(p => {
    if (filter === 'Todos') return true;
    return p.status === filter;
  });

  return (
    <div className="projects-manager animate-in">
      <header className="page-header">
        <h2><Briefcase size={24} /> Gestión de Proyectos</h2>
      </header>

      {/* Formulario (se mantiene igual) */}
      <section className="project-form-card">
        <h3>Registrar Nuevo Proyecto</h3>
        <form onSubmit={handleSubmit} className="project-form">
          <input 
            type="text" placeholder="Nombre..." 
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
          />
          <input 
            type="text" placeholder="Cliente..." 
            value={newProject.client}
            onChange={(e) => setNewProject({...newProject, client: e.target.value})}
          />
          <select 
            value={newProject.status}
            onChange={(e) => setNewProject({...newProject, status: e.target.value})}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Terminado">Terminado</option>
          </select>
          <button type="submit" className="btn-add"><Plus size={18} /> Crear</button>
        </form>
      </section>

      {/* --- 3. BARRA DE FILTROS (Los botones para filtrar) --- */}
      <div className="filter-bar">
        <span className="filter-label"><Filter size={16} /> Filtrar por:</span>
        {['Todos', 'Pendiente', 'En Progreso', 'Terminado'].map(status => (
          <button 
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 4. TABLA: Ahora usamos filteredProjects en lugar de projects */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.client}</td>
                  <td>
                    <span className={`status-badge ${p.status.toLowerCase().replace(/\s/g, '-')}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => deleteProject(p.id)} className="btn-delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="empty-msg">No hay proyectos con el estado: {filter}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsManager;