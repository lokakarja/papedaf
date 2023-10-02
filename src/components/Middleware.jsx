import { Outlet, Navigate } from 'react-router-dom'
import { useToken } from '~/hooks/useApiClient'

export function ProtectedRoute() {
	const { getToken } = useToken()

	if (!getToken()) {
		return <Navigate replace to="/login" />
	}

	return <Outlet />
}

export function PublicRoute() {
	const { getToken } = useToken()

	if (getToken()) {
		return <Navigate replace to="/dasbor" />
	}

	return <Outlet />
}
