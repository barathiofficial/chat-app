import React from 'react'
import useLocalState from '../hooks/useLocalState'

const Context = React.createContext(null)

const AuthProvider = ({ children }) => {
	const [token, setToken] = useLocalState('token', null)
	const [user, setUser] = useLocalState('user', null)

	return <Context.Provider value={{ token, setToken, user, setUser }}>{children}</Context.Provider>
}

const useAuth = () => {
	const auth = React.useContext(Context)

	if (!auth) {
		throw new Error('useAuth must be used within a AuthProvider')
	}

	return auth
}

export { AuthProvider, useAuth }
