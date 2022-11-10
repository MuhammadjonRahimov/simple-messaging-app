import http from '../utils/axios-instance';
import toastHandler from '../utils/toastHandler';

export async function sendMessage(data) {
	const response = await http({ url: `/messages`, method: 'POST', data });
	console.log(response);
	toastHandler(response.data.message, response.data.status);
}

export const getMessages = async (name) => {
	const response = await http({ url: `/messages/${name}` });
	return response.data.data.messages;
}