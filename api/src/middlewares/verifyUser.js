const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

const verifyUser = async (socket, next) => {
	try {
		const token = socket.handshake.auth.token

		if (!token) {
			throw new Error('Token missing')
		}

		socket.user = jwt.verify(token, config.jwt.secret)

		next()
	} catch (error) {
		console.log(error)
		next(error)
	}
}

module.exports = verifyUser
