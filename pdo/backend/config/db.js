const mongoose = require('mongoose');
module.exports = async () => {
  try { await mongoose.connect(process.env.MONGODB_URI); console.log('MongoDB connected'); }
  catch (e) { console.error('Database connection error:', e.message); process.exit(1); }
};
