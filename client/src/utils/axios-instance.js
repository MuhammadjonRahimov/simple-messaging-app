import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.1.195:2000/api/v1',
})