import { useEffect, useState } from 'react';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
const Profiles = () => {
	let { id } = useParams();
	let [user, setUser] = useState({});
	let [subjects, setSubjects] = useState({});
	useEffect(() => {
		const fetchUser = async () => {
			const user = await fetch('http://localhost:8000/users/' + id);
			let json = await user.json();
			console.log(json);
			setUser(json);
		};
		fetchUser();

		const fetchSubjects = async () => {
			let subjects = await fetch(
				'http://localhost:8000/users/' + id + '/subjects'
			);
			let json = await subjects.json();
			console.log(json);
			setSubjects(json);
		};
		fetchSubjects();
	}, []);
	console.log(user.imgurl);

	return (
		<div>
			<NavBar />
			<div style={{ display: 'flex', flexDireciton: 'row' }}>
				<img
					style={{ width: '150px' }}
					src={'/img/' + user.imgurl}
					alt='Profilbild'
				></img>
				<div>
					<h1>{user.name}</h1>
					<p>{user.type}</p>
					<p>{user.biography}</p>
					{[subjects].map((subject) => {
						return <div>{subject.name}</div>;
					})}
				</div>
			</div>
		</div>
	);
};
export default Profiles;
