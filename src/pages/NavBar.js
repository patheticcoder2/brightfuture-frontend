import { useContext } from 'react';
import { UserContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavBar = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const logout = async () => {
		let raw = await fetch('http://localhost:8000/logout', {
			method: 'POST',
			credentials: 'include',
		});
		let json = await raw.json();
		if (json.success) {
			navigate('/login');
			toast.success('Logged out successfully');
		} else {
			toast.error('Logout failed');
		}
		console.log(json);
	};
	const styles = {
		navbar: {
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: 'grey',
			padding: '40px',
		},
	};
	return (
		<div style={styles.navbar}>
			{user.name != null && (
				<>
					<a
						onClick={() => {
							logout();
						}}
					>
						Logout&nbsp;
					</a>
					<a
						onClick={() => {
							navigate('/tutors');
						}}
					>
						Unsere Tutoren
					</a>
					<a
						onClick={() => {
							navigate('/profile');
						}}
					>
						Dein Profil
					</a>
				</>
			)}
			{user.name == null && (
				<a
					onClick={() => {
						navigate('/Login');
					}}
				>
					Login
				</a>
			)}
		</div>
	);
};
export default NavBar;
