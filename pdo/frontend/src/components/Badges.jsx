import { deadlineState } from '../services/deadline';
export const Status = ({ task }) => { const s = deadlineState(task); return <span className={`badge ${s.cls}`}>{s.label}</span>; };
export const Priority = ({ p }) => <span className={`badge pr-${p.replace(' ', '')}`}>{p}</span>;
export const Alert = ({ msg }) => msg ? <div className="alert">{msg}</div> : null;
export const Loading = () => <div className="center"><div className="spinner" /><p>Loading…</p></div>;
