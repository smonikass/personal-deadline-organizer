import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskApi, errMsg } from '../services/api';
import { deadlineState, fmt } from '../services/deadline';
import { Alert, Loading, Priority, Status } from '../components/Badges';
const FILTERS = ['All', 'Pending', 'In Progress', 'Completed', 'Overdue', 'High', 'Medium', 'Low'];
const PR = { High: 3, Medium: 2, Low: 1 };
export default function Tasks() {
  const [tasks, setTasks] = useState(null); const [err, setErr] = useState('');
  const [q, setQ] = useState(''); const [filter, setFilter] = useState('All'); const [sort, setSort] = useState('deadline');
  const load = () => taskApi.list().then(r => setTasks(r.data.tasks)).catch(e => setErr(errMsg(e)));
  useEffect(() => { load(); }, []);
  const shown = useMemo(() => {
    if (!tasks) return [];
    const s = q.toLowerCase();
    return tasks.filter(t => (t.title + ' ' + t.description).toLowerCase().includes(s)).filter(t =>
      filter === 'All' ? true : ['Pending', 'In Progress', 'Completed'].includes(filter) ? t.status === filter :
      filter === 'Overdue' ? deadlineState(t).cls === 'overdue' : t.priority === filter
    ).sort((a, b) => sort === 'deadline' ? new Date(a.deadline) - new Date(b.deadline) : sort === 'priority' ? PR[b.priority] - PR[a.priority] : new Date(b.createdAt) - new Date(a.createdAt));
  }, [tasks, q, filter, sort]);
  const act = async fn => { try { await fn(); await load(); } catch (e) { setErr(errMsg(e)); } };
  if (!tasks) return err ? <Alert msg={err} /> : <Loading />;
  return (
    <>
      <div className="row between"><h1>My Tasks</h1><Link className="btn" to="/tasks/new">+ Add Task</Link></div>
      <Alert msg={err} />
      <div className="row">
        <input placeholder="Search title or description…" value={q} onChange={e => setQ(e.target.value)} />
        <select value={filter} onChange={e => setFilter(e.target.value)}>{FILTERS.map(f => <option key={f}>{f}</option>)}</select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="deadline">Sort: Deadline</option><option value="priority">Sort: Priority</option><option value="created">Sort: Created date</option>
        </select>
      </div>
      {shown.length === 0 && <div className="card muted">No tasks found.</div>}
      {shown.map(t => (
        <div className="card task" key={t._id}>
          <div className="row between"><Link to={`/tasks/${t._id}`}><h3>{t.title}</h3></Link><div><Priority p={t.priority} /> <Status task={t} /></div></div>
          <p>{t.description}</p>
          <small className="muted">{t.category} · Due {fmt(t.deadline)} · {t.status} · Created {fmt(t.createdAt)}</small>
          <div className="row">
            {t.status !== 'Completed' && <button className="btn sm" onClick={() => act(() => taskApi.complete(t._id))}>✓ Complete</button>}
            <Link className="btn sm secondary" to={`/tasks/${t._id}/edit`}>Edit</Link>
            <button className="btn sm danger" onClick={() => window.confirm('Delete this task?') && act(() => taskApi.remove(t._id))}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
