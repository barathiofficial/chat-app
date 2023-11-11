import http from './http'

export const register = (user) => {
	return http.post('user/register', {
		name: user.name,
		email: user.email
	})
}

export const verifyOtp = (user) => {
	return http.post('user/verify_otp', {
		email: user.email,
		otp: user.otp
	})
}

export const sendOtp = (user) => {
	return http.post('user/send_otp', {
		email: user.email
	})
}

export const searchUser = (query, cancelToken) => {
	return http.get(`user/search?query=${query}`, { cancelToken })
}
