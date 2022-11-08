import http from '../components/utils/axios-instance';
import toastHandler from '../components/utils/toastHandler';

export async function registerHandler(data) {
	try {
		const response = await http({ url: '/auth/register', data: data, method: 'POST' });
		console.log(response);
		toastHandler(response.data.message, response.data.status);
		return response;
	} catch (err) {
		toastHandler(err.response.data.message, 'error');
	}
}