import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
	const history = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				role:"student"
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login')
		}
	}

	return (
		<div>
			<h1 className="example" >Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
					className="example" 
					tabIndex="0"

				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
					className="example" 
					tabIndex="0"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					className="example" 
					tabIndex="0"
				/>
				<br />
		
				<input type="submit" value="Register" className="example" tabIndex="0"/>
			</form>
		</div>
	)
}

export default Register