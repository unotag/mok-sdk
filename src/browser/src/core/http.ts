import { AnalyticsData } from "../interfaces/http.interface";
import { isBrowserOutdated, supportsBeacon } from "./platform";

/*
    Function used to transmit data from various events
*/
export const sendData = (data: AnalyticsData) => {
    setTimeout(() => {
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))

        if(supportsBeacon() && !isBrowserOutdated()) {  // Attempting to send via beacon since the data is small enough
            navigator.sendBeacon('/test', formData)
        } else { 
            const xhr = new XMLHttpRequest(); // Fallback if browser doesn't support beacon, only intended for ancient browsers
            xhr.open("POST", "/server", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(formData);
        }
        
    },100);
}