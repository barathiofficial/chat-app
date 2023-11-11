const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	otp: {
		type: String
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
})

schema.set('toJSON', {
	transform: (doc, { __v, ...rest }, options) => {
		rest.id = rest._id
		delete rest._id
		return rest
	}
})

module.exports = mongoose.model('User', schema, 'users')
