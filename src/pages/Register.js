import { useState } from 'react';

const Register = () => {
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
		type: '',
	});
	const handleInput = (e) => {
		setInput((previous) => {
			previous[e.target.name] = e.target.value;

			return previous;
		});
		console.log(input);
	};
	const register = async () => {
		const rawResponse = await fetch('http://localhost:8000/createuser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		const content = await rawResponse.json();

		console.log(content);
	};
	return (
		<>
			<h1>Register</h1>
			<form>
				<input
					type='text'
					placeholder='name'
					name='name'
					onChange={handleInput}
					required
				></input>
				<input
					type='text'
					placeholder='email'
					name='email'
					onChange={handleInput}
					required
				></input>
				<input
					type='password'
					name='password'
					onChange={handleInput}
					required
				></input>
				<input type='text' name='type' onChange={handleInput} required></input>
			</form>
			<button onClick={register}>Register</button>
		</>
	);
};
export default Register;
