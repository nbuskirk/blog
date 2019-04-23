const router = require('express').Router();

router.use('/posts', require('./posts'));
router.use('/user', require('./user'));
router.use('/login', require('./login'));
module.exports = router;