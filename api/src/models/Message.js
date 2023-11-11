const { default: mongoose } = require('mongoose')

const schema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
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

module.exports = mongoose.model('Message', schema, 'messages')
