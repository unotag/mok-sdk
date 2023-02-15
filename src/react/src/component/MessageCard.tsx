import React from "react"

interface props {
	text: string;
	time: string;
	textStyles: object;
	ruleStyles: object;
}

export const MessageCard = ({ text, time, textStyles, ruleStyles }: props) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '0 15px',
				}}>
				<p style={{ ...textStyles }}>{text}</p>
				<p style={{ fontSize: '14px', ...textStyles }}>{time}</p>
			</div>
			<hr style={{ opacity: '0.5', ...ruleStyles }} />
		</>
	);
};
