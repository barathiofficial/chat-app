const nodemailer = require('nodemailer')
const config = require('../config')

const transporter = nodemailer.createTransport(config.smtp)

const mailOptions = {
	from: `"Chat App <${config.smtp.auth.user}>"`
}

const sendOTP = async (email) => {
	const otp = Math.floor(100000 + Math.random() * 900000)
	const options = {
		to: email,
		subject: 'OTP for registration',
		text: `Your OTP for registration is ${otp}`,
		html: `Your OTP for registration is ${otp}`
	}
	await transporter.sendMail(options)
	return otp
}

const sendMail = async (options) => {
	await transporter.sendMail({ ...mailOptions, ...options })
}

module.exports = { sendMail, sendOTP }
