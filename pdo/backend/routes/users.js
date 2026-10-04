const r = require('express').Router(), c = require('../controllers/userController');
const { protect } = require('../middleware/auth');
r.use(protect); r.get('/profile', c.getProfile); r.put('/profile', c.updateProfile);
module.exports = r;
