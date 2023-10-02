import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'
import { useDebounce } from 'use-debounce'

export default function PegawaiPage() {
	const axios = useAxios()

	const [pegawaiList, setPegawaiList] = useState([])
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [sort, setSort] = useState('asc')

	const [searchValue] = useDebounce(search, 750)

	useEffect(() => {
		axios
			.get('/perjadin/pegawai', {
				params: {
					search: searchValue || undefined,
					sortBy: sortBy || undefined,
					sort: sort || undefined,
				},
			})
			.then((response) => {
				setPegawaiList(response.data.data)
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}, [searchValue, sortBy, sort])

	function handleDelete(id) {
		if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
			axios
				.delete('/perjadin/pegawai/' + id)
				.then((response) => {
					alert(response.data.message)
					setPegawaiList(pegawaiList.filter((pegawai) => pegawai._id !== id))
				})
				.catch((error) => {
					alert(error.response.data.message)
				})
		}
	}

	return (
		<div>
			<h1>Data Pegawai</h1>
			<fieldset>
				<legend>Filter</legend>
				<label htmlFor="search">Pencarian</label>
				<input id="search" onChange={(e) => setSearch(e.target.value)} />
				<br />
				<label htmlFor="sort">Urutkan</label>
				<select
					id="sortBy"
					onChange={(e) => setSort(e.target.value)}
					value={sort}
				>
					<option value="asc">ASC</option>
					<option value="desc">DESC</option>
				</select>
				<label htmlFor="sortBy">Berdasarkan</label>
				<select id="sortBy" onChange={(e) => setSortBy(e.target.value)}>
					<option value="">Pilih berdasarkan...</option>
					<option value="nama">Nama</option>
					<option value="jabatan">Jabatan</option>
					<option value="golru">Golongan Ruang</option>
					<option value="pangkat">Pangkat</option>
					<option value="status">Status</option>
				</select>
			</fieldset>
			<br />
			<table border={1}>
				<thead>
					<tr>
						<th>No.</th>
						<th>Nama</th>
						<th>NIP</th>
						<th>NPWP</th>
						<th>Jabatan</th>
						<th>Golru</th>
						<th>Pangkat</th>
						<th>Status</th>
						<th>NIK</th>
						<th>Aksi</th>
					</tr>
				</thead>
				{pegawaiList?.length ? (
					<tbody>
						{pegawaiList.map((pegawai, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>
									{pegawai.nama} ({pegawai.gelar.depan} --{' '}
									{pegawai.gelar.belakang})
								</td>
								<td>{pegawai.nip}</td>
								<td>{pegawai.npwp}</td>
								<td>{pegawai.jabatan}</td>
								<td>{pegawai.golru}</td>
								<td>{pegawai.pangkat}</td>
								<td>{pegawai.status}</td>
								<td>{pegawai.nik}</td>
								<td>
									<Link to={'update/' + pegawai._id}>Update</Link>
									<button onClick={() => handleDelete(pegawai._id)}>
										Hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td colSpan={10}>Tidak ada data.</td>
						</tr>
					</tbody>
				)}
			</table>
			<br />
			<br />
			<Link to="tambah">Tambah</Link>
			<br />
			<Link to="/dasbor">Dasbor</Link>
		</div>
	)
}
