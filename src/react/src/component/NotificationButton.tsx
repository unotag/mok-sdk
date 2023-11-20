import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, X, Settings, Check} from 'react-feather';

import { MessageCard } from './MessageCard';
import { ConfigProps, NotificationButtonProps } from '../types';
import { getStylesData } from '../hooks/useFetch';
import useInfiniteScrolling from '../hooks/useInfiniteScrolling';
import { Shade } from '../utils';
import { Settings as OrgSetting } from './Settings';
import { markAllAsRead } from '../hooks/useMarkAllRead';

export const NotificationButton = ({
	disableBellClick = false,
	readKey,
	writeKey,
	id,
	isDev,
	isLocal,
	messageBoxStyles,
	containerStyles,
	headerStyles,
	textStyles,
	ruleStyles,
	titleStyles,
	fullScreen,
}: NotificationButtonProps) => {
	const [clicked, setClicked] = useState(disableBellClick);
	const [pageNum, setPageNum] = useState(1);
	const [configData, setConfigData] = useState<ConfigProps>();
	const [triggerSetting, setTriggerSetting] = useState(false);

	const titleTextColor = Shade(configData?.titleBarBgColor) === 'light' ? '#000' : '#fff';
	const boxTextColor = Shade(configData?.notificationBgColor) === 'light' ? '#000' : '#fff';

	const toggle = () => setClicked((p) => !p);

	const BASE_URL = isDev
		? 'https://dev.mok.one'
		: isLocal
			? 'http://localhost:8080'
			: 'https://live.mok.one';

	const {
		data: messages,
		loading,
		error,
		hasMore,
	} = useInfiniteScrolling(BASE_URL, readKey, id, pageNum, 10);

	const observer = useRef<any>();
	const lastElem = useCallback(
		(node: any) => {
			if (loading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNum((prev) => prev + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	useEffect(() => {
		getStylesData(BASE_URL, readKey, setConfigData);
	}, []);

	const handleClick = () => {
		markAllAsRead(BASE_URL, id, writeKey);
	}

	return (
		<>
			<div style={{ ...containerStyles }}>
				{ !disableBellClick ? 
					<Bell style={{ cursor: 'pointer' }} onClick={toggle}>
						Messages
					</Bell>
					: <></>
				}
				{clicked && (
					<div
						style={{
							width: fullScreen? '100%' : '350px',
							height: fullScreen ? "90vh": '400px',
							overflowY: 'scroll',
							borderRadius: '5px',
							backgroundColor: configData?.notificationBgColor,
							color: boxTextColor,
							boxShadow: '0 0 20px rgb(89 102 122 / 35%)',						
							zIndex: '999 !important',
							...messageBoxStyles,
						}}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: configData?.titleBarBgColor,
								color: titleTextColor,
								padding: '0 15px',
								fontWeight: '500',
								height: '50px',
								...headerStyles,
							}}>
							{triggerSetting ? 
								<>
								<X 
									onClick={() => setTriggerSetting(!triggerSetting)}
									style={{ cursor: 'pointer' }} 
									size={14} 
								/>
								<div style={{fontSize: '14px'}}>Notification Prefrences</div>
								</>
								:
								<>
								<Settings 
									onClick={() => setTriggerSetting(!triggerSetting)}
									style={{ cursor: 'pointer' }} 
									size={14} 
								/>
								<div style={{fontSize: '16px'}}>Notifications</div>
								<Check style={{ cursor: 'pointer' }} size={14} onClick={handleClick} />
							</>
							}
						</div>
						{!messages.length && (
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
								No Notification Yet!!
							</div>
						)}
						{ triggerSetting ?
						<OrgSetting baseUrl={BASE_URL} id={id} readKey={readKey} writeKey={writeKey} /> 
						:
						messages.map((elem: any, index: number) => {
							if (messages.length === index + 1)
								return (
									<div ref={lastElem} key={index}>
										<MessageCard
											data={elem}
											textColor={boxTextColor}
											textStyles={textStyles ?? {}}
											ruleStyles={ruleStyles ?? {}}
											titleStyles={titleStyles ?? {}}
											id={id}
											baseUrl={BASE_URL}
											readKey={readKey}
											writeKey={writeKey}
										/>
									</div>
								);
							else
								return (
									<div key={index}>
										<MessageCard
											data={elem}
											textColor={boxTextColor}
											textStyles={textStyles ?? {}}
											ruleStyles={ruleStyles ?? {}}
											titleStyles={titleStyles ?? {}}
											id={id}
											baseUrl={BASE_URL}
											readKey={readKey}
											writeKey={writeKey}
										/>
									</div>
								);
								})}
								<div>{loading && 'Loading...'}</div>
					</div>
				)}
			</div>
		</>
	);
};
