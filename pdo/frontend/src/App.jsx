import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import { Login, Register } from './pages/AuthPages';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="center"><div className="spinner" /></div>;
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/tasks" element={<Private><Tasks /></Private>} />
      <Route path="/tasks/new" element={<Private><TaskForm /></Private>} />
      <Route path="/tasks/:id" element={<Private><TaskDetails /></Private>} />
      <Route path="/tasks/:id/edit" element={<Private><TaskForm /></Private>} />
      <Route path="/profile" element={<Private><Profile /></Private>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
