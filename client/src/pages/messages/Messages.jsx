import Button from '../../components/UI/button/Button';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import styles from './Messages.module.scss';
import Table from '../../components/UI/table/Table';
import AsyncSelect from 'react-select/async';
import useHttp from '../../hooks/use-http';
import { sendMessage, getMessages } from '../../api/message-api';
import { useEffect, useState } from 'react';
import http from '../../utils/axios-instance';

const cols = [
	{ header: 'Sender', accessor: 'sender' },
	{ header: 'Title', accessor: 'title' },
	{ header: 'Message', accessor: 'text' },
];

const options = [
	{ value: 'Alex', label: 'Alex' },
	{ value: 'Kevin', label: 'Kevin' },
	{ value: 'Sam', label: 'Sam' },
];


function Messages() {

	const [recipients, setRecipients] = useState([]);
	const params = useParams();
	const { send } = useHttp(sendMessage);
	const { send: getMessage, error, loading, data: messages } = useHttp(getMessages);

	const { register, handleSubmit, reset, formState: { errors, isValid }, setValue, watch } = useForm({
		mode: "onChange",
	});
	const recipient = watch('recipient');

	useEffect(() => {
		if (recipient && recipient.length > 0) {
			getRecipients();
		}
	}, [recipient]);

	useEffect(() => {
		getMessage(params.username);
		const getMessagesInterval = setInterval(() => {
			getMessage(params.username);
		}, 5000);
		return () => clearInterval(getMessagesInterval);
	}, [])

	async function submit(data) {
		const response = await send({ ...data, sender: params.username });
		setValue('recipient', '');
		reset();
	}

	const inputs = [
		{
			name: 'title',
			type: 'text',
			placeholder: "Title",
			validation: {
				required: 'The filed must be filled',
				minLength: {
					value: 1,
				},
			},
		},
	]
	async function getRecipients() {
		const res = await http.get(`/messages/recipients/${recipient}`);
		setRecipients(res.data.data.recipients);
	}
	function selectRecipient(r) {
		setValue('recipient', r);
		setRecipients([]);
	}
	return (
		<div className={styles.window}>
			<Link className={styles.link} to="/">Home</Link>
			<div className={`container ${styles['window__row']}`}>
				<form
					onSubmit={handleSubmit(submit)}
					className={styles['window__form']}
				>
					{/* <AsyncSelect
						placeholder="Recipient"
						// options={options}
						loadOptions={loadOptionsHandler}
						onInputChange={value => console.log(value)}
					// onChange={(choice) => setValue('recipient', choice.value)}
					/> */}

					<label htmlFor="" className={styles.label}>
						<input type="text" {...register('recipient', {
							required: 'The filed must be filled',
							minLength: {
								value: 1,
							},
						})}
							placeholder="Enter recipient"
						/>
						{recipients.length > 0 && (recipients.length === 1 && recipients[0].value !== recipient) &&
							<ul className={styles.list}>
								{recipients.map(recipient =>
									<li key={recipient.value} onClick={selectRecipient.bind(null, recipient.value)}>{recipient.value}</li>)}
							</ul>}
					</label>

					{inputs.map(input =>
						<label key={input.name}>
							<input
								{...register(input.name, input.validation)}
								placeholder={input.placeholder}
								type={input.type}
							/>
							{errors[input.name] && <p>{errors[input.name].message}</p>}
						</label>
					)}
					<textarea placeholder="Your message" {...register('text', {
						required: 'The filed must be filled',
						minLength: {
							value: 1,
						},
					})}>
					</textarea>
					<div className={styles['window__btns']}>
						<Button btntype='white' disabled={!isValid}>Send</Button>
					</div >
				</form>
			</div>
			<div className={styles.table}>
				{messages && <Table
					cols={cols}
					data={messages}
				/>}
			</div>
		</div >
	)
}
export default Messages;