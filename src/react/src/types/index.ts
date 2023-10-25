export interface NotificationButtonProps {
	disableBellClick?: boolean
	readKey: string;
	writeKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
	containerStyles?: object;
	messageBoxStyles?: object;
	headerStyles?: object;
	textStyles?: object;
	ruleStyles?: object;
	titleStyles?: object;
	fullScreen?: boolean;
}

export interface ConfigProps {
	notificationBgColor: string;
	titleBarBgColor: string;
	categories: any;
}

export interface MessageCardProps {
	data: any;
	textColor: string;
	textStyles: object;
	ruleStyles: object;
	titleStyles: object;
	id: string;
	baseUrl: string;
	readKey: string;
	writeKey: string;
}

export interface SettingsProps {
	baseUrl: string;
	id: string;
	readKey: string;
	writeKey: string;
}

export interface PopupProps {
	readKey: string;
	writeKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
}

interface ICategory {
	name: string;
	allowed: boolean;
 	timeWindow?: string;
	region?: string;
}

export interface IAllowedCategories extends Array<ICategory>{ }