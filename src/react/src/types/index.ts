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

export interface CheckListPopupProps {
	readKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
}

export interface CarouselProps {
	readKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
}

export interface MokOnBoardingProps {
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

export interface ICarousel {
	CarouselData: any;
	CarouselIndex: any;
}

export interface NormalPopup {
	popupData: { html: string }[];// Replace YourPopupDataType with the actual type for popup data
	handleClearAll: () => void;
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>,in_app_id:string|undefined) =>void;
	latestPopupData: any; // Replace LatestPopupDataType with the actual type for the latest popup data
	handleCloseBtn: (in_app_id:string|undefined) => void;
  }

export interface FullPagePopup{
	popupData: { html: string }[];
	handleClearAll: () => void;
	handleCloseBtn: (in_app_id:string|undefined) => void;
	latestPopupData: any; 
}

export interface FloatingPopup{
	popupData: { html: string }[];
	handleCloseBtn: (in_app_id:string|undefined) => void;
	latestPopupData: any; 
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>,in_app_id:string|undefined) =>void;
}

export interface BottomSheetPopup{
	popupData: { html: string }[];
	latestPopupData: any;
	handleOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>,in_app_id:string|undefined) =>void;
	handleCloseBtn: (in_app_id:string|undefined) => void;
}

export interface PersonalizedLandingProps {
	readKey: string;
	id: string;
	isDev?: boolean;
	isLocal?: boolean;
}

export interface IAllowedCategories extends Array<ICategory>{ }