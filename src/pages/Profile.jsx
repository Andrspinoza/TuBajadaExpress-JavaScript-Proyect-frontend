import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Shield, MapPin, Mail, Phone } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading-state fade-in">Cargando perfil...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container profile-container fade-in">
      <div className="card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div>
            <h1 className="profile-name">{user.nombre} {user.apellido}</h1>
            <span className="profile-role">
              {user.rol === 'admin' ? <><Shield size={14}/> Administrador</> : 'Cliente'}
            </span>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <Mail className="detail-icon" size={20} />
            <div className="detail-info">
              <span className="detail-label">Correo Electrónico</span>
              <span className="detail-value">{user.correo}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <Phone className="detail-icon" size={20} />
            <div className="detail-info">
              <span className="detail-label">Teléfono</span>
              <span className="detail-value">{user.telefono || 'No registrado'}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <MapPin className="detail-icon" size={20} />
            <div className="detail-info">
              <span className="detail-label">Dirección Principal</span>
              <span className="detail-value">{user.direccion || 'No registrada'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
