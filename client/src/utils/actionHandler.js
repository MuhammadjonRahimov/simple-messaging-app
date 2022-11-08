import { Link } from 'react-router-dom';
import Button from '../components/UI/button/Button';

export default function actionFunc(deleteFn, updateUrl) {
	const action = <div>
		<Link to={updateUrl}>
			<Button>✏</Button>
		</Link>
		<Button onClick={deleteFn}>❌</Button>
	</div>
	return action;
}