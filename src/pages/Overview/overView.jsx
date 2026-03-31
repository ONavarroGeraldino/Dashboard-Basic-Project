import React from 'react';
import Card from '../../assets/components/Card/Card';

import ProyectosTabla from '../../assets/components/ProyectosTabla/ProyectosTabla';
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import ChartCard from '../../assets/components/ChartCard/ChartCard';

const Overview = () => {
  return (
    <div className="animate-in">
      <div className="dashboard-grid">
        <Card title="Ganancias" value="$34,250" icon={<DollarSign />} color="#4318ff" />
        <Card title="Clientes" value="1,245" icon={<Users />} color="#39b8ff" />
        <Card title="Ventas" value="642" icon={<ShoppingCart />} color="#01b574" />
        <Card title="Actividad" value="+12.5%" icon={<Activity />} color="#ee5d50" />
      </div>

      <div className="main-charts-container">
        <ChartCard />
      </div>

      <ProyectosTabla />
    </div>
  );
};

export default Overview;