import moment from 'moment';
import axios, { AxiosRequestConfig } from 'axios';
import FingerprintJs, { Agent, GetResult} from '@fingerprintjs/fingerprintjs';

export function Shade(color: any) {
	// To handle Edge cases where color is undefined
	if (!color) return 'light';
	// Variables for red, green, blue values
	var r: any, g: any, b: any, hsp: any;

	// Check the format of the color, HEX or RGB?
	if (color.match(/^rgb/)) {
		// If RGB --> store the red, green, blue values in separate variables
		color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)!;

		r = color[1];
		g = color[2];
		b = color[3];
	} else {
		// If hex --> Convert it to RGB: http://gist.github.com/983661
		color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

		r = color >> 16;
		g = (color >> 8) & 255;
		b = color & 255;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

	// Using the HSP value, determine whether the color is light or dark
	if (hsp > 127.5) {
		return 'light';
	} else {
		return 'dark';
	}
}

export function formatDate(date: any) {
	const now = moment();
  const reqDate = moment(moment(date).utc().format('YYYY-MM-DD HH:mm:ss'));

	const diff = moment.duration(reqDate.diff(now)).humanize(true);

	return diff;
}

export function asyncWrap(promise: Promise<any>): any {
    return promise.then((result) => [null, result]).catch((err) => [err]);
}

export const getBrowserSignature = () => {
    return FingerprintJs.load().then((r: Agent) => {
        return r.get().then((data: GetResult) => {
            return data.visitorId;
        });
    })
}

export const urlBase64ToUint8Array = (base64String:string) => {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const getVapidPublicKey = (baseUrl: string, key: string) => {
	const config: AxiosRequestConfig = {
		method: 'GET',
		url: `${baseUrl}/api/customer/v1.2/vapid-keys`,
		headers: {
			Authorization: key,
			'Content-Type': 'application/json',
		},
	};

    return axios(config).then(r => r.data);
}
