import { IDom } from "./dom.interface";
import { IEvent } from "./event.interface";
import { IHttp } from "./http.interface";
import { ILocation } from "./location.interface";
import { IPlatform } from "./platform.interface";

export interface MokConfig {
    readKey: string;
    writeKey: string;
    callback(fn: Function): any;
}

export interface IMok {
    visitorId: string;
    init(config: MokConfig): Promise<IMok>;
    platform: IPlatform;
    location: ILocation;
    dom: IDom;
    http: IHttp;
    event: IEvent;
}