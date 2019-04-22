const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const UserSchema = new Schema({
	username: String,
	password: String
}, { timestamps: true });


UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

UserSchema.pre('save', function(next) {
	if(!this.password) {
		console.log('models/User.js ==== NO PASSWORD PROVIDED ====')
		next()
	} else {
		console.log('models/User.js password in pre-save');
		this.password = this.hashPassword(this.password);
		next()
	}
})

mongoose.model('User', UserSchema);