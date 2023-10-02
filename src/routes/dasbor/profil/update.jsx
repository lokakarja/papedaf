import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'
import useAuth from '~/hooks/useAuth'

export default function UpdateProfilPage() {
	const axios = useAxios()
	const navigate = useNavigate()

	const { user } = useAuth()

	const [nama, setNama] = useState('')
	const [jabatan, setJabatan] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		if (user) {
			setNama(user.nama)
			setJabatan(user.jabatan)
			setEmail(user.email)
		}
	}, [user])

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.put('/auth/me', {
				nama,
				jabatan,
				email,
			})
			.then((response) => {
				alert(response.data.message)
				return navigate('/dasbor/profil')
			})
	}

	return (
		<div>
			<h1>Update Profil</h1>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Register</legend>
					<label htmlFor="nama">Nama</label>
					<input
						onChange={(e) => setNama(e.target.value)}
						id="nama"
						value={nama}
					/>
					<br />
					<label htmlFor="jabatan">Jabatan</label>
					<input
						onChange={(e) => setJabatan(e.target.value)}
						id="jabatan"
						value={jabatan}
					/>
					<br />
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						id="email"
						value={email}
					/>
					<br />
					<button type="submit">Update Profil</button>
				</fieldset>
				<Link to="/dasbor/profil">Profil Saya</Link>
			</form>
		</div>
	)
}
