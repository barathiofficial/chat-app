const socketio = require('socket.io')
const verifyUser = require('./middlewares/verifyUser')
const { connectionHandler } = require('./controllers/chat.controller')

module.exports = (server) => {
	const io = socketio(server, {
		cors: {
			origin: '*'
		},
		pingTimeout: 60000
	})

	io.use(verifyUser)

	io.on('connection', connectionHandler)
}
