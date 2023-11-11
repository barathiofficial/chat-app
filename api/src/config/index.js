const dotenv = require('dotenv')

dotenv.config()

module.exports = {
	mongoose: {
		url: process.env.MONGODB_URI || ''
	},
	jwt: {
		secret: process.env.JWT_SECRET || ''
	},
	port: process.env.PORT || 3001,
	smtp: {
		host: process.env.MAIL_HOST || '',
		port: parseInt(process.env.MAIL_PORT) || 587,
		secure: JSON.parse(process.env.MAIL_SECURE) || false,
		service: process.env.MAIL_SERVICE || '',
		auth: {
			user: process.env.MAIL_USER || '',
			pass: process.env.MAIL_PASS || ''
		}
	}
}
