import { Link } from 'react-router-dom'
import { useToken } from '~/hooks/useApiClient'

export default function DasborPage() {
	const { removeToken } = useToken()

	function handleLogout(event) {
		event.preventDefault()

		removeToken()
	}

	return (
		<div>
			<h1>Dasbor</h1>
			<br />
			<Link to="profil">Profil Saya</Link>
			<br />
			<br />
			<strong>Basis Data</strong>
			<br />
			<Link to="basis-data/pegawai">Data Pegawai</Link>
			<br />
			<br />
			<strong>Penugasan</strong>
			<br />
			<Link to="penugasan">Daftar Penugasan</Link>
			<br />
			<br />
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}
