import axios, { AxiosRequestConfig } from 'axios';

// @ts-ignore
// import key from "../../../../key";

interface IDevice {
	os: string;
	name: string;
	version: string;
	token: string;
	type: 'apn' | 'fcm';
}

interface ICategory {
	name: string;
	allowed: boolean;
 	timeWindow?: string;
	region?: string;
}

interface IAllowedCategories extends Array<ICategory>{}

// const getEncryptedHeader = async (data: any) => {
// 	const algorithmParameters = {
// 		name: 'RSASSA-PKCS1-v1_5',
// 		modulusLength: 4096,
// 		publicExponent: new Uint8Array([1, 0, 1]),
// 		hash: 'SHA-256',
// 	};

// 	const normalKey = await window.crypto.subtle.importKey(
// 		'jwk',
// 		key,
// 		algorithmParameters,
// 		true,
// 		['sign']
// 	)

// 	const message = JSON.stringify(data);
// 	const encoder = new TextEncoder();

// 	const signatureBytes = await window.crypto.subtle.sign(
// 		algorithmParameters,
// 		normalKey,
// 		encoder.encode(message)
// 	);

// 	return window.btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
// }

export class BrowserClient {
	readKey: string;
	writeKey: string;
	BASE_URL = 'https://live.mok.one/api/customer/v1.2';
	clientId: string;

	constructor() {
		this.readKey = "";
		this.writeKey = "";
		this.clientId = "";
	}

	setUserProperty(data: object) {
		return new Promise(async (resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}
			if (!this.clientId) {
				reject('External id is not present');
			}

			const config: AxiosRequestConfig = {
				method: 'PATCH',
				url: `${this.BASE_URL}/registration/${this.clientId}`,
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

			// const base64body = await getEncryptedHeader(data)

			axios
				.post(
					`${this.BASE_URL}/compute/${goalName}`,
					{ data },
					{
						headers: {
							Authorization: this.writeKey,
							// 'x-signature': base64body
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

			// const base64body = await getEncryptedHeader(data)

			const config: AxiosRequestConfig = {
				method: 'POST',
				url: `${this.BASE_URL}/trigger/${uuid}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json',
					// 'x-signature': base64body
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

	setAllowedCategories(allowedCategories:IAllowedCategories) {
		return this.setUserProperty({ allowedCategories });
	}

	getUserProperty () {
		return new Promise(async(resolve, reject) => {
			if (!this.readKey) {
				reject('Read API Key is not present');
			}

			// const base64body = await getEncryptedHeader({})

			const config: AxiosRequestConfig = {
				method: 'GET',
				url: `${this.BASE_URL}/user_properties/${this.clientId}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json',
					// 'x-signature': base64body
				}
			}

			axios(config).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err.response.data)
			})
		})
	}

	addDevice(device: IDevice) {
		return new Promise (async (resolve, reject) => {
			if (!this.writeKey) {
				reject('Write API Key is not present');
			}
			
			// const base64body = await getEncryptedHeader(device)

			const config: AxiosRequestConfig = {
				method: 'POST',
				url: `${this.BASE_URL}/add-device/${this.clientId}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json',
					// 'x-signature': base64body
				},
				data : {device: {...device}}
			}

			axios(config).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err.response.data)
			})
		})
	}

	addUserActivity(activity_name: string, data?: object) {
		return new Promise(async (resolve, reject) => {
			if(!this.writeKey){
				reject('Write API Key is not present');
			}

			const config: AxiosRequestConfig = {
				method: 'POST',
				url: `${this.BASE_URL}/add-user-activity/${this.clientId}`,
				headers: {
					'Authorization': this.writeKey,
					'Content-Type': 'application/json'
				},
				data : {event_name: activity_name, ...data}
			}

			axios(config).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err.response.data)
			})
		})
	}
	
	markAsRead(in_app_id: string) {
		return new Promise(async (resolve, reject) => {
		  	if (!this.writeKey) {
				reject("Write API Key is not present");
		  	}
	
		  	// const base64body = await getEncryptedHeader({});
	
		  	const config: AxiosRequestConfig = {
				method: "PATCH",
				url: `${this.BASE_URL}/mark_read_in_app/${this.clientId}?in_app_id=${in_app_id}`,
				headers: {
				Authorization: this.writeKey,
					"Content-Type": "application/json",
					// "x-signature": base64body,
				},
		  	};
	
		  	axios(config).then((response) => {
				resolve(response.data);
			}).catch((err) => {
				reject(err.response.data);
			});
		});
	}

	markAllAsRead() {
		return new Promise(async (resolve, reject) => {
			if (!this.writeKey) {
			  reject("Write API Key is not present");
			}
  
			// const base64body = await getEncryptedHeader({});
  
			const config: AxiosRequestConfig = {
				method: "PATCH",
				url: `${this.BASE_URL}/mark_read_in_app/${this.clientId}?type=all`,
				headers: {
				Authorization: this.writeKey,
					"Content-Type": "application/json",
					// "x-signature": base64body,
				},
			};
  
			axios(config).then((response) => {
			  	resolve(response.data);
		  	}).catch((err) => {
			 	reject(err.response.data);
		  	});
	  	});
	}
}