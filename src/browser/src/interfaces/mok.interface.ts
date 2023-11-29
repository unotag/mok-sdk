import { BrowserClient } from "../core/browser";
import { IDom } from "./dom.interface";
import { IEvent } from "./event.interface";
import { ILocation } from "./location.interface";
import { IPlatform } from "./platform.interface";

export interface MokConfig {
    readKey: string;
    writeKey: string;
    callback?: (fn: Function) => any;
}

export interface IMok {
    sdk: string;
    visitorId: string;
    url: string;
    browserClient: BrowserClient,
    callback: Function | null | undefined,
    init(config: MokConfig): Promise<IMok>;
    platform: IPlatform;
    location: ILocation;
    dom: IDom;
    event: IEvent;
}