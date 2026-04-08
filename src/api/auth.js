import { apiFetch } from './config';

export const login = async (correo, password) => {
  return await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ correo, password }),
  });
};

export const register = async (userData) => {
  return await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getProfile = async () => {
  return await apiFetch('/api/auth/profile', {
    method: 'GET',
  });
};
