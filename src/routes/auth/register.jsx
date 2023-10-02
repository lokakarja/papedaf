import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'

export default function RegisterPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [nama, setNama] = useState('')
	const [jabatan, setJabatan] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState([{ client: 'papeda', level: 'admin' }])

	const axios = useAxios()
	const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.post('/auth/register', {
				username,
				password,
				nama,
				jabatan,
				email,
				role,
			})
			.then((response) => {
				alert(response.data.message)
				return navigate('/login')
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>Register</legend>
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
				<label htmlFor="nama">Nama</label>
				<input onChange={(e) => setNama(e.target.value)} id="nama" />
				<br />
				<label htmlFor="jabatan">Jabatan</label>
				<input onChange={(e) => setJabatan(e.target.value)} id="jabatan" />
				<br />
				<label htmlFor="email">Email</label>
				<input onChange={(e) => setEmail(e.target.value)} id="email" />
				<br />
				<button type="submit">Daftar Akun</button>
			</fieldset>
			<Link to="/login">Login</Link>
		</form>
	)
}
