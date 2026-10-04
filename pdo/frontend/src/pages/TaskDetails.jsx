import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskApi, errMsg } from '../services/api';
import { fmt, deadlineState, rel } from '../services/deadline';
import { Alert, Loading, Priority, Status } from '../components/Badges';
export default function TaskDetails() {
  const { id } = useParams(); const nav = useNavigate();
  const [t, setT] = useState(null); const [err, setErr] = useState('');
  useEffect(() => { taskApi.get(id).then(r => setT(r.data.task)).catch(e => setErr(errMsg(e))); }, [id]);
  if (err) return <Alert msg={err} />;
  if (!t) return <Loading />;
  const s = deadlineState(t);
  return (
    <div className="card">
      <h1>{t.title}</h1><Priority p={t.priority} /> <Status task={t} />
      <p>{t.description || <span className="muted">No description</span>}</p>
      <p><b>Category:</b> {t.category}</p><p><b>Deadline:</b> {fmt(t.deadline)} {s.days !== null && `(${rel(s.days)})`}</p>
      <p><b>Status:</b> {t.status}</p><p><b>Created:</b> {fmt(t.createdAt)} · <b>Updated:</b> {fmt(t.updatedAt)}</p>
      <div className="row">
        <Link className="btn" to={`/tasks/${id}/edit`}>Edit</Link>
        <button className="btn secondary" onClick={() => nav('/tasks')}>Back</button>
      </div>
    </div>
  );
}
