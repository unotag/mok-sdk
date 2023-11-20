import * as core from "./core";
import { IMok, MokConfig } from "./interfaces/mok.interface";
import { BrowserClient } from "./core/browser";

declare global {
    interface Window { Mok: any; }
}

const Mok = {
    visitorId: "",
    init: async function (config: MokConfig): Promise<IMok> {
        this.visitorId = await this.platform.getBrowserSignature();
        let browserClient = new BrowserClient();
        browserClient.setReadKey(config.readKey);
        browserClient.setWriteKey(config.writeKey);
        try {
            // Create or update the browser client to the server
            await browserClient.setUser(this.visitorId);

            // Attach event listener to web document
            this.event.attachEventListenerToDocument(
                browserClient,
                this,
                config.callback || null
            )
            return Promise.resolve(this);
        } catch(e) {
            console.log(e);
            throw "Browser sdk could not be initialized";
        }
    },
    ...core
}

window.Mok = Mok;

export default Mok;