import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              {/* placeholder para las demaas rutas futuras */}
              <Route path="/restaurantes" element={<div className="container" style={{padding: '3rem 1rem'}}><h2>Página de Restaurantes (Próximamente)</h2></div>} />
            </Routes>
          </main>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: 'var(--success)',
              },
            },
            error: {
              style: {
                background: 'var(--danger)',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
