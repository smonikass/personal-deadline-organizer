import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userApi, errMsg } from '../services/api';
import { fmt } from '../services/deadline';
import { Alert } from '../components/Badges';
export default function Profile() {
  const { user, setUser } = useAuth();
  const [f, setF] = useState({ name: user.name, email: user.email }); const [msg, setMsg] = useState(''); const [err, setErr] = useState('');
  const submit = async e => {
    e.preventDefault(); setErr(''); setMsg('');
    if (!f.name.trim()) return setErr('Name is required');
    try { const { data } = await userApi.update(f); setUser(data.user); setMsg('Profile updated ✓'); } catch (x) { setErr(errMsg(x)); }
  };
  return (
    <form className="card auth wide" onSubmit={submit}>
      <h2>Profile</h2><Alert msg={err} />{msg && <div className="alert ok">{msg}</div>}
      <input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Name" />
      <input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="Email" />
      <p className="muted">Member since {fmt(user.createdAt)}</p>
      <button className="btn">Update profile</button>
    </form>
  );
}
