import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, Home, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logoutContext } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutContext();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🥡</span>
          <span className="brand-text">Tubajada Express</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links desktop-menu">
          <Link to="/" className="nav-link"><Home size={18} /> Inicio</Link>
          <Link to="/restaurantes" className="nav-link"><ShoppingBag size={18} /> Restaurantes</Link>
          
          <div className="nav-divider"></div>

          {user ? (
            <div className="nav-user">
              <span className="user-greeting">Hola, {user.nombre}</span>
              <Link to="/profile" className="btn btn-outline btn-sm">
                <User size={16} /> Perfil
              </Link>
              {user.rol === 'admin' && (
                <Link to="/admin" className="btn btn-secondary btn-sm">
                  Dashboard Admin
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-primary btn-sm btn-logout">
                <LogOut size={16} /> Salir
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-outline">Ingresar</Link>
              <Link to="/register" className="btn btn-primary">Registrarse</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu fade-in">
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link to="/restaurantes" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Restaurantes</Link>
          
          {user ? (
            <>
              <Link to="/profile" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Mi Perfil</Link>
              {user.rol === 'admin' && (
                <Link to="/admin" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Panel Admin</Link>
              )}
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="mobile-link text-danger">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Ingresar</Link>
              <Link to="/register" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
