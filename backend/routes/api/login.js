const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

router.post('/', async (req,res, next) => {
	if(!req.body.username) {
		return res.send({'code':204, 'error': 'username is required'});
	}
	if(!req.body.password) {
		return res.send({'code':204, 'error': 'password is required'});
	}
	User.findOne({'username': req.body.username})
	.then((user) => {
		if(user!== null && user.checkPassword(req.body.password)) {
			req.session.user = user;
			res.send({'code': 200, 'success': 'login successful', user: user });
		} else if(user == null) {
			res.send({'code': 204, 'success': 'user not found'});
		}
	})
	
})

module.exports = router;