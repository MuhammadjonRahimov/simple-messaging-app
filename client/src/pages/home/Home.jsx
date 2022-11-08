import Button from '../../components/UI/button/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
	const navigate = useNavigate();

	async function submit(data) {
		navigate(`/messages/${data.name}`);
	}

	const { register, handleSubmit, formState: { errors, isValid } } = useForm({
		mode: "onChange",
	});

	const inputs = [
		{ name: 'name', type: 'text', value: '1', message: 'Name is required', placeholder: "Enter your name" },
	];

	return (
		<div className={styles.window}>
			<div className={`container ${styles['window__row']}`}>
				<form
					onSubmit={handleSubmit(submit)}
					className={styles['window__form']}
				>
					{inputs.map(input =>
						<label key={input.name}>
							<input
								{...register(
									input.name,
									{
										required: 'The filed must be filled',
										minLength: {
											value: input.value || 2,
											message: `You should includes at least ${input.value ? input.value : '2'} characters`
										}
									}
								)}
								placeholder={input.placeholder}
								type={input.type}
							/>
							{errors[input.name] && <p>{errors[input.name].message}</p>}
						</label>
					)}
					<div className={styles['window__btns']}>
						{/* <Button type="button" btntype='white'>Cancel</Button> */}
						<Button btntype='white' disabled={!isValid}>Enter</Button>
					</div >
				</form>
			</div>
		</div>
	)
}

export default Home;