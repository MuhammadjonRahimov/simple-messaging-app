import styles from './Button.module.scss';


function Button({ children, type, size, ...props }) {
	return (
		<>
			<button
				type={type || 'button'}
				className={`${styles.btn} ${styles[size]}`}
				{...props}
			>
				{children}
			</button>
		</>
	)
}

export default Button;