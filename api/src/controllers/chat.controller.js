const Message = require('../models/Message')
const User = require('../models/User')

const connectionHandler = async (socket) => {
	console.log(`New connection ${socket.id}`)

	socket.user = await User.findByIdAndUpdate(socket.user.id, { socketId: socket.id, status: 'online' }, { new: true })

	socket.on('chat', chatHandler(socket))
	socket.on('disconnect', disconnectHandler(socket))
	socket.on('pre_disconnect', disconnectHandler(socket))
}

const disconnectHandler = (socket) => async () => {
	console.log(`Disconnected ${socket.id}`)

	await User.findByIdAndUpdate(socket.user?.id, { socketId: null, status: 'offline' })
	delete socket.user
}

const chatHandler = (socket) => async (chat) => {
	const receiver = await User.findOne({ email: chat.to })

	await Message.create({
		text: chat.text,
		userId: socket.user.id,
		to: receiver.id
	})

	if (receiver.socketId && receiver.status === 'online') {
		socket.to(receiver.socketId).emit('chat', {
			text: chat.text,
			from: socket.user.email
		})
	}
}

module.exports = {
	chatHandler,
	connectionHandler
}
