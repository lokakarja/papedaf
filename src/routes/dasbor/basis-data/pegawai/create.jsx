import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'

const golruList = [
	{
		golru: 'I/a',
		pangkat: 'Juru Muda',
	},
	{
		golru: 'I/b',
		pangkat: 'Juru Muda Tingkat I',
	},
	{
		golru: 'I/c',
		pangkat: 'Juru',
	},
	{
		golru: 'I/d',
		pangkat: 'Juru Tingkat I',
	},
	{
		golru: 'II/a',
		pangkat: 'Pengatur Muda',
	},
	{
		golru: 'II/b',
		pangkat: 'Pengatur Muda Tingkat I',
	},
	{
		golru: 'II/c',
		pangkat: 'Pengatur',
	},
	{
		golru: 'II/d',
		pangkat: 'Pengatur Tingkat I',
	},
	{
		golru: 'III/a',
		pangkat: 'Penata Muda',
	},
	{
		golru: 'III/b',
		pangkat: 'Penata Muda Tingkat I',
	},
	{
		golru: 'III/c',
		pangkat: 'Penata',
	},
	{
		golru: 'III/d',
		pangkat: 'Penata Tingkat I',
	},
	{
		golru: 'IV/a',
		pangkat: 'Pembina',
	},
	{
		golru: 'IV/b',
		pangkat: 'Pembina Tingkat I',
	},
	{
		golru: 'IV/c',
		pangkat: 'Pembina Utama Muda',
	},
	{
		golru: 'IV/d',
		pangkat: 'Pembina Utama Madya',
	},
	{
		golru: 'IV/e',
		pangkat: 'Pembina Utama',
	},
]

export default function CreatePegawaiPage() {
	const axios = useAxios()
	const navigate = useNavigate()

	const [nama, setNama] = useState('')
	const [jabatan, setJabatan] = useState('')
	const [gelar, setGelar] = useState({
		depan: '',
		belakang: '',
	})
	const [status, setStatus] = useState('')
	const [nip, setNip] = useState('')
	const [npwp, setNpwp] = useState('')
	const [nik, setNik] = useState('')
	const [pangkat, setPangkat] = useState('')
	const [golru, setGolru] = useState('')

	useEffect(() => {
		setPangkat(golruList.find((item) => item.golru === golru)?.pangkat || '')
	}, [golru])

	useEffect(() => {
		if (status != 'Pegawai') {
			setGolru('')
			setPangkat('')
		}
	}, [status])

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.post('/perjadin/pegawai', {
				nama,
				jabatan,
				gelar,
				status,
				nip,
				npwp,
				nik,
				pangkat,
				golru,
			})
			.then((response) => {
				alert(response.data.message)
				return navigate('/dasbor/basis-data/pegawai')
			})
	}

	return (
		<div>
			<h1>Tambah Pegawai</h1>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Tambah Data</legend>
					<label htmlFor="nama">Nama</label>
					<input onChange={(e) => setNama(e.target.value)} id="nama" />
					<br />
					<label htmlFor="jabatan">Jabatan</label>
					<input onChange={(e) => setJabatan(e.target.value)} id="jabatan" />
					<br />
					<fieldset>
						<legend>Gelar</legend>
						<label htmlFor="gelarDepan">Depan</label>
						<input
							onChange={(e) => setGelar({ ...gelar, depan: e.target.value })}
							id="gelarDepan"
						/>
						<br />
						<label htmlFor="gelarBelakang">Belakang</label>
						<input
							onChange={(e) => setGelar({ ...gelar, belakang: e.target.value })}
							id="gelarBelakang"
						/>
					</fieldset>
					<br />
					<label htmlFor="status">Status</label>
					<select onChange={(e) => setStatus(e.target.value)} id="status">
						<option>Pilih Status...</option>
						<option value="Pegawai">Pegawai</option>
						<option value="Tenaga Kontrak">Tenaga Kontrak</option>
					</select>
					<br />
					{status === 'Pegawai' && (
						<>
							<label htmlFor="nip">NIP</label>
							<input onChange={(e) => setNip(e.target.value)} id="nip" />
							<br />
							<label htmlFor="golru">Golru</label>
							<select onChange={(e) => setGolru(e.target.value)} id="golru">
								<option>Pilih Golru...</option>
								{golruList.map((item) => (
									<option key={item.golru} value={item.golru}>
										{item.golru}
									</option>
								))}
							</select>
							<br />
							<label htmlFor="pangkat">Pangkat</label>
							<input
								readOnly
								value={
									golruList.find((item) => item.golru === golru)?.pangkat || ''
								}
								id="pangkat"
							/>
							<br />
						</>
					)}

					<label htmlFor="npwp">NPWP</label>
					<input onChange={(e) => setNpwp(e.target.value)} id="npwp" />
					<br />
					<label htmlFor="nik">NIK</label>
					<input onChange={(e) => setNik(e.target.value)} id="nik" />
					<br />

					<button type="submit">Simpan</button>
				</fieldset>
				<Link to="/dasbor/basis-data/pegawai">Daftar Pegawai</Link>
			</form>
		</div>
	)
}
