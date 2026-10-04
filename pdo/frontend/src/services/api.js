import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
api.interceptors.request.use(c => { const t = localStorage.getItem('token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c; });
export const errMsg = e => e.response?.data?.message || (e.request ? 'Cannot reach server. Please try again.' : 'Something went wrong');
export const authApi = { register: d => api.post('/auth/register', d), login: d => api.post('/auth/login', d), me: () => api.get('/auth/me') };
export const taskApi = {
  list: () => api.get('/tasks'), get: id => api.get(`/tasks/${id}`), create: d => api.post('/tasks', d),
  update: (id, d) => api.put(`/tasks/${id}`, d), remove: id => api.delete(`/tasks/${id}`), complete: id => api.patch(`/tasks/${id}/complete`),
};
export const userApi = { profile: () => api.get('/users/profile'), update: d => api.put('/users/profile', d) };
