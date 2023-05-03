import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useInfiniteScrolling(
	baseUrl: string,
	key: string,
	id: string,
	pageNo: number,
	pageSize: number
) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState<object[]>([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel: any;

		axios({
			method: 'GET',
			url: `${baseUrl}/api/customer/v1.2/in_app_operation_data?external_player_id=${id}`,
			params: {
				pageNo,
				pageSize,
			},
			headers: {
				Authorization: key,
				'Content-Type': 'application/json',
			},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setData((prev) => [...prev, ...res.data.data]);

				setHasMore(res.data.data.length === pageSize);
				setLoading(false);
			})
			.catch((err) => {
				if (axios.isCancel(err)) return;

				setError(true);
			});

		return () => cancel();
	}, [baseUrl, pageNo]);

	return { loading, error, data, hasMore };
}
