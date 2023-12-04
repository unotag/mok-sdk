import { ElementAttributes } from "../interfaces/dom.interface";

export const getDocumentTitle = (): string => {
    return document.title;
}

export const getElementAttributes = (element: HTMLElement): ElementAttributes => {
    let attributes: ElementAttributes = { 
        tagName: "" 
    };
    for (let att, i = 0, atts = element.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        if(att.nodeName && att.nodeValue) {
            attributes[att.nodeName] = att.nodeValue;
        }
    }
    attributes.tagName = element.tagName.toLowerCase();
    return attributes;
}