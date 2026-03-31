import React from 'react';
import './Card.css';

const Card = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card">
      <div 
        className="icon-container" 
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>
      <div className="card-info">
        <span className="card-title">{title}</span>
        <h2 className="card-value">{value}</h2>
      </div>
    </div>
  );
};

export default Card;