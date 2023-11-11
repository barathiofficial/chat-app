const {
	registerHandler,
	sendOtpHandler,
	verifyOtpHandler,
	searchUserHandler
} = require('../controllers/user.controller')

const router = require('express').Router()

router.post('/register', registerHandler)
router.post('/send_otp', sendOtpHandler)
router.post('/verify_otp', verifyOtpHandler)
router.get('/search', searchUserHandler)

module.exports = router
