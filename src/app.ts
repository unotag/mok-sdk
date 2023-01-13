import axios, { AxiosRequestConfig } from 'axios';

export class Client {
	readKey: string;
	writeKey: string;
	BASE_URL = 'live.mok.one';
	clientId: string;

	setUserProperty(data: object) {
		return new Promise((resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}
			if (!this.clientId) {
				reject('External id is not present');
			}

			const config: AxiosRequestConfig = {
				method: 'PATCH',
				url: `https://${this.BASE_URL}/api/customer/registration/${this.clientId}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json'
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
		if (dev) this.BASE_URL = 'dev.mok.one';
		return this;
	}

	computeData(data: any[], goalName: string) {
		return new Promise((resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}

			for (let vars in data) {
				if (typeof data[vars] !== 'object' || data[vars] === null) {
					reject('All entries of the array must be a Non Null Object');
				}
			}

			axios
				.post(
					`https://${this.BASE_URL}/api/customer/compute/${goalName}`,
					{ data },
					{
						headers: {
							Authorization: this.writeKey,
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
		return new Promise((resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}

			const config: AxiosRequestConfig = {
				method: 'POST',
				url: `https://${this.BASE_URL}/api/customer/trigger/${uuid}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json'
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
