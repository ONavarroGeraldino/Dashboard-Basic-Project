import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom'; // <--- 1. Importamos useNavigate
import { LogIn, Mail, Lock } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate(); // <--- 2. Inicializamos el hook

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ahora usamos la lógica del login que busca en la lista de usuarios
    const result = login(email, password);
    
    if (result.success) {
      addToast("¡Sesión iniciada correctamente!", "success");
      navigate('/'); // Redirige al Dashboard
    } else {
      addToast(result.message, "error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-in">
        <div className="auth-icon">🚀</div>
        <h2>Bienvenido</h2>
        <p>Ingresa al sistema de gestión</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail size={18} />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-btn">
            Iniciar Sesión <LogIn size={18} />
          </button>
        </form>

        {/* --- NUEVA SECCIÓN: BOTÓN A REGISTER --- */}
        <div className="auth-footer">
          <p>¿No tienes una cuenta?</p>
          <button 
            type="button" 
            className="link-btn" 
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;