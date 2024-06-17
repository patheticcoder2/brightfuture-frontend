import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Tutors = () => {
	const [tutors, setTutors] = useState([]);
	const navigate = useNavigate();
	const styles = {
		tutorContainer: {
			border: '1px solid black',
			padding: '10px',
		},
		tutorsContainer: {
			display: 'flex',
			flexDirection: 'column',
		},
	};

	useEffect(() => {
		const getTutors = async () => {
			const rawResponse = await fetch('http://localhost:8000/tutors', {
				credentials: 'include',
			});
			const response = await rawResponse.json();
			setTutors(response);
		};

		getTutors();
	}, []);
	const arrayDataItems = tutors.map((tutor) => (
		<div style={styles.tutorContainer}>
			<div>{tutor.name}</div>
			<div>{tutor.email}</div>
			<a onClick={() => navigate('/users/' + tutor.id)}>Besuche Profil</a>
		</div>
	));
	return (
		<>
			<NavBar />
			<div style={styles.tutorsContainer}>{arrayDataItems}</div>;
		</>
	);
};
export default Tutors;
