import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'

export default function UpdatePasswordPage() {
	const axios = useAxios()
	const navigate = useNavigate()

	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.put('/auth/me/password', {
				password: password,
				newPassword: newPassword,
			})
			.then((response) => {
				alert(response.data.message)
				return navigate('/dasbor/profil')
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	return (
		<div>
			<h1>Update Password</h1>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Update Password</legend>
					<label htmlFor="password">Password Lama</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						id="password"
					/>
					<br />
					<label htmlFor="newPassword">Password Baru</label>
					<input
						onChange={(e) => setNewPassword(e.target.value)}
						type="password"
						id="newPassword"
					/>
					<br />
					<button type="submit">Update Password</button>
				</fieldset>
				<Link to="/dasbor/profil">Profil Saya</Link>
			</form>
		</div>
	)
}
