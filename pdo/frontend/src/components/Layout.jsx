import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Layout({ children }) {
  const { logout } = useAuth(); const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  const links = [['/dashboard', 'Dashboard'], ['/tasks', 'My Tasks'], ['/tasks/new', 'Add Task'], ['/profile', 'Profile']];
  return (
    <div className="app">
      <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
      <aside className={`sidebar ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <h2>📅 Deadlines</h2>
        {links.map(([to, t]) => <NavLink key={to} to={to} end>{t}</NavLink>)}
        <button className="link" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}</button>
        <button className="link" onClick={() => { logout(); nav('/'); }}>Logout</button>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
