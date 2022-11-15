import axios from 'axios';

export default axios.create({
	// baseURL: 'http://192.168.1.195:8080/api/v1',
	baseURL: 'http://localhost:8080/api/v1',
})