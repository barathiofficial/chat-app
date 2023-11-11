const mongoose = require('mongoose')
const config = require('../config')

module.exports = async function connectDB() {
	try {
		await mongoose.connect(config.mongoose.url)
		console.log('MongoDB connected!')
	} catch (err) {
		console.error(err)
	}
}
