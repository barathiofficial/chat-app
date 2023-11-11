import React from 'react'
import io from 'socket.io-client'
import { useAuth } from './AuthProvider'

const SocketContext = React.createContext(null)

const SocketProvider = ({ children }) => {
	const { token } = useAuth()
	const [messages, setMessages] = React.useState([])

	const socket = React.useMemo(() => initSocket(token), [token])

	React.useEffect(() => {
		if (socket) {
			socket.on('chat', (message) => {
				setMessages((messages) => [...messages, message])
			})
		}
	}, [socket])

	React.useEffect(() => {
		if (socket) {
			socket.on('connect_error', (error) => {
				console.log(error)
			})
		}
	}, [socket])

	console.log(messages)

	return <SocketContext.Provider value={{ socket, messages }}>{children}</SocketContext.Provider>
}

const useSocket = () => {
	const socket = React.useContext(SocketContext)

	if (!socket) {
		throw new Error('useSocket must be used within a SocketProvider')
	}

	return socket
}

const initSocket = (token) => {
	return io('http://localhost:3001', {
		auth: {
			token
		}
	})
}

export { SocketProvider, useSocket }
