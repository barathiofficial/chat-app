const config = require('../config')
const User = require('../models/User')
const { sendOTP } = require('../services/mail.service')
const jwt = require('jsonwebtoken')
const { pick } = require('../utils/helpers')

const registerHandler = async (req, res) => {
	try {
		const { name, email } = req.body

		if (!name || !email) {
			return res.status(400).send({
				error: 'Name or email missing'
			})
		}

		const otp = await sendOTP(email)

		const user = await User.create({
			name,
			email,
			otp
		})

		res.status(201).send({
			user: pick(user.toJSON(), ['name', 'email', 'createdAt'])
		})
	} catch (error) {
		res.status(500).send({
			error: error.message
		})
	}
}

const sendOtpHandler = async (req, res) => {
	try {
		const { email } = req.body

		if (!email) {
			return res.status(400).send({
				error: 'Email missing'
			})
		}

		const otp = await sendOTP(email)

		await User.findOneAndUpdate({ email }, { otp })

		res.status(201).send({
			message: 'OTP sent'
		})
	} catch (error) {
		res.status(500).send({
			error: error.message
		})
	}
}

const verifyOtpHandler = async (req, res) => {
	try {
		const { email, otp } = req.body

		console.log(req.body)

		if (!email || !otp) {
			return res.status(400).send({
				error: 'Email or OTP missing'
			})
		}

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).send({
				error: 'User not found'
			})
		}

		if (user.otp !== otp) {
			return res.status(401).send({
				error: 'OTP is incorrect'
			})
		}

		const token = jwt.sign({ id: user.id }, config.jwt.secret)

		res.status(200)
			.cookie('token', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: true
			})
			.send({
				user: pick(user.toJSON(), ['name', 'email', 'createdAt'])
			})
	} catch (error) {
		res.status(500).send({
			error: error.message
		})
	}
}

module.exports = {
	registerHandler,
	sendOtpHandler,
	verifyOtpHandler
}
