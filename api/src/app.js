const cors = require('cors')
const express = require('express')
const connectDB = require('./db')
const routers = require('./routers')
const config = require('./config')
const http = require('http')
const socket = require('./socket')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routers(app)

const server = new http.Server(app)

server.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`)
	connectDB()
})

socket(server)
