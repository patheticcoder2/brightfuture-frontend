import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../AuthContext';

const Login = () => {
	useEffect(() => {
		const listener = (event) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				login();
				event.preventDefault();
				// callMyFunction();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	const { user, getUserInfo } = useContext(UserContext);
	const styles = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
			flexDirection: 'column',
			backgroundColor: 'grey',
			padding: '40px',
		},
	};
	const [input, setInput] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	const handleInput = (e) => {
		setInput((previous) => {
			previous[e.target.name] = e.target.value;

			return previous;
		});
		console.log(input);
	};
	const login = async () => {
		const rawResponse = await fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(input),
		});
		const json = await rawResponse.json();

		if (json.success) {
			getUserInfo();
			navigate('/profile');
			toast.success('Erfolgreich eingeloggt');
		} else {
			toast.error('Login Fehlgeschlagen');
		}
		console.log(json);
	};
	return (
		<div style={styles.container}>
			<h1>Login</h1>
			<form action='http://localhost:8000/login' method='post'>
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
			</form>
			<button onClick={login}>Login</button>
		</div>
	);
};
export default Login;
