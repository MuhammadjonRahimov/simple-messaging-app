import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context';

import Home from './pages/Home';
import Messages from './pages/messages/Messages';
import NotFound from './pages/NotFound';
function App() {
	const { jwt, user, isAuth } = useContext(AuthContext);
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/messages/:username" element={<Messages />} />
				<Route path="*" element={<NotFound />} />
				{/* <Route path="*" element={<Navigate replace to={isAuth ? '/users' : '/login'} />} /> */}
			</Routes>
		</>
	);
}
export default App;