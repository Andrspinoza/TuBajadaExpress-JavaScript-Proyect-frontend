import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../api/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar, verificar si hay un token válido
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Obtenemos el perfil para validar el token y obtener datos (rol, nombre)
      const data = await getProfile();
      setUser(data); // data debería tener nombre, correo, rol, etc.
    } catch (error) {
      console.error("Token inválido o expirado");
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginContext = async (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logoutContext = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
