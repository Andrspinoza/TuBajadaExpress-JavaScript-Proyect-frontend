import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container fade-in" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>
        Tubajada Express 🥡
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        El mejor delivery para calmar esos antojos. Encuentra tus restaurantes favoritos, promociones exclusivas y pide todo en un solo lugar.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/restaurantes" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Ver Restaurantes
        </Link>
        <Link to="/register" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Home;
