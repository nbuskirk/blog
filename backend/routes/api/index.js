const router = require('express').Router();

router.use('/posts', require('./posts'));
router.use('/user', require('./user'));
module.exports = router;