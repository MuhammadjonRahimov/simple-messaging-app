import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context';
import toastHandler from '../utils/toastHandler';

function useHttp(reqFunc, startWithLoading = false) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const { setIsAuth, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		startWithLoading && send();
	}, []);

	const send = async (reqData) => {
		setLoading(true);
		setError(null);
		try {
			const data = await reqFunc(reqData);
			setData(data);
		} catch (error) {
			if (error.response.status === 401 || error.response.status === 403) {
				setIsAuth(false);
				setUser(null);
				localStorage.removeItem('token');
				toastHandler('error', error.response.data.message);
				navigate('/login');
			}
			setError(error);
		}
		setLoading(false);
	}
	return { send, loading, error, data }
}
export default useHttp;