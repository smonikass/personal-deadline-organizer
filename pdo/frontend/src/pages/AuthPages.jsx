import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../services/api';
import { Alert } from '../components/Badges';
const re = /^\S+@\S+\.\S+$/;
export function Login() {
  const { login } = useAuth(); const nav = useNavigate();
  const [f, setF] = useState({ email: '', password: '' }); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!re.test(f.email)) return setErr('Enter a valid email');
    if (!f.password) return setErr('Password is required');
    setBusy(true);
    try { await login(f.email, f.password); nav('/dashboard'); } catch (x) { setErr(errMsg(x)); } finally { setBusy(false); }
  };
  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Login</h2><Alert msg={err} />
      <input placeholder="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
      <input type="password" placeholder="Password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
      <button className="btn" disabled={busy}>{busy ? 'Logging in…' : 'Login'}</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </form>
  );
}
export function Register() {
  const { register } = useAuth(); const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' }); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!f.name.trim()) return setErr('Name is required');
    if (!re.test(f.email)) return setErr('Enter a valid email');
    if (f.password.length < 6) return setErr('Password must be at least 6 characters');
    if (f.password !== f.confirm) return setErr('Passwords do not match');
    setBusy(true);
    try { await register({ name: f.name, email: f.email, password: f.password }); nav('/dashboard'); } catch (x) { setErr(errMsg(x)); } finally { setBusy(false); }
  };
  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Register</h2><Alert msg={err} />
      <input placeholder="Name" value={f.name} onChange={set('name')} />
      <input placeholder="Email" value={f.email} onChange={set('email')} />
      <input type="password" placeholder="Password" value={f.password} onChange={set('password')} />
      <input type="password" placeholder="Confirm Password" value={f.confirm} onChange={set('confirm')} />
      <button className="btn" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
