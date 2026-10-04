const User = require('../models/User');
const pub = u => ({ id: u._id, name: u.name, email: u.email, createdAt: u.createdAt });
exports.getProfile = (req, res) => res.json({ user: pub(req.user) });
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Invalid email' });
    if (email && email.toLowerCase() !== req.user.email && await User.findOne({ email: email.toLowerCase() }))
      return res.status(400).json({ message: 'Email already exists' });
    if (name) req.user.name = name;
    if (email) req.user.email = email;
    await req.user.save();
    res.json({ user: pub(req.user) });
  } catch (e) { next(e); }
};
