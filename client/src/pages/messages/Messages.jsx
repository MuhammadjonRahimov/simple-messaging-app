import message_styles from './Messages.module.scss';
import form_styles from '../Form.module.scss'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMessage, getMessages } from '../../api/message-api';
import useHttp from '../../hooks/use-http';
import http from '../../utils/axios-instance';
import { messages_inputs } from '../../utils/inputs';
import { cols } from '../../utils/columns';

import Button from '../../components/UI/button/Button';
import Layout from '../../components/UI/layout/Layout';
import Table from '../../components/UI/table/Table';
import Spinner from '../../components/Spinner';

function Messages() {
	const navigate = useNavigate();
	const [recipients, setRecipients] = useState([]);

	const params = useParams();
	const { send } = useHttp(sendMessage);
	const { send: getMessage, loading, data: messages } = useHttp(getMessages);

	const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
		mode: "onSubmit",
	});

	const recipient = watch('recipient');

	useEffect(() => {
		getRecipients();
	}, [recipient]);

	useEffect(() => {
		getMessage(params.username);
		const getMessagesInterval = setInterval(() => {
			getMessage(params.username);
		}, 5000);
		return () => clearInterval(getMessagesInterval);
	}, []);

	async function submit(data) {
		await send({ ...data, sender: params.username });
		setValue('recipient', '');
		reset();
	}

	async function getRecipients() {
		const res = await http({ url: `/messages/recipients/${recipient}`, method: "GET" });
		setRecipients(res.data.data.recipients);
	}
	function selectRecipient(r) {
		setValue('recipient', r);
		// setValue('recipient', '');
		setRecipients([]);
	}
	function goHome() {
		navigate('/');
		setValue('recipient', '');
	}
	return (
		<Layout>
			{/* {loading ? <Spinner /> : */}
			<>
				<form
					onSubmit={handleSubmit(submit)}
					className={form_styles.form}
				>
					<label className={message_styles.label}>
						<input type="text" {...register('recipient', {
							required: 'The filed must be filled',
							minLength: {
								value: 1,
							},
						})}
							placeholder="Enter a recipient"
						/>
						{errors.recipient && <p className="error-text">{errors.recipient.message}</p>}
						{(recipients?.length > 0 && recipients[0].value !== recipient) &&
							<ul className={message_styles.list}>
								{recipients.map(recipient =>
									<li
										key={recipient.value}
										onClick={selectRecipient.bind(null, recipient.value)}
									>
										{recipient.value}
									</li>)}
							</ul>
						}
					</label>
					{messages_inputs.map(input =>
						<label key={input.name}>
							<input
								{...register(input.name, input.validation)}
								placeholder={input.placeholder}
								type={input.type}
							/>
							{errors[input.name] && <p className="error-text">{errors[input.name].message}</p>}
						</label>
					)}
					<textarea placeholder="Your message" {...register('text', {
						required: 'Message should not be empty!',
						minLength: {
							value: 1,
						},
					})}>
					</textarea>
					{errors.text && <p className="error-text">{errors.text.message}</p>}
					<div className={form_styles['form__btns']}>
						<Button type="submit">Send</Button>
						<Button onClick={goHome}>Cancel</Button>
					</div >
				</form>
				<div className={message_styles['table-block']}>
					{messages?.length > 0 && <Table
						cols={cols}
						data={messages}
					/>}
				</div>
			</>
			{/* } */}
		</Layout>
	)
}
export default Messages;