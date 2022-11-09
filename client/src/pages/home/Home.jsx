import styles from './Home.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/button/Button';

const letterRegex = /[a-z]/;
const errorMessage = "Name should include only letters.";

function Home() {
	const navigate = useNavigate();

	async function submit(data) {
		const nameFieldChars = watch('name').split("");
		const allLetters = nameFieldChars.every(char => letterRegex.test(char));
		if (allLetters) {
			navigate(`/messages/${data.name.trim()}`);
		} else {
			setError('name', { type: "custom", message: errorMessage });
		}
	}

	const { register, setError, watch, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
	});

	const inputs = [
		{
			name: 'name',
			type: 'text',
			placeholder: "Enter your name",
			validation: {
				required: "Name is required",
				minLength: {
					value: 2,
					message: "You should include at least two chars",
				},

			}
		},
	];

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={styles.form}
		>
			{inputs.map(input =>
				<label key={input.name}>
					<input
						type={input.type}
						placeholder={input.placeholder}
						{...register(
							input.name,
							input.validation
						)}
					/>
					{errors[input.name] && <p className="error-text">{errors[input.name].message}</p>}
				</label>
			)}
			<Button type="submit">Enter</Button>
		</form>
	)
}

export default Home;