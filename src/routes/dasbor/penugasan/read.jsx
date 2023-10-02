import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '~/hooks/useApiClient'
import dayjs from 'dayjs'

export default function ReadPenugasanPage() {
	const axios = useAxios()
	const navigate = useNavigate()
	const { id } = useParams()
	const [penugasan, setPenugasan] = useState({})

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

	return (
		<div>
			<h1>Read Penugasan</h1>
			<fieldset>
				<legend>{penugasan.judul}</legend>
				{JSON.stringify(penugasan)}
			</fieldset>
			<Link to="/dasbor/penugasan">Daftar Penugasan</Link>
		</div>
	)
}
