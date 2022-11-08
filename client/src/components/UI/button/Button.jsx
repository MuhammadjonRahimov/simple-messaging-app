import styles from './Button.module.scss';


function Button({ children, ...props }) {
	return (
		<>
			<button {...props} className={props.btntype === 'white' ? `${styles.btn} ${styles.white}` : styles.btn} {...props}>
				{children}
			</button>
		</>
	)
}

export default Button;