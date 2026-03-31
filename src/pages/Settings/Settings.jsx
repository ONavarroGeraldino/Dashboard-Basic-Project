import React, { useState } from 'react'; 
import './Settings.css';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

const Settings = () => {
  const { user, updateUser } = useUser();
  const { addToast } = useToast();
  
  // Ahora useState funcionará perfectamente
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
      avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=4318ff&color=fff`
    });
    
    addToast("¡Perfil actualizado con éxito!", "success");
  };

  return (
    <div className="settings-container animate-in">
      <div className="settings-card">
        <div className="settings-header">
          <h3>Configuración del Perfil</h3>
          <p>Gestiona tu información personal y cómo te ven los demás.</p>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Público</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              placeholder="tu@email.com"
            />
          </div>

          <button type="submit" className="save-btn">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;