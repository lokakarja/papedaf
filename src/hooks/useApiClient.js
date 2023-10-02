import axios from 'axios'
import { useCookies } from 'react-cookie'

const BASE_URL = 'http://localhost:3000/api'

export function useAxios() {
	const [cookies] = useCookies(['_token'])
	const { removeToken } = useToken()

	const token = cookies?._token

	const AxiosInstance = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: token ? `Bearer ${token}` : undefined,
		},
	})

	AxiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401) {
				removeToken()
				alert('Sesi anda telah berakhir, silahkan login kembali')
			}

			return Promise.reject(error)
		}
	)

	return AxiosInstance
}

export function useToken() {
	const [cookies, setCookie, removeCookie] = useCookies(['_token'])

	function setToken(token) {
		return setCookie('_token', token, { path: '/' })
	}

	function removeToken() {
		return removeCookie('_token', { path: '/' })
	}

	function getToken() {
		return cookies?._token
	}

	return { getToken, setToken, removeToken }
}
