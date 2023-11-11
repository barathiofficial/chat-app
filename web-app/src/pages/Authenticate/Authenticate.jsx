import React from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/user.service'
import style from './authenticate.module.css'

function Authenticate() {
	const navigate = useNavigate()

	const [email, setEmail] = React.useState('')
	const [emailError, setEmailError] = React.useState('')

	const handleEmail = (e) => {
		setEmail(e.target.value)
		setEmailError('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			if (!email.trim()) {
				setEmailError('Email is required')
				return
			}

			await register({ email })

			navigate('/verify_otp/' + email, { replace: true })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={style.container}>
			<form className={style.form_box} onSubmit={handleSubmit}>
				<h2>Register</h2>

				<div className={style.form_group}>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						placeholder='Email'
						autoComplete='email'
						id='email'
						value={email}
						onChange={handleEmail}
					/>
					<span className={style.error}>{emailError}</span>
				</div>

				<div className={style.form_group}>
					<button type='submit'>Continue</button>
				</div>
			</form>
		</div>
	)
}

export default Authenticate
