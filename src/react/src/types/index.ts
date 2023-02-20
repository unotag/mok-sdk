export interface NotificationButtonProps {
	apiKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
	position?: string;
	containerStyles?: object;
	messageBoxStyles?: object;
	headerStyles?: object;
	textStyles?: object;
	ruleStyles?: object;
}

export interface stylesProp {
	notificationBgColor: string;
	titleBarBgColor: string;
}

export interface MessageCardProps {
	text: string;
	time: string;
	textColor: string;
	textStyles: object;
	ruleStyles: object;
}