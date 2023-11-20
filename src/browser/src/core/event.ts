import { IMok } from "../interfaces/mok.interface";
import { BrowserClient } from "./browser";

/*
    Capture events that are happening across the website
*/
export const attachEventListenerToDocument = (browserClient: BrowserClient, mok: IMok, callback: Function | null): void => {

    // Capturing clicks of document through bubbling
    document.body.addEventListener("click", function (e) {
        if(!browserClient || !mok) {
            throw "Arguments must be an instance of BrowserClient and MOK object";
        }

        if(!mok.visitorId) {
            throw "Please initialize the SDK";
        }

        let element = e.target as HTMLInputElement;
        let elementAttributes = mok.dom.getElementAttributes(element);
        let allowedTags = [
            'button',
            'a',
            'input',
            'img',
            'video'
        ]; // Allowed elements to determine valid clicks

        if(allowedTags.includes(elementAttributes.tagName)) {
            if(elementAttributes.tagName === "input") {
                delete elementAttributes.value; // We won't probably want what the user types inside the field
            }

            let data = {
                event_type: "click",
                ...mok.platform.getBrowserSummary(),
                ...mok.location.getLocationSummary(),
                ...elementAttributes,
            }

            browserClient.addUserActivity("click", data).then(() => {
                // Call the user defined function after the event is being sent
                callback && callback(data);
            });
        }
    });

    // We assume that whenever this function is invoked, it would be a page visit
    let data = {
        event_type: "visit",
        ...mok.platform.getBrowserSummary(),
        ...mok.location.getLocationSummary()
    };
    browserClient.addUserActivity("visit",data).then(() => {
        // Call the user defined function after the event is being sent
        callback && callback(data);
    });
}