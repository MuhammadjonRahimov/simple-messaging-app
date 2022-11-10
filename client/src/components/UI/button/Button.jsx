import styles from './Button.module.scss';


function Button({ children, type, ...props }) {
	return (
		<>
			<button
				type={type || 'button'}
				className={styles.btn}
				{...props}
			>
				{children}
			</button>
		</>
	)
}

export default Button;