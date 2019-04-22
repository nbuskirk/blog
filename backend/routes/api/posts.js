const mongoose = require('mongoose');
const router = require('express').Router();
const Posts = mongoose.model('Posts');

router.post('/', async (req,res, next) => {

	const { body } = req;
	
	if(!body.title) {
		return res.status(422).json({
			errors: {
				title: 'is required'
			}
		})
	}
	
	if(!body.author) {
		return res.status(422).json({
			errors: {
				author: 'is required'
			}
		})
	}
	
	if(!body.body) {
		return res.status(422).json({
			errors: {
				body: 'is required'
			}
		})
	}

	const finalPost = new Posts(body);
	return finalPost.save()
		.then(() => res.json({post: finalPost.toJSON()}))
		.catch(next);

})

router.get('/:id', function(req,res, next) {
	return Posts.findOne({_id: req.params.id})
		.then((post) => res.json({post: post}))
		.catch(next);
})

router.delete('/:id', (req,res,next) => {
	return Posts.findOneAndDelete({_id: req.params.id})
		.then(() => res.status(200).json({
			message: 'Post Deleted'
		}))
		.catch(next);
})

router.get('/', (req,res,next) => {
	console.log(req.session);
	return Posts.find()
		.sort({ createdAt: 'descending' })
		.then((posts) => res.json({posts: posts}))
		.catch(next);
});

module.exports = router;