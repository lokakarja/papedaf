import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAxios, useToken } from '~/hooks/useApiClient'

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const axios = useAxios()
	const { setToken } = useToken()

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.post('/auth/login', {
				username,
				password,
			})
			.then((response) => {
				setToken(response.data.data.token)
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>Login</legend>
				<label htmlFor="username">Username</label>
				<input onChange={(e) => setUsername(e.target.value)} id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					id="password"
					type="password"
				/>
				<br />
				<button type="submit">Login</button>
			</fieldset>
			<Link to="/register">Register</Link>
		</form>
	)
}
