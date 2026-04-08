import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData);
      toast.success('¡Registro exitoso! Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="card auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus size={32} />
          </div>
          <h1 className="auth-title">Crea tu Cuenta</h1>
          <p className="auth-subtitle">Únete a Tubajada Express</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input 
                type="text" name="nombre" className="form-input" 
                value={formData.nombre} onChange={handleChange} required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido *</label>
              <input 
                type="text" name="apellido" className="form-input" 
                value={formData.apellido} onChange={handleChange} required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico *</label>
            <input 
              type="email" name="correo" className="form-input" 
              value={formData.correo} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña *</label>
            <input 
              type="password" name="password" className="form-input" 
              value={formData.password} onChange={handleChange} required 
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input 
                type="text" name="telefono" className="form-input" 
                value={formData.telefono} onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dirección Principal</label>
              <input 
                type="text" name="direccion" className="form-input" 
                value={formData.direccion} onChange={handleChange} 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{marginTop: '1rem'}}>
            {loading ? 'Registrando...' : 'Completar Registro'}
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes una cuenta? <Link to="/login" className="auth-link">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
