import React from 'react';
import ProyectosTabla from '../../assets/components/ProyectosTabla/ProyectosTabla';

const Projects = () => {
  return (
    <div className="animate-in">
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-primary)' }}>Gestión de Proyectos</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Listado detallado y seguimiento de progreso.</p>
      </header>
      
      <ProyectosTabla />
    </div>
  );
};

export default Projects;