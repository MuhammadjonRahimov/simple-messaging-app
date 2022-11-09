import message_styles from './Messages.module.scss';
import form_styles from '../Form.module.scss'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { sendMessage, getMessages } from '../../api/message-api';
import useHttp from '../../hooks/use-http';
import http from '../../utils/axios-instance';
import { messages_inputs } from '../../utils/inputs';

import Button from '../../components/UI/button/Button';
import Layout from '../../components/UI/layout/Layout';
import Table from '../../components/UI/table/Table';

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
	const navigate = useNavigate();
	const [recipients, setRecipients] = useState([]);
	const params = useParams();
	const { send } = useHttp(sendMessage);
	const { send: getMessage, error, loading, data: messages } = useHttp(getMessages);

	const { register, handleSubmit, reset, formState: { errors, isValid }, setValue, watch } = useForm({
		mode: "onChange",
	});
	const recipient = watch('recipient');

	// useEffect(() => {
	// 	if (recipient && recipient.length > 0) {
	// 		getRecipients();
	// 	}
	// }, [recipient]);

	// useEffect(() => {
	// 	getMessage(params.username);
	// 	const getMessagesInterval = setInterval(() => {
	// 		getMessage(params.username);
	// 	}, 5000);
	// 	return () => clearInterval(getMessagesInterval);
	// }, []);

	async function submit(data) {
		const response = await send({ ...data, sender: params.username });
		setValue('recipient', '');
		reset();
	}


	async function getRecipients() {
		const res = await http.get(`/messages/recipients/${recipient}`);
		setRecipients(res.data.data.recipients);
	}
	function selectRecipient(r) {
		setValue('recipient', r);
		setRecipients([]);
	}
	function goHome() {
		navigate('/');
	}
	return (
		<Layout>
			<form
				onSubmit={handleSubmit(submit)}
				className={form_styles.form}
			>
				{/* <AsyncSelect
								placeholder="Recipient"
								// options={options}
								loadOptions={loadOptionsHandler}
								onInputChange={value => console.log(value)}
							// onChange={(choice) => setValue('recipient', choice.value)}
							/> */}

				<label className={message_styles.label}>
					<input type="text" {...register('recipient', {
						required: 'The filed must be filled',
						minLength: {
							value: 1,
						},
					})}
						placeholder="Enter recipient"
					/>
					{recipients.length > 0 && (recipients.length === 1 && recipients[0].value !== recipient) &&
						<ul className={message_styles.list}>
							{recipients.map(recipient =>
								<li key={recipient.value} onClick={selectRecipient.bind(null, recipient.value)}>{recipient.value}</li>)}
						</ul>}
				</label>

				{messages_inputs.map(input =>
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
				<div className={form_styles['form__btns']}>
					<Button>Send</Button>
					<Button onClick={goHome}>Cancel</Button>
				</div >
			</form>
			<div className={message_styles.table}>
				{messages && <Table
					cols={cols}
					data={messages}
				/>}
			</div>
		</Layout>
	)
}
export default Messages;