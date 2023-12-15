import * as core from "./core";
import { IMok, MokConfig } from "./interfaces/mok.interface";
import { BrowserClient } from "./core/browser";

declare global {
    interface Window { Mok: any; }
}

const Mok: IMok = {
    visitorId: "",
    sdk: "browser",
    url: "",
    callback: undefined,
    setUserFn: undefined,
    browserClient: new BrowserClient(),
    init: async function (config: MokConfig): Promise<IMok> {
        this.visitorId = await this.platform.getBrowserSignature();
        this.url = this.location.getCurrentUrl();
        this.browserClient.setReadKey(config.readKey);
        this.browserClient.setWriteKey(config.writeKey);
        this.callback = config.callback;
        this.setUserFn = config.setUser;

        try {
            // Create or update the browser client to the server
            await this.browserClient.setUser(this.visitorId);

            // Attach event listener to web document. If the sdk type is different, it is likely we want to invoke this function manually
            if(this.sdk === "browser") {
                this.event.attachEventListenerToDocument(this);
            }
            return Promise.resolve(this);
        } catch(e) {
            console.log(e);
            throw "Browser sdk could not be initialized";
        }
    },
    ...core
}


if (typeof window !== 'undefined') {
    window.Mok = Mok;
}

export default Mok;