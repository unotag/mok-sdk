import { MessageCardProps } from '../types';

export const MessageCard = ({
	text,
	time,
	textColor,
	textStyles,
	ruleStyles,
}: MessageCardProps) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '0 15px',
					color: textColor,
				}}>
				<p style={{ ...textStyles }}>{text}</p>
				<p style={{ fontSize: '14px', ...textStyles }}>{time}</p>
			</div>
			<hr style={{ opacity: '0.5', ...ruleStyles, color: textColor }} />
		</>
	);
};
