const cors = require('cors')
const express = require('express')
const connectDB = require('./db')
const routers = require('./routers')
const config = require('./config')
const http = require('http')
const socketio = require('socket.io')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routers(app)

const server = new http.Server(app)
const io = socketio(server, {
	cors: {
		origin: '*'
	}
})

server.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`)
	connectDB()
})

io.on('connection', (socket) => {
	console.log(`New connection ${socket.id}`)
	console.log(socket.handshake)

	socket.on('disconnect', () => {
		console.log(`User disconnected ${socket.id}`)
	})
})
