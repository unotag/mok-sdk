import { IMok, MokConfig } from "./../../browser/src/interfaces/mok.interface";
import * as core from './../../browser/src/browser.main';

const Mok: IMok = {
    ...core.default,
    sdk: "node",
    init: async function(config: MokConfig) {
        this.browserClient.setReadKey(config.readKey);
        this.browserClient.setWriteKey(config.writeKey);
        this.callback = config.callback;
        this.setUserFn = config.setUser;
        return Promise.resolve(this);
    }
}

export default Mok;