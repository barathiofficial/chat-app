const { registerHandler, sendOtpHandler, verifyOtpHandler } = require('../controllers/user.controller')

const router = require('express').Router()

router.post('/register', registerHandler)
router.post('/send_otp', sendOtpHandler)
router.post('/verify_otp', verifyOtpHandler)

module.exports = router
