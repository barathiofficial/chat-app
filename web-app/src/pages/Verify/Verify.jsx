import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { sendOtp, verifyOtp } from '../../services/user.service'
import style from './verify.module.css'

function Authenticate() {
	const params = useParams()
	const { setToken, setUser } = useAuth()

	const email = params.email

	const [otp, setOtp] = React.useState('')
	const [otpError, setOtpError] = React.useState('')

	const handleOtp = (e) => {
		setOtp(e.target.value)
		setOtpError('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			if (!otp.trim()) {
				setOtpError('OTP is required')
				return
			}

			const res = await verifyOtp({ email, otp })

			console.log(res)

			setToken(res.data.token)
			setUser(res.data.user)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSendOtp = async (e) => {
		e.preventDefault()

		try {
			await sendOtp({ email })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={style.container}>
			<form className={style.form_box} onSubmit={handleSubmit}>
				<h2>Verify OTP</h2>

				<div className={style.form_group}>
					<label htmlFor='otp'>OTP</label>
					<input
						type='number'
						placeholder='OTP'
						autoComplete='otp'
						id='otp'
						value={otp}
						onChange={handleOtp}
					/>
					<span className={style.error}>{otpError}</span>
				</div>

				<div className={style.form_group}>
					<button type='submit'>Continue</button>
				</div>

				<div className={style.form_group}>
					<button type='button' onClick={handleSendOtp}>
						Resend OTP
					</button>
				</div>
			</form>
		</div>
	)
}

export default Authenticate
