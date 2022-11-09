import styles from './Layout.module.scss';

const Layout = params => {
	return <div className={styles.wrapper}>
		<div className={styles['inner-wrapper']}>
			{params.children}
		</div>
	</div>
}
export default Layout