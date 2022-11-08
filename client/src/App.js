import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context';

import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';

function App() {
	const { jwt, user, isAuth } = useContext(AuthContext);
	return (
		<div className="wrapper">
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/messages/:username" element={<Messages />} />
				{/* <Route path="*" element={<Navigate replace to={isAuth ? '/users' : '/login'} />} /> */}
			</Routes>
		</div>
	);
}
export default App;