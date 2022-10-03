import axios from 'axios';

export class Client {
	readKey: string;
	writeKey: string;
	BASE_URL = 'app.mok.one';

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
}
