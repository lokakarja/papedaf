import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ProtectedRoute, PublicRoute } from '~/components/Middleware'
import ErrorPage from './error'
import LoginPage from './auth/login'
import HomePage from './'
import DasborPage from './dasbor'
import RegisterPage from './auth/register'
import ProfilPage from './dasbor/profil'
import UpdateProfilPage from './dasbor/profil/update'
import UpdatePasswordPage from './dasbor/profil/update-password'
import PegawaiPage from './dasbor/basis-data/pegawai'
import CreatePegawaiPage from './dasbor/basis-data/pegawai/create'
import UpdatePegawaiPage from './dasbor/basis-data/pegawai/update'
import PenugasanPage from './dasbor/penugasan'
import CreatePenugasanPage from './dasbor/penugasan/create'
import UpdatePenugasanPage from './dasbor/penugasan/update'
import ReadPenugasanPage from './dasbor/penugasan/read'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/',
		element: <PublicRoute />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
		],
	},
	{
		path: '/dasbor',
		element: <ProtectedRoute />,
		children: [
			{
				path: '',
				element: <DasborPage />,
			},
			{
				path: 'profil',
				element: <Outlet />,
				children: [
					{
						path: '',
						element: <ProfilPage />,
					},
					{
						path: 'update',
						element: <UpdateProfilPage />,
					},
					{
						path: 'update-password',
						element: <UpdatePasswordPage />,
					},
				],
			},
			{
				path: 'basis-data',
				element: <Outlet />,
				children: [
					{
						path: 'pegawai',
						element: <Outlet />,
						children: [
							{
								path: '',
								element: <PegawaiPage />,
							},
							{
								path: 'tambah',
								element: <CreatePegawaiPage />,
							},
							{
								path: 'update/:id',
								element: <UpdatePegawaiPage />,
							},
						],
					},
				],
			},
			{
				path: 'penugasan',
				element: <Outlet />,
				children: [
					{
						path: '',
						element: <PenugasanPage />,
					},
					{
						path: 'tambah',
						element: <CreatePenugasanPage />,
					},
					{
						path: 'update/:id',
						element: <UpdatePenugasanPage />,
					},
					{
						path: 'read/:id',
						element: <ReadPenugasanPage />,
					},
				],
			},
		],
	},
])

const queryClient = new QueryClient()

export default function App() {
	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</CookiesProvider>
	)
}
