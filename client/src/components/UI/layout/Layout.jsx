import styles from './Layout.module.scss';

const Layout = params => {
	return <div className={styles.wrapper}>
		{params.children}
	</div>
}
export default Layout