import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './ChartCard.css';

const data = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6000 },
  { name: 'Jun', ventas: 5500 },
];

const ChartCard = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-box">
          <span className="chart-subtitle">Resumen Mensual</span>
          <h3 className="chart-title">Rendimiento de Ventas</h3>
        </div>
        <button className="view-report-btn">Ver Reporte</button>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4318ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4318ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f7fe" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#A3AED0', fontSize: 12}}
              dy={10}
            />
            <YAxis 
              hide={true} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="ventas" 
              stroke="#4318ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVentas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;