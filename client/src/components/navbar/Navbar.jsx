import styles from './Navbar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/index';
import Button from '../UI/button/Button';

function Navbar({ title }) {
	const { setIsAuth, setUser, setToken } = useContext(AuthContext);
	const navigate = useNavigate();
	function logOut() {
		setIsAuth(false);
		setUser(null);
		setToken('');
		navigate('/login');
	}

	return (
		<nav className={styles.menu}>
			<div className={`container ${styles['menu__row']}`}>
				<Link to='/' className={styles['menu__logo']}>
					<img src="/img/course-logo.png" alt="logo" />
				</Link>
				<Button onClick={logOut}>Log out</Button>
				<h3>{title}</h3>
			</div >
		</nav>
	)
}

export default Navbar;