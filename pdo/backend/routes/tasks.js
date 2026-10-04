const r = require('express').Router(), c = require('../controllers/taskController');
const { protect, validId } = require('../middleware/auth'), v = require('../middleware/validate');
r.use(protect);
r.route('/').get(c.list).post(v.task, c.create);
r.route('/:id').get(validId, c.get).put(validId, v.task, c.update).delete(validId, c.remove);
r.patch('/:id/complete', validId, c.complete);
module.exports = r;
