import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskApi, errMsg } from '../services/api';
import { deadlineState, fmt, rel } from '../services/deadline';
import { Alert, Loading, Priority } from '../components/Badges';
export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(null); const [err, setErr] = useState('');
  useEffect(() => { taskApi.list().then(r => setTasks(r.data.tasks)).catch(e => setErr(errMsg(e))); }, []);
  if (err) return <Alert msg={err} />;
  if (!tasks) return <Loading />;
  const st = t => deadlineState(t);
  const stats = [
    ['Total Tasks', tasks.length], ['Pending', tasks.filter(t => t.status === 'Pending').length],
    ['In Progress', tasks.filter(t => t.status === 'In Progress').length], ['Completed', tasks.filter(t => t.status === 'Completed').length],
    ['Overdue', tasks.filter(t => st(t).cls === 'overdue').length], ['High Priority', tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length],
  ];
  const alerts = tasks.filter(t => ['overdue', 'today', 'soon'].includes(st(t).cls)).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const upcoming = tasks.filter(t => t.status !== 'Completed' && st(t).days >= 0).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 5);
  const recent = tasks.slice(0, 5);
  const List = ({ items, empty, showRel }) => items.length ? items.map(t => (
    <div className="item" key={t._id}><Link to={`/tasks/${t._id}`}>{t.title}</Link><span>{showRel ? rel(st(t).days) : fmt(t.deadline)}</span></div>
  )) : <p className="muted">{empty}</p>;
  return (
    <>
      <h1>Welcome, {user.name} 👋</h1>
      <div className="grid">{stats.map(([l, v]) => <div className="card stat" key={l}><b>{v}</b><span>{l}</span></div>)}</div>
      <div className="grid two">
        <div className="card"><h3>🔔 Reminders</h3><List items={alerts} empty="No urgent deadlines 🎉" showRel /></div>
        <div className="card"><h3>Upcoming Deadlines</h3><List items={upcoming} empty="Nothing upcoming" /></div>
        <div className="card"><h3>Recent Tasks</h3>{recent.length ? recent.map(t => <div className="item" key={t._id}><Link to={`/tasks/${t._id}`}>{t.title}</Link><Priority p={t.priority} /></div>) : <p className="muted">No tasks yet. <Link to="/tasks/new">Add one</Link></p>}</div>
      </div>
    </>
  );
}
