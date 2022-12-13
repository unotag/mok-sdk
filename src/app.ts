import axios from 'axios';
//const JSObfuscator = require('javascript-obfuscator');
const CryptoJS = require('crypto-js');


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

			axios
				.post('https://' + this.BASE_URL + '/api/customer/compute/' + goalName,
					
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
const edata= CryptoJS.AES.encrypt("Data","123").toString();
const ddata= CryptoJS.AES.decrypt(edata, "123").toString(CryptoJS.enc.Utf8);

console.log(edata);
console.log(ddata);