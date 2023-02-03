const MessageCard = ({ text, time }: { text: string; time: string }) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '0 15px',
				}}>
				<p>{text}</p>
				<p style={{ opacity: '0.5', fontSize: '14px' }}>{time}</p>
			</div>
			<hr style={{ opacity: '0.5' }} />
		</>
	);
};

export default MessageCard;
