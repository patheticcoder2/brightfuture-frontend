import { useContext, useEffect, useState } from 'react';

import NavBar from './NavBar';
import { UserContext } from '../AuthContext';
import { toast } from 'react-toastify';
const Profile = () => {
	const { user, getUserInfo } = useContext(UserContext);

	const [editMode, setEditMode] = useState(false);
	const [input, setInput] = useState({
		email: '',
		biography: '',
	});

	useEffect(() => {
		if (user) {
			setInput({
				email: user.email || '',
				biography: user.biography || '',
			});
		}
	}, [user]);

	const handleInput = (e) => {
		setInput((prev) => {
			prev[e.target.name] = e.target.value;
			return prev;
		});
		console.log(input);
	};
	const updateUser = async () => {
		let raw = await fetch('http://localhost:8000/updateBiographyAndEmail', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(input),
		});
		let json = await raw.json();
		if (json.success) {
			getUserInfo();
			setEditMode(false);
			toast.success('Profile updated successfully');
		} else {
			toast.error('Failed to update profile');
		}
	};
	const styles = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	};
	if (editMode) {
		return (
			<div style={styles.container}>
				<NavBar />

				<h1>{user.name}</h1>
				<p>Email:</p>
				<input
					type='text'
					defaultValue={user.email}
					name='email'
					onChange={handleInput}
				></input>
				<p>Tutor/Schüler:</p>
				<p>{user.type}</p>
				<p>Biographie:</p>
				<textarea
					onChange={handleInput}
					name='biography'
					defaultValue={user.biography}
				></textarea>
				<button
					onClick={() => {
						updateUser();
					}}
				>
					Save
				</button>
			</div>
		);
	} else {
		return (
			<div style={styles.container}>
				<NavBar />
				<h1>{user.name}</h1>
				<p>Email:</p>
				<p>{user.email}</p>
				<p>Tutor/Schüler:</p>
				<p>{user.type}</p>
				<p>Biographies:</p>
				<p>{user.biography}</p>
				<button onClick={() => setEditMode((prev) => !prev)}>Edit</button>
			</div>
		);
	}
};
export default Profile;
