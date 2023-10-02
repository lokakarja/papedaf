import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAxios, useToken } from './useApiClient'

function fetcher() {
	const axios = useAxios()

	return async function () {
		try {
			const response = await axios.get('/auth/me')
			const data = response.data.data
			return data
		} catch (error) {
			throw error.response
		}
	}
}

export default function useAuth() {
	const [user, setUser] = useState(null)
	const { getToken } = useToken()

	const { data, isLoading } = useQuery(
		['auth/me'],
		getToken() ? fetcher() : null
	)

	useEffect(() => {
		if (data) setUser(data)
	}, [data])

	return {
		user,
		isLoading,
	}
}
