import { BrowserClient } from "../core/browser";
import { IDom } from "./dom.interface";
import { IEvent } from "./event.interface";
import { ILocation } from "./location.interface";
import { IMiddleware } from "./middleware.interface";
import { IPlatform } from "./platform.interface";

export interface MokConfig {
    readKey: string;
    writeKey: string;
    callback?: (fn: Function) => any; // User defined function that invokes everytime an event happens
    setUser?: (fn: Function) => string | Promise<string>; // User defined function to set a user ID
}

export interface IMok {
    sdk: string;
    visitorId: string;
    url: string;
    browserClient: BrowserClient,
    callback: Function | null | undefined,
    setUserFn: Function | null | undefined,
    init(config: MokConfig): Promise<IMok>;
    platform: IPlatform;
    location: ILocation;
    dom: IDom;
    event: IEvent;
    middleware: IMiddleware;
}