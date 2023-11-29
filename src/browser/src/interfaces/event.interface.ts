import { IMok } from "./mok.interface";

export interface IEvent { 
    attachEventListenerToDocument(mok: IMok): void;
    addUserActivity(type: string, data: { [key: string]: string }, mok: IMok): void;
}