import { useRouteError } from 'react-router-dom'

function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id="error-page">
			<h1>Aduh!</h1>
			<p>Maaf, sedang terjadi error.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}

export default ErrorPage
