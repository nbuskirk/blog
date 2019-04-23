const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');


router.post('/', (req,res, next) => {
	const { body } = req;
	console.log('SERVER - USER CREATE');
	const newUser = new User(body);
	return newUser.save()
		.then(() => res.json({user: newUser.toJSON()}))
		.catch(next);
})

router.get('/', (req,res,next) => {
	console.log('SERVER - USER LIST');
	return User.find()
		.sort({ createdAt: 'descending' })
		.then((users) => res.json({users: users}))
		.catch(next);
});
router.get('/:id', function(req,res, next) {
	console.log('SERVER - USER FIND BY ID');
	return User.findOne({_id: req.params.id})
		.then((user) => res.json({user: user}))
		.catch(next);
})
router.delete('/:id', (req,res,next) => {
	console.log('SERVER - USER DELETE BY ID')	
	return User.findOneAndDelete({_id: req.params.id})
		.then(() => res.status(200).json({
			message: 'User Deleted'
		}))
		.catch(next);
})

module.exports = router;