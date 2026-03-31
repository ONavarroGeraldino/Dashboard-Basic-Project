import React from 'react';
import { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import { CheckCircle2, Clock, AlertCircle, MoreVertical } from 'lucide-react';
import './ProyectosTabla.css';

const ProyectosTabla = () => {
  const { searchQuery } = useUser();
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const { addToast } = useToast();
  const cambiarFiltro = (estado) => {
    setFiltroEstado(estado);
    addToast(`Filtrando por: ${estado}`, "info");
  };
  
  const proyectos = [
    { id: 1, nombre: "E-commerce App", fecha: "12 Mar 2026", estado: "Completado", progreso: 100 },
    { id: 2, nombre: "Dashboard UI Kit", fecha: "25 Feb 2026", estado: "En Progreso", progreso: 75 },
    { id: 3, nombre: "Landing Page", fecha: "05 Mar 2026", estado: "Pendiente", progreso: 30 },
    { id: 4, nombre: "Mobile Game", fecha: "10 Ene 2026", estado: "Completado", progreso: 100 },
  ];
  const proyectosFiltrados = proyectos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || p.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Completado': return <CheckCircle2 size={16} color="#01b574" />;
      case 'En Progreso': return <Clock size={16} color="#4318ff" />;
      case 'Pendiente': return <AlertCircle size={16} color="#ee5d50" />;
      default: return null;
    }
  };

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <div className="header-left">
          <h3>Proyectos ({proyectosFiltrados.length})</h3>
          
          <div className="filter-buttons">
            {['Todos', 'Completado', 'En Progreso', 'Pendiente'].map((estado) => (
              <button 
                key={estado}
                className={`filter-btn ${filtroEstado === estado ? 'active' : ''}`}
                // 4. Usar la nueva función aquí
                onClick={() => cambiarFiltro(estado)}
              >
                {estado}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-icon"><MoreVertical size={20} /></button>
      </div>
      
      <table className="proyectos-tabla">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>ESTADO</th>
            <th>FECHA</th>
            <th>PROGRESO</th>
          </tr>
        </thead>
        <tbody>
          {proyectosFiltrados.length > 0 ? (
            proyectosFiltrados.map((p) => (
              <tr key={p.id} className="animate-in">
                <td className="proyecto-nombre">{p.nombre}</td>
                <td>
                  <div className="status-badge">
                    {getStatusIcon(p.estado)}
                    <span>{p.estado}</span>
                  </div>
                </td>
                <td className="proyecto-fecha">{p.fecha}</td>
                <td>
                  <div className="progreso-wrapper">
                    <span className="progreso-texto">{p.progreso}%</span>
                    <div className="progreso-bar-bg">
                      <div 
                        className="progreso-bar-fill" 
                        style={{ width: `${p.progreso}%`, backgroundColor: p.progreso === 100 ? '#01b574' : '#4318ff' }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-state">
                No hay proyectos que coincidan con los filtros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProyectosTabla;