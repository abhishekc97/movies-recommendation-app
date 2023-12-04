import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const { isAuthenticated } = useSelector((state) => state.root);
	const dispatch = useDispatch();

	const [isTokenExists, setIsTokenExists] = useState(false);

	function handleRefresh() {
		if (
			localStorage.getItem('token') !== null &&
			localStorage.getItem('token') !== ''
		) {
			setIsTokenExists(true);
			dispatch({ type: 'login' });
		}
	}

	useEffect(() => {
		handleRefresh();
	}, []);

	return (
		<BrowserRouter>
			<div className="App max-h-[100vh] max-w-[100vw]">
				<Routes>
					<Route
						path="/"
						element={<Home isAuthenticated={isAuthenticated} />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
