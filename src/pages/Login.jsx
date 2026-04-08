import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const resp = await login(formData.correo, formData.password);
      if (resp.token && resp.user) {
        await loginContext(resp.token, resp.user);
        toast.success(`Bienvenido/a de nuevo!`);
        navigate('/profile');
      } else {
        toast.error('Error al recibir token');
      }
    } catch (error) {
      toast.error(error.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="card auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <LogIn size={32} />
          </div>
          <h1 className="auth-title">Iniciar Sesión</h1>
          <p className="auth-subtitle">Ingresa para pedir tu bajada favorita</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              name="correo" 
              className="form-input" 
              placeholder="tu@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Iniciando...' : 'Ingresar'}
          </button>
        </form>

        <div className="auth-footer">
          ¿No tienes una cuenta? <Link to="/register" className="auth-link">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
