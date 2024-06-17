import { useState, createContext, useEffect } from 'react';
import Account from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tutors from './pages/Tutors';
import Profile from './pages/Profile';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profiles from './pages/Profiles';

export const UserContext = createContext();

const AuthContext = () => {
	const [user, setUser] = useState({});

	const getUserInfo = async () => {
		const rawResponse = await fetch('http://localhost:8000/account', {
			credentials: 'include',
		});
		const content = await rawResponse.json();
		setUser(content);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<BrowserRouter>
			<ToastContainer></ToastContainer>
			<Routes>
				<Route
					path='/'
					element={
						<UserContext.Provider value={{ user }}></UserContext.Provider>
					}
				/>
				<Route
					path='/login'
					element={
						<UserContext.Provider value={{ user, getUserInfo }}>
							<Login />
						</UserContext.Provider>
					}
				/>
				<Route
					path='/profile'
					element={
						<UserContext.Provider value={{ user, getUserInfo }}>
							<Profile />
						</UserContext.Provider>
					}
				/>
				<Route
					path='/tutors'
					element={
						<UserContext.Provider value={{ user }}>
							<Tutors />
						</UserContext.Provider>
					}
				/>
				<Route
					path='/users/:id'
					element={
						<UserContext.Provider value={{ user }}>
							<Profiles />
						</UserContext.Provider>
					}
				/>
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};
export default AuthContext;
