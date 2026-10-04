import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskApi, errMsg } from '../services/api';
import { Alert, Loading } from '../components/Badges';
const empty = { title: '', description: '', category: '', deadline: '', priority: 'Medium', status: 'Pending' };
export default function TaskForm() {
  const { id } = useParams(); const nav = useNavigate();
  const [f, setF] = useState(empty); const [err, setErr] = useState(''); const [loading, setLoading] = useState(!!id); const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (id) taskApi.get(id).then(r => { const t = r.data.task; setF({ ...t, deadline: t.deadline.slice(0, 10) }); }).catch(e => setErr(errMsg(e))).finally(() => setLoading(false));
  }, [id]);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!f.title.trim()) return setErr('Title is required');
    if (!f.deadline || isNaN(new Date(f.deadline))) return setErr('Please choose a valid deadline');
    setBusy(true);
    const body = { title: f.title, description: f.description, category: f.category || 'General', deadline: f.deadline, priority: f.priority, status: f.status };
    try { id ? await taskApi.update(id, body) : await taskApi.create(body); nav('/tasks'); } catch (x) { setErr(errMsg(x)); setBusy(false); }
  };
  if (loading) return <Loading />;
  return (
    <form className="card auth wide" onSubmit={submit}>
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2><Alert msg={err} />
      <input placeholder="Task title *" value={f.title} onChange={set('title')} />
      <textarea placeholder="Description" rows="3" value={f.description} onChange={set('description')} />
      <input placeholder="Goal / category" value={f.category} onChange={set('category')} />
      <label>Deadline<input type="date" value={f.deadline} onChange={set('deadline')} /></label>
      <label>Priority<select value={f.priority} onChange={set('priority')}><option>Low</option><option>Medium</option><option>High</option></select></label>
      <label>Status<select value={f.status} onChange={set('status')}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label>
      <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save Task'}</button>
    </form>
  );
}
