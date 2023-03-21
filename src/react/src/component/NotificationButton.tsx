import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, X } from 'react-feather';

import { MessageCard } from './MessageCard';
import { NotificationButtonProps, stylesProp } from '../types';
import { getStylesData } from '../hooks/useFetch';
import useInfiniteScrolling from '../hooks/useInfiniteScrolling';
import { Shade } from '../utils';

export const NotificationButton = ({
	apiKey,
	id,
	isDev,
	isLocal,
	position,
	messageBoxStyles,
	containerStyles,
	headerStyles,
	textStyles,
	ruleStyles,
}: NotificationButtonProps) => {
	const [clicked, setClicked] = useState(false);
	const [pageNum, setPageNum] = useState(1);
	const [stylesData, setStylesData] = useState<stylesProp>();

	const titleTextColor = Shade(stylesData?.titleBarBgColor) === 'light' ? '#000' : '#fff';
	const boxTextColor = Shade(stylesData?.notificationBgColor) === 'light' ? '#000' : '#fff';

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
	} = useInfiniteScrolling(BASE_URL, apiKey, id, pageNum, 10);

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
		getStylesData(BASE_URL, apiKey, setStylesData);
	}, []);

	return (
		<>
			<div style={{ position: 'relative', ...containerStyles }}>
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
							backgroundColor: stylesData?.notificationBgColor,
							color: boxTextColor,
							boxShadow: '0 0 20px rgb(89 102 122 / 35%)',
							position: 'absolute',
							left: position === 'left' ? -278 : 0,
							right: position === 'right' ? 278 : 0,
							zIndex: '999 !important',
							...messageBoxStyles,
						}}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: stylesData?.titleBarBgColor,
								color: titleTextColor,
								padding: '0 15px',
								fontWeight: '500',
								height: '50px',
								position: 'sticky',
								...headerStyles,
							}}>
							Notifications
							<X style={{ cursor: 'pointer' }} size={16} onClick={toggle} />
						</div>
						{!messages.length ? (
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
								No Notification Yet!!
							</div>
						) : (
							<>
								{messages.map((elem: any, index: number) => {
									if (messages.length === index + 1)
										return (
											<div ref={lastElem} key={index}>
												<MessageCard
													text={JSON.parse(elem.json_data).text}
													time={elem.createdAt}
													textColor={boxTextColor}
													textStyles={textStyles ?? {}}
													ruleStyles={ruleStyles ?? {}}
												/>
											</div>
										);
									else
										return (
											<div key={index}>
												<MessageCard
													text={JSON.parse(elem.json_data).text}
													time={elem.createdAt}
													textColor={boxTextColor}
													textStyles={textStyles ?? {}}
													ruleStyles={ruleStyles ?? {}}
												/>
											</div>
										);
								})}
								<div>{loading && 'Loading...'}</div>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
};
