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

export interface NormalPopup {
	popupData: { html: string }[];// Replace YourPopupDataType with the actual type for popup data
	handleClearAll: () => void;
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>void;
	latestPopupData: any; // Replace LatestPopupDataType with the actual type for the latest popup data
	handleCloseBtn: () => void;
  }

export interface FullPagePopup{
	popupData: { html: string }[];
	handleClearAll: () => void;
	handleCloseBtn: () => void;
	latestPopupData: any; 
}

export interface FloatingPopup{
	popupData: { html: string }[];
	handleCloseBtn: () => void;
	latestPopupData: any; 
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>void;
}

export interface BottomSheetPopup{
	popupData: { html: string }[];
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>void;
	handleCloseBtn: () => void;
}

export interface IAllowedCategories extends Array<ICategory>{ }