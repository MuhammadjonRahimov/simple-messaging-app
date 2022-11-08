import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context';

import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';

const existedToken = localStorage.getItem('token') || '';

function App() {
	const [isAuth, setIsAuth] = useState(!!existedToken);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(existedToken);
	return (
		<>
			<ToastContainer />
			<AuthContext.Provider value={{
				isAuth,
				setIsAuth,
				user,
				setUser,
				token,
				setToken
			}}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/messages/:username" element={<Messages />} />
						{/* <Route path="*" element={<Navigate replace to={isAuth ? '/users' : '/login'} />} /> */}
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</>
	);
}
export default App;