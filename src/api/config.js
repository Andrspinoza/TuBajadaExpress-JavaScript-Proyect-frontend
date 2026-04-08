export const API_URL = 'https://tubajadaexpress-javascript-proyect.onrender.com';

// Wrapper para hacer fetch con el token incluido si existe
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Mezclar headers de options con los defauls
  const headers = { ...defaultHeaders, ...options.headers };
  
  // Si mandamos FormData no seteamos el Content-Type para que el browser ponga el boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si no es ok (200-299), lanzamos un error que podamos capturar luego
  if (!response.ok) {
    let errorMsg = 'Error en la petición';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorData.error || errorMsg;
    } catch (e) {
      // no era json
    }
    throw new Error(errorMsg);
  }

  // Algunas respuestas como bodiless responses (204) o simples strings no son json
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
};
