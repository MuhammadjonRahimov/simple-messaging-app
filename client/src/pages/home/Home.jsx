import styles from '../Form.module.scss';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login_inputs } from '../../utils/inputs';

import Button from '../../components/UI/button/Button';

const letterRegex = /[a-z]/;
const errorMessage = "Name should include only letters.";

function Home() {
	const navigate = useNavigate();

	async function submit() {
		const nameFieldChars = watch('name').replaceAll(/\s/g, '').split("");
		const allLetters = nameFieldChars.every(char => letterRegex.test(char));

		if (allLetters && nameFieldChars.length > 1) {
			navigate(`/messages/${nameFieldChars.join("")}`);
		} else {
			setError('name', { type: "custom", message: errorMessage });
		}
	}

	const { register, setError, watch, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
	});



	return (
		<form
			onSubmit={handleSubmit(submit)}
			className={styles.form}
		>
			{login_inputs.map(input =>
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