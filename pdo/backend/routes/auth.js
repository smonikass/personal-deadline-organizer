const r = require('express').Router(), c = require('../controllers/authController');
const { protect } = require('../middleware/auth'), v = require('../middleware/validate');
r.post('/register', v.register, c.register); r.post('/login', c.login); r.get('/me', protect, c.me);
module.exports = r;
