import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'
import { useDebounce } from 'use-debounce'
import dayjs from 'dayjs'

export default function PenugasanPage() {
	const axios = useAxios()

	const [penugasanList, setPenugasanList] = useState([])
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [sort, setSort] = useState('asc')

	const [searchValue] = useDebounce(search, 750)

	useEffect(() => {
		axios
			.get('/perjadin/penugasan', {
				params: {
					search: searchValue || undefined,
					sortBy: sortBy || undefined,
					sort: sort || undefined,
				},
			})
			.then((response) => {
				setPenugasanList(response.data.data)
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}, [searchValue, sortBy, sort])

	function handleDelete(id) {
		if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
			axios
				.delete('/perjadin/penugasan/' + id)
				.then((response) => {
					alert(response.data.message)
					setPenugasanList(
						penugasanList.filter((penugasan) => penugasan._id !== id)
					)
				})
				.catch((error) => {
					alert(error.response.data.message)
				})
		}
	}

	return (
		<div>
			<h1>Daftar Penugasan</h1>
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
					<option value="judul">Judul</option>
					<option value="tglSurat">Tanggal Surat</option>
				</select>
			</fieldset>
			<br />
			<table border={1}>
				<thead>
					<tr>
						<th>No.</th>
						<th>Tanggal</th>
						<th>Judul Penugasan</th>
						<th>Aksi</th>
					</tr>
				</thead>
				{penugasanList?.length ? (
					<tbody>
						{penugasanList.map((penugasan, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{dayjs(penugasan.tglSurat).format('YYYY-MM-DD')}</td>
								<td>{penugasan.judul}</td>
								<td>
									<Link to={'detail/' + penugasan._id}>Detail</Link>{' '}
									<Link to={'update/' + penugasan._id}>Update</Link>{' '}
									<button onClick={() => handleDelete(penugasan._id)}>
										Hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td colSpan={10}>Tidak ada data</td>
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
