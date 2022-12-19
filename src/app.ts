import axios from 'axios';

const CryptoJS = require('crypto-js');
//import * as CryptoJS from "crypto-js";


export class Client {
	readKey: string;
	writeKey: string;
	cipherKey:string;
	BASE_URL = 'app.mok.one';
	
	setCipherKey(cipherKey: string) {
		this.cipherKey = cipherKey;

		return this;
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
			if(!this.cipherKey) {
				reject(new Error('Cipher Key is not present'));
			}

			if (!this.writeKey) {
				reject('Write API Key is not present');
			}

			for (let vars in data) {
				if (typeof data[vars] !== 'object' || data[vars] === null) {
					reject('All entries of the array must be a Non Null Object');
				}
			}

			/* Encrypt Request Payload/Params*/
			for(let val in data) {
				if(data[val]!==null){				
				  data[val] = CryptoJS.AES.encrypt(data[val], this.cipherKey).toString()
				}
			}

			axios
				.post(`https://${this.BASE_URL}/api/customer/compute/${goalName}`,
					
					{ data },
					{
						headers: {
							Authorization: this.writeKey,
						},
					}
				)
				.then((res) => {					
					resolve(CryptoJS.AES.encrypt(res.data, this.cipherKey).toString());
				})
				.catch((err) => {
					reject(err.response.data);
				});
		});
	}
}

