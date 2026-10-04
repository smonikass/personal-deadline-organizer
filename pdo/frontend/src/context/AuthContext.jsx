import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';
const Ctx = createContext();
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    authApi.me().then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);
  const login = async (email, password) => { const { data } = await authApi.login({ email, password }); localStorage.setItem('token', data.token); setUser(data.user); };
  const register = async f => { const { data } = await authApi.register(f); localStorage.setItem('token', data.token); setUser(data.user); };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return <Ctx.Provider value={{ user, setUser, loading, login, register, logout }}>{children}</Ctx.Provider>;
}
