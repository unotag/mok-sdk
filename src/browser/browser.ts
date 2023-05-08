import axios, { AxiosRequestConfig } from 'axios';

import key from "../../key";

const commenHeaders = {
	'User-Agent': 'MokSDK/0.7.5',
	'Content-Type': 'application/json',
}

const getEncryptedHeader = async (data: any) => {
	const algorithmParameters = {
		name: 'RSASSA-PKCS1-v1_5',
		modulusLength: 4096,
		publicExponent: new Uint8Array([1, 0, 1]),
		hash: 'SHA-256',
	};

	const normalKey = await window.crypto.subtle.importKey(
		'jwk',
		key,
		algorithmParameters,
		true,
		['sign']
	)

	const message = JSON.stringify(data);
	const encoder = new TextEncoder();

	const signatureBytes = await window.crypto.subtle.sign(
		algorithmParameters,
		normalKey,
		encoder.encode(message)
	);

	return window.btoa(String.fromCharCode.apply(null, new Uint8Array(signatureBytes)))

}

export class BrowserClient {
	readKey: string;
	writeKey: string;
	BASE_URL = 'https://live.mok.one/api/customer/v1.2';
	clientId: string;

	setUserProperty(data: object) {
		return new Promise(async (resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}
			if (!this.clientId) {
				reject('External id is not present');
			}
			const base64body = await getEncryptedHeader(data);

			const config: AxiosRequestConfig = {
				method: 'PATCH',
				url: `${this.BASE_URL}/registration/${this.clientId}`,
				headers: {
					'Authorization': this.writeKey,
					'x-signature': base64body,
					...commenHeaders
				},
				data
			}

			axios(config).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err.response.data)
			})
		})
	}

	setUser(id: string) {
		this.clientId = id;
		return this.setUserProperty({ client_id: id });
	}

	setFCMToken(token: string) {
		return this.setUserProperty({ fcm_registration_token: token });
	}

	setMobileNumber(phone: string) {
		return this.setUserProperty({ mobile_number: phone });
	}

	setReadKey(readKey: string) {
		this.readKey = readKey;
		return this;
	}

	setWriteKey(writeKey: string) {
		this.writeKey = writeKey;
		return this;
	}

	setDev(dev: boolean) {
		if (dev) this.BASE_URL = 'https://dev.mok.one/api/customer/v1.2';
		return this;
	}

	computeData(data: any[], goalName: string) {
		return new Promise(async (resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}

			for (let vars in data) {
				if (typeof data[vars] !== 'object' || data[vars] === null) {
					reject('All entries of the array must be a Non Null Object');
				}
			}

			const base64body = await getEncryptedHeader(data)

			axios
				.post(
					`${this.BASE_URL}/compute/${goalName}`,
					{ data },
					{
						headers: {
							Authorization: this.writeKey,
							'x-signature': base64body,
							...commenHeaders
						},
					}
				)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.response.data);
				});
		});
	}

	triggerNotificationWorkflow(uuid: string, data: object) {
		return new Promise(async (resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}

			const base64body = await getEncryptedHeader(data)

			const config: AxiosRequestConfig = {
				method: 'POST',
				url: `${this.BASE_URL}/trigger/${uuid}`,
				headers: {
					'Authorization': this.writeKey,
					'x-signature': base64body,
					...commenHeaders
				},
				data
			}

			axios(config).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err.response.data)
			})
		})
	}
}