import { BrowserClient } from "../core/browser";
import { IMok } from "./mok.interface";

export interface IEvent { 
    attachEventListenerToDocument(browserClient: BrowserClient, mok: IMok, callback: Function | null): void;
}