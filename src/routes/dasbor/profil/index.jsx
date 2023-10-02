import { Link } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

export default function ProfilPage() {
	const { user } = useAuth()

	return (
		<div>
			<h1>Profil Saya</h1>
			<table border={1}>
				<tbody>
					<tr>
						<td>Nama</td>
						<td>{user?.nama}</td>
					</tr>
					<tr>
						<td>Username</td>
						<td>{user?.username}</td>
					</tr>
					<tr>
						<td>Jabatan</td>
						<td>{user?.jabatan}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{user?.email}</td>
					</tr>
					<tr>
						<td>Role</td>
						<td>
							{JSON.stringify(
								user?.role?.map((item) => {
									return { client: item.client, level: item.level }
								})
							)}
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<code>{JSON.stringify(user)}</code>
			<br />
			<br />
			<Link to="update">Update Profil</Link>
			<br />
			<Link to="update-password">Ganti Password</Link>
			<br />
			<br />
			<Link to="/dasbor">Dasbor</Link>
		</div>
	)
}
