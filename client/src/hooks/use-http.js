import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastHandler from '../utils/toastHandler';

function useHttp(reqFunc) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);


	const navigate = useNavigate();

	const send = async (reqData) => {
		try {
			setLoading(true);
			const data = await reqFunc(reqData);
			setData(data);
			return data;
		} catch (error) {
			console.log(error);
			if (error.response.status === 401 || error.response.status === 403) {
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