const mongoose = require('mongoose');

const { Schema } = mongoose;
const PostsSchema = new Schema({
	title: String,
	body: String,
	author: String
}, { timestamps: true });

mongoose.model('Posts', PostsSchema);