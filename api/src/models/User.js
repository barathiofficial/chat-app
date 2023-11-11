const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String,
			unique: true
		},
		socketId: {
			type: String,
			default: null
		},
		status: {
			type: String,
			default: 'offline'
		},
		otp: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

schema.set('toJSON', {
	transform: (doc, { __v, ...rest }, options) => {
		rest.id = rest._id
		delete rest._id
		return rest
	}
})

module.exports = mongoose.model('User', schema, 'users')
