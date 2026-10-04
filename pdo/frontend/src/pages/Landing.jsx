import { Link } from 'react-router-dom';
export default function Landing() {
  const feats = ['Track goals & tasks', 'Priorities & deadlines', 'Overdue & due-soon alerts', 'Search, filter & sort', 'Dark mode'];
  return (
    <div className="landing">
      <h1>📅 Personal Deadline Organizer</h1>
      <p>Manage your goals, tasks and deadlines in one place — and never miss what matters.</p>
      <div className="row center-row">
        <Link className="btn" to="/register">Get Started</Link>
        <Link className="btn secondary" to="/login">Login</Link>
        <Link className="btn secondary" to="/register">Register</Link>
      </div>
      <div className="grid">{feats.map(f => <div className="card" key={f}>{f}</div>)}</div>
    </div>
  );
}
