"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
class Client {
    constructor() {
        this.BASE_URL = 'app.mok.one';
    }
    setReadKey(readKey) {
        this.readKey = readKey;
        return this;
    }
    setWriteKey(writeKey) {
        this.writeKey = writeKey;
        return this;
    }
    setDev(dev) {
        if (dev)
            this.BASE_URL = 'dev.mok.one';
        return this;
    }
    computeData(data, goalName) {
        return new Promise((resolve, reject) => {
            if (!this.writeKey) {
                reject('Write API Key is not present');
            }
            for (let vars in data) {
                if (typeof data[vars] !== 'object' || data[vars] === null) {
                    reject('All entries of the array must be a Non Null Object');
                }
            }
            axios_1.default
                .post(`https://${this.BASE_URL}/api/customer/compute/${goalName}`, { data }, {
                headers: {
                    Authorization: this.writeKey,
                },
            })
                .then((res) => {
                resolve(res.data);
            })
                .catch((err) => {
                reject(err.response.data);
            });
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=app.js.map