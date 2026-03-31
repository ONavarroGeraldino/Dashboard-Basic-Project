import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    addToast("¡Cuenta creada! Ahora puedes iniciar sesión", "success");
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">📝</div>
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} />
            <input 
              type="text" placeholder="Nombre completo" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <Mail size={18} />
            <input 
              type="email" placeholder="Email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" placeholder="Contraseña" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="login-btn">Registrarse <UserPlus size={18} /></button>
        </form>
        <p className="auth-footer" style={{marginTop: '15px'}}>
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} style={{color: 'var(--accent-color)', cursor: 'pointer'}}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Register;