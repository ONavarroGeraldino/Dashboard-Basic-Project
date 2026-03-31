import React, { createContext, useState, useContext, useEffect } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // 1. Cargar datos guardados al iniciar la aplicación
  useEffect(() => {
    const savedProjects = localStorage.getItem('dashboard_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Proyectos de ejemplo iniciales (opcional)
      const defaultProjects = [
        { id: 1, name: "Dashboard UI", client: "Empresa X", status: "Terminado", date: "2026-03-20" },
        { id: 2, name: "App Móvil", client: "Cliente Y", status: "En Progreso", date: "2026-03-25" }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('dashboard_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  // 2. Función para GUARDAR cambios en LocalStorage automáticamente
  const updateAndPersist = (newProjectsList) => {
    setProjects(newProjectsList);
    localStorage.setItem('dashboard_projects', JSON.stringify(newProjectsList));
  };

  // --- OPERACIONES CRUD ---

  // CREATE: Agregar proyecto
  const addProject = (project) => {
    const newProject = { 
      ...project, 
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0] // Fecha actual YYYY-MM-DD
    };
    updateAndPersist([...projects, newProject]);
  };

  // DELETE: Eliminar proyecto
  const deleteProject = (id) => {
    const filtered = projects.filter(p => p.id !== id);
    updateAndPersist(filtered);
  };

  // UPDATE: Modificar proyecto existente
  const updateProject = (id, updatedData) => {
    const updatedList = projects.map(p => p.id === id ? { ...p, ...updatedData } : p);
    updateAndPersist(updatedList);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Hook personalizado para usar el contexto de proyectos
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de un ProjectProvider");
  }
  return context;
};