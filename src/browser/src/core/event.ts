import { IMok } from "../interfaces/mok.interface";

/*
    Capture events that are happening across the website
*/
export const attachEventListenerToDocument = (mok: IMok): void => {
    if(!mok) {
        throw "Arguments must be an instance of MOK object";
    }

    if(!mok.visitorId) {
        throw "Please initialize the SDK";
    }

    // Capturing clicks of document through bubbling
    document.body.addEventListener("click", function (e) {

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

            mok.event.addUserActivity(
                "click",
                elementAttributes,
                mok
            );
        }

        // We're detecting page visits for Single Page Applications using this callback
        requestAnimationFrame(()=> {
            let currentUrl = mok.location.getCurrentUrl();
            if(mok.url !== currentUrl){
                mok.event.addUserActivity(
                    "visit",
                    {},
                    mok
                );
            }
            mok.url = currentUrl;
        });
    });

    // We assume that whenever this function is invoked, it would be a page visit
    mok.event.addUserActivity(
        "visit",
        {},
        mok
    );
}

export const addUserActivity = (
    type: string,
    data: {[key:string]: string}, 
    mok: IMok
): void => {
    let eventData = {
        sdk: mok.sdk,
        event_type: type,
        documentTitle: mok.dom.getDocumentTitle(),
        ...data,
        ...mok.platform.getBrowserSummary(),
        ...mok.location.getLocationSummary()
    };
    mok.browserClient.addUserActivity(type,eventData).then(() => {
        // Call the user defined function after the event is being sent
        mok.callback && mok.callback(eventData);
    });
}