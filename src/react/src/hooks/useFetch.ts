import axios, { AxiosRequestConfig } from 'axios';

export function getStylesData(baseUrl: string, key: string, setState: Function) {
	const config: AxiosRequestConfig = {
		method: 'GET',
		url: `${baseUrl}/api/customer/v1.2/sdk_config`,
		headers: {
			Authorization: key,
			'Content-Type': 'application/json',
		},
	};

	axios(config)
		.then((response) => {
			setState(response.data.data);
		})
		.catch((err) => {
			console.log(err.response.data);
		});
}
