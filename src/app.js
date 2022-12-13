"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
//const JSObfuscator = require('javascript-obfuscator');
const CryptoJS = require('crypto-js');
class Client {
    constructor() {
        this.BASE_URL = 'app.mok.one';
    }
    setCipherKey(cipherKey) {
        this.cipherKey = cipherKey;
        return this;
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
            if (!this.cipherKey) {
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
            axios_1.default
                .post('https://' + this.BASE_URL + '/api/customer/compute/' + goalName, { data }, {
                headers: {
                    Authorization: this.writeKey,
                },
            })
                .then((res) => {
                resolve(CryptoJS.AES.encrypt(res.data, this.cipherKey).toString());
            })
                .catch((err) => {
                reject(err.response.data);
            });
        });
    }
}
exports.Client = Client;
const edata = CryptoJS.AES.encrypt("Data", "123").toString();
const ddata = CryptoJS.AES.decrypt(edata, "123").toString(CryptoJS.enc.Utf8);
console.log(edata);
console.log(ddata);
//# sourceMappingURL=app.js.map