import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { Bell, X } from 'react-feather';

import MessageCard from './MessageCard';
import './styles.css';

interface props {
	apiKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
	position?: string;
}

export const NotificationButton = ({ apiKey, id, isDev, isLocal, position }: props) => {
	const [clicked, setClicked] = useState(false);
	const [messages, setMessages] = useState([]);

	const toggle = () => setClicked((p) => !p);

	useEffect(() => {
		const BASE_URL = isDev
			? 'https://dev.mok.one'
			: isLocal
			? 'http://localhost:8080'
			: 'https://live.mok.one';

		const config: AxiosRequestConfig = {
			method: 'GET',
			url: `${BASE_URL}/api/customer/in_app_operation_data?external_player_id=${id}`,
			headers: {
				Authorization: apiKey,
				'Content-Type': 'application/json',
			},
		};

		axios(config)
			.then((response) => {
				setMessages(response.data.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<>
			<div style={{ position: 'relative' }}>
				<Bell style={{ cursor: 'pointer' }} onClick={toggle}>
					Messages
				</Bell>
				{clicked && (
					<div
						style={{
							width: '300px',
							height: '350px',
							overflowY: 'scroll',
							borderRadius: '5px',
							boxShadow: '0 0 20px rgb(89 102 122 / 50%)',
							position: 'absolute',
							left: position === 'left' ? -278 : 0,
							right: position === 'right' ? 278 : 0,
							zIndex: '999 !important',
						}}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: '#D3D3D3',
								padding: '0 15px',
								fontWeight: '500',
								height: '50px',
								position: 'sticky',
							}}>
							Notifications
							<X style={{ cursor: 'pointer' }} size={16} onClick={toggle} />
						</div>
						{!messages.length && (
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
								No Notification Yet!!
							</div>
						)}
						{messages.map((elem: any, index: number) => (
							<MessageCard
								key={index}
								text={JSON.parse(elem.json_data).text}
								time={moment.duration(moment(elem.createdAt).diff(moment())).humanize(true)}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
};
