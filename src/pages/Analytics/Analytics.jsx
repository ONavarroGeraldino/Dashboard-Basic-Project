import React from 'react';
import ChartCard from '../../assets/components/ChartCard/ChartCard';


const Analytics = () => {
  return (
    <div className="analytics-page animate-in">
      <div className="dashboard-grid">
         {/* Aquí podrías poner cards de "Tasa de Rebote", "Tiempo en Sesión", etc. */}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <ChartCard title="Tráfico de Redes" />
        <ChartCard title="Conversiones" />
      </div>
    </div>
  );
};

export default Analytics;