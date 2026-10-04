const day = 86400000;
const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
// Returns { label, cls, days }
export function deadlineState(t) {
  if (t.status === 'Completed') return { label: 'Completed', cls: 'done', days: null };
  const days = Math.round((startOfDay(t.deadline) - startOfDay(new Date())) / day);
  if (days < 0) return { label: 'Overdue', cls: 'overdue', days };
  if (days === 0) return { label: 'Due today', cls: 'today', days };
  if (days <= 3) return { label: 'Due soon', cls: 'soon', days };
  return { label: 'Upcoming', cls: 'upcoming', days };
}
export const fmt = d => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
export const rel = days => days < 0 ? `${-days} day(s) overdue` : days === 0 ? 'Due today' : `Due in ${days} day(s)`;
