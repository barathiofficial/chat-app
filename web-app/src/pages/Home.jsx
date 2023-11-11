import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './Home.css'

const socket = io('http://localhost:3001', {
	extraHeaders: {
		authorization: 'Bearer adjbfjdjfbjdfbj'
	}
})

function Home() {
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault()
		socket.emit('message', { name, message })
		setMessage('')
	}

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message])
		})

		socket.on('connect', () => {
			console.log('connected')
		})

		socket.on('disconnect', () => {
			console.log('disconnected')
		})

		socket.on('connect_error', (error) => {
			console.log(error)
		})

		socket.on('message', (error) => {
			console.log(error)
		})
	}, [])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={name}
					placeholder='Your name'
					onChange={(event) => setName(event.target.value)}
				/>
				<input
					type='text'
					value={message}
					placeholder='Your message'
					onChange={(event) => setMessage(event.target.value)}
				/>
				<button type='submit'>Send</button>
			</form>
			<ul>
				{messages.map((message, index) => (
					<li key={index}>
						{message.name}: {message.message}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Home
