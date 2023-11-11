import axios from 'axios'
import React from 'react'
import { useSocket } from '../../context/SocketProvider'
import { searchUser } from '../../services/user.service'
import style from './home.module.css'

function Home() {
	const { socket, messages } = useSocket()

	const cancelToken = React.useRef(null)

	const [search, setSearch] = React.useState('')
	const [message, setMessage] = React.useState('')
	const [users, setUsers] = React.useState([])
	const [selectedUser, setSelectedUser] = React.useState(null)

	const sendMessage = (e) => {
		e.preventDefault()
		socket.emit('chat', { to: selectedUser.email, text: message })
		setMessage('')
	}

	const selectUser = (user) => (e) => {
		setSelectedUser(user)
		setSearch('')
	}

	React.useEffect(() => {
		const getUsers = async () => {
			try {
				cancelToken.current?.cancel()
				cancelToken.current = axios.CancelToken.source()

				const res = await searchUser(search, cancelToken.current.token)
				setUsers(res.data.users)
			} catch (error) {
				console.log(error)
			}
		}

		if (search.trim()) {
			getUsers()
		} else {
			setUsers([])
		}
	}, [search])

	return (
		<div className={style.container}>
			<div className={style.section_divider}>
				<div className={style.left}>
					<input
						type='search'
						id='search'
						autoComplete='search'
						className={style.input}
						placeholder='Search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<br />

					{users.length > 0 && (
						<ul>
							{users.map((user) => (
								<li key={user.email} onClick={selectUser(user)}>
									{user.email}
								</li>
							))}
						</ul>
					)}
				</div>

				<div className={style.right}>
					<h2>{selectedUser?.name || selectedUser?.email}</h2>
					<ul>
						{messages.map((message, index) => (
							<li key={index}>
								{message?.email}: {message?.text}
							</li>
						))}
					</ul>
					<form onSubmit={sendMessage} className={style.text_form}>
						<input
							type='text'
							id='message'
							autoComplete='off'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className={style.input}
						/>
						<button className={style.button}>Send</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Home
