export interface ElementAttributes {
    tagName: string;
    [metadata: string]: string;
}

export interface IDom {
    getDocumentTitle(): string;
    getElementAttributes(element: HTMLElement): ElementAttributes;
}