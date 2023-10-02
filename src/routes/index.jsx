import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<div>
			<ul>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/dasbor">Dasbor</Link>
				</li>
			</ul>
		</div>
	)
}
