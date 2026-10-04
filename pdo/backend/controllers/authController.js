const bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const User = require('../models/User');
const sign = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const pub = u => ({ id: u._id, name: u.name, email: u.email, createdAt: u.createdAt });
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(400).json({ message: 'Email already exists' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ token: sign(user._id), user: pub(user) });
  } catch (e) { next(e); }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: sign(user._id), user: pub(user) });
  } catch (e) { next(e); }
};
exports.me = (req, res) => res.json({ user: pub(req.user) });
