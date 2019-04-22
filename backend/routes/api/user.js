const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');


router.post('/', (req,res, next) => {

	const { body } = req;
	console.log('User Login');

	const newUser = new User(body);
	return newUser.save()
		.then(() => res.json({user: newUser.toJSON()}))
		.catch(next);
	
})

router.get('/', (req,res,next) => {
	console.log('List Users');
	return User.find()
		.sort({ createdAt: 'descending' })
		.then((users) => res.json({users: users}))
		.catch(next);
});
router.delete('/:id', (req,res,next) => {
	return User.findOneAndDelete({_id: req.params.id})
		.then(() => res.status(200).json({
			message: 'User Deleted'
		}))
		.catch(next);
})

module.exports = router;