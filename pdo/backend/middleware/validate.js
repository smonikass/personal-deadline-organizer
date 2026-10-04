const emailRe = /^\S+@\S+\.\S+$/;
exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
  if (!emailRe.test(email)) return res.status(400).json({ message: 'Invalid email' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  next();
};
exports.task = (req, res, next) => {
  const { title, deadline, priority, status } = req.body;
  if (!title || !String(title).trim()) return res.status(400).json({ message: 'Title is required' });
  if (!deadline || isNaN(new Date(deadline))) return res.status(400).json({ message: 'Invalid deadline' });
  if (priority && !['Low', 'Medium', 'High'].includes(priority)) return res.status(400).json({ message: 'Invalid priority' });
  if (status && !['Pending', 'In Progress', 'Completed'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  next();
};
