import { toast } from 'react-toastify';

export default function showToastMessage(message, status) {
	toast[status](message, { autoClose: 3000 })
};
