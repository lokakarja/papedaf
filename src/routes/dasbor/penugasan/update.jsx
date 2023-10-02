import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'
import dayjs from 'dayjs'

export default function UpdatePenugasanPage() {
	const axios = useAxios()
	const navigate = useNavigate()
	const { id } = useParams()
	const [penugasan, setPenugasan] = useState({})

	const [jenis, setJenis] = useState('')
	const [judul, setJudul] = useState('')
	const [dasar, setDasar] = useState('')
	const [noDasar, setNoDasar] = useState('')
	const [tglDasar, setTglDasar] = useState('')
	const [tempatBerangkat, setTempatBerangkat] = useState('')
	const [tempatTujuan, setTempatTujuan] = useState('')
	const [tglMulai, setTglMulai] = useState('')
	const [tglSelesai, setTglSelesai] = useState('')
	const [tglBerangkat, setTglBerangkat] = useState('')
	const [tglKembali, setTglKembali] = useState('')
	const [bebanAnggaran, setBebanAnggaran] = useState('')
	const [noSurat, setNoSurat] = useState('')
	const [tempatSurat, setTempatSurat] = useState('')
	const [tglSurat, setTglSurat] = useState('')
	const [ttdSurat, setTtdSurat] = useState({
		nama: '',
		jabatan: '',
		nip: '',
		pangkat: '',
	})
	const [paraf, setParaf] = useState([])
	const [parafItem, setParafItem] = useState({ nama: '', jabatan: '' })

	useEffect(() => {
		axios
			.get(`/perjadin/penugasan/${id}`)
			.then((response) => {
				setPenugasan(response.data.data)
			})
			.catch((error) => {
				alert(error.response.data.message)
				navigate('/dasbor/penugasan')
			})
	}, [])

	useEffect(() => {
		if (penugasan) {
			setJenis(penugasan.jenis)
			setJudul(penugasan.judul)
			setDasar(penugasan.dasar)
			setNoDasar(penugasan.noDasar)
			setTglDasar(dayjs(penugasan.tglDasar).format('YYYY-MM-DD'))
			setTempatBerangkat(penugasan.tempatBerangkat)
			setTempatTujuan(penugasan.tempatTujuan)
			setTglMulai(dayjs(penugasan.tglMulai).format('YYYY-MM-DD'))
			setTglSelesai(dayjs(penugasan.tglSelesai).format('YYYY-MM-DD'))
			setTglBerangkat(dayjs(penugasan.tglBerangkat).format('YYYY-MM-DD'))
			setTglKembali(dayjs(penugasan.tglKembali).format('YYYY-MM-DD'))
			setBebanAnggaran(penugasan.bebanAnggaran)
			setNoSurat(penugasan.noSurat)
			setTempatSurat(penugasan.tempatSurat)
			setTglSurat(dayjs(penugasan.tglSurat).format('YYYY-MM-DD'))
			setTtdSurat(penugasan.ttdSurat)
			setParaf(penugasan.paraf)
		}
	}, [penugasan])

	function handleSubmit(event) {
		event.preventDefault()

		axios
			.put(`/perjadin/penugasan/${id}`, {
				jenis,
				judul,
				dasar,
				noDasar,
				tglDasar,
				tempatBerangkat,
				tempatTujuan,
				tglMulai,
				tglSelesai,
				tglBerangkat,
				tglKembali,
				bebanAnggaran,
				noSurat,
				tempatSurat,
				tglSurat,
				ttdSurat,
				paraf,
			})
			.then((response) => {
				alert(response.data.message)
				return navigate('/dasbor/penugasan')
			})
	}

	return (
		<div>
			<h1>Update Penugasan</h1>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Tambah Data</legend>
					<label htmlFor="jenis">Jenis Penugasan</label>
					<select
						value={jenis}
						onChange={(e) => setJenis(e.target.value)}
						id="jenis"
					>
						<option>Pilih Jenis Penugasan...</option>
						<option value="Luar Daerah">Luar Daerah</option>
						<option value="Dalam Daerah">Dalam Daerah</option>
						<option value="Dalam Kota">Dalam Kota</option>
					</select>
					<br />
					<label htmlFor="judul">Judul Penugasan</label>
					<textarea
						value={judul}
						onChange={(e) => setJudul(e.target.value)}
						id="judul"
					/>
					<br />
					<label htmlFor="tglMulai">Tanggal Mulai</label>
					<input
						value={tglMulai}
						onChange={(e) => setTglMulai(e.target.value)}
						id="tglMulai"
						type="date"
					/>
					<br />
					<label htmlFor="tglSelesai">Tanggal Selesai</label>
					<input
						value={tglSelesai}
						onChange={(e) => setTglSelesai(e.target.value)}
						id="tglSelesai"
						type="date"
					/>
					<br />
					<br />
					<fieldset>
						<legend>Dasar Penugasan</legend>
						<label htmlFor="dasar">Dasar Penugasan</label>
						<input
							value={dasar}
							onChange={(e) => setDasar(e.target.value)}
							id="dasar"
						/>
						<br />
						<label htmlFor="noDasar">Nomor Surat</label>
						<input
							value={noDasar}
							onChange={(e) => setNoDasar(e.target.value)}
							id="noDasar"
						/>
						<br />
						<label htmlFor="tglDasar">Tanggal Surat</label>
						<input
							value={tglDasar}
							onChange={(e) => setTglDasar(e.target.value)}
							id="tglDasar"
							type="date"
						/>
					</fieldset>
					<br />
					<label htmlFor="tempatBerangkat">Tempat Berangkat</label>
					<input
						value={tempatBerangkat}
						onChange={(e) => setTempatBerangkat(e.target.value)}
						id="tempatBerangkat"
					/>
					<br />
					<label htmlFor="tglBerangkat">Tanggal Berangkat</label>
					<input
						value={tglBerangkat}
						onChange={(e) => setTglBerangkat(e.target.value)}
						id="tglBerangkat"
						type="date"
					/>
					<br />
					<label htmlFor="tempatTujuan">Tempat Tujuan</label>
					<input
						value={tempatTujuan}
						onChange={(e) => setTempatTujuan(e.target.value)}
						id="tempatTujuan"
					/>
					<br />
					<label htmlFor="tglKembali">Tanggal Kembali</label>
					<input
						value={tglKembali}
						onChange={(e) => setTglKembali(e.target.value)}
						id="tglKembali"
						type="date"
					/>
					<br />
					<label htmlFor="bebanAnggaran">Beban Anggaran</label>
					<select
						value={bebanAnggaran}
						onChange={(e) => setBebanAnggaran(e.target.value)}
					>
						<option>Pilih Beban Anggaran...</option>
						<option value="APBD">APBD</option>
						<option value="BLUD">BLUD</option>
					</select>
					<br />
					<br />
					<fieldset>
						<legend>Surat Perintah Tugas (SPT)</legend>
						<label htmlFor="noSurat">Nomor Surat</label>
						<input
							value={noSurat}
							onChange={(e) => setNoSurat(e.target.value)}
							id="noSurat"
						/>
						<br />
						<label htmlFor="tempatSurat">Tempat Surat</label>
						<input
							value={tempatSurat}
							onChange={(e) => setTempatSurat(e.target.value)}
							id="tempatSurat"
						/>
						<br />
						<label htmlFor="tglSurat">Tanggal Surat</label>
						<input
							value={tglSurat}
							onChange={(e) => setTglSurat(e.target.value)}
							id="tglSurat"
							type="date"
						/>
						<br />
						<br />
						<fieldset>
							<legend>Tanda Tangan</legend>
							<label htmlFor="ttdSuratNama">Nama</label>
							<input
								value={ttdSurat?.nama}
								onChange={(e) =>
									setTtdSurat({ ...ttdSurat, nama: e.target.value })
								}
								id="ttdSuratNama"
							/>
							<br />
							<label htmlFor="ttdSuratJabatan">Jabatan</label>
							<input
								value={ttdSurat?.jabatan}
								onChange={(e) =>
									setTtdSurat({ ...ttdSurat, jabatan: e.target.value })
								}
								id="ttdSuratJabatan"
							/>
							<br />
							<label htmlFor="ttdSuratNip">NIP</label>
							<input
								value={ttdSurat?.nip}
								onChange={(e) =>
									setTtdSurat({ ...ttdSurat, nip: e.target.value })
								}
								id="ttdSuratNip"
							/>
							<br />
							<label htmlFor="ttdSuratPangkat">Pangkat</label>
							<input
								value={ttdSurat?.pangkat}
								onChange={(e) =>
									setTtdSurat({ ...ttdSurat, pangkat: e.target.value })
								}
								id="ttdSuratPangkat"
							/>
							<br />
						</fieldset>
						<fieldset>
							<legend>Paraf</legend>
							{paraf?.length ? (
								<ul>
									{paraf.map((item, index) => (
										<li key={index}>
											{item.nama} - {item.jabatan}
											<button
												type="button"
												onClick={() => {
													if (confirm('Hapus paraf?')) {
														setParaf(paraf.filter((paraf) => paraf !== item))
													}
												}}
											>
												Hapus
											</button>
										</li>
									))}
								</ul>
							) : (
								<i>Belum ada paraf</i>
							)}
							<br />
							<label htmlFor="parafItemNama">Nama</label>
							<input
								value={parafItem.nama}
								onChange={(e) =>
									setParafItem({ ...parafItem, nama: e.target.value })
								}
								id="parafItemNama"
							/>
							<br />
							<label htmlFor="parafItemJabatan">Jabatan</label>
							<input
								value={parafItem.jabatan}
								onChange={(e) =>
									setParafItem({ ...parafItem, jabatan: e.target.value })
								}
								id="parafItemJabatan"
							/>
							<br />

							<button
								type="button"
								onClick={() => {
									setParaf([...paraf, parafItem])
									setParafItem({ nama: '', jabatan: '' })
								}}
							>
								Tambah Paraf
							</button>
						</fieldset>
					</fieldset>
					<br />
					<br />
					<button type="submit">Update</button>
				</fieldset>
				<Link to="/dasbor/penugasan">Daftar Penugasan</Link>
			</form>
		</div>
	)
}
