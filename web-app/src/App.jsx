import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'
import { SocketProvider } from './context/SocketProvider'
import Authenticate from './pages/Authenticate'
import Home from './pages/Home'
import Verify from './pages/Verify'

function App() {
	const { token, user } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						token && user ? (
							<SocketProvider>
								<Home />
							</SocketProvider>
						) : (
							<Navigate to='/authenticate' />
						)
					}
				/>
				<Route path='/authenticate' element={!(token && user) ? <Authenticate /> : <Navigate to='/' />} />
				<Route path='/verify_otp/:email' element={!(token && user) ? <Verify /> : <Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
