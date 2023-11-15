export interface BrowserType {
    name: string;
    version: string;
}

export interface BrowserPlatform {
    os: string;
    osVersion: string;
}

export interface BrowserResolution {
    width: number;
    height: number;
    resolution: string;
}

export interface BrowserSummary {
    browserType: string;
    browserRes: string;
    os: string;
}

export interface IPlatform {
    getBrowserType(): BrowserType,
    getBrowserPlatform(): BrowserPlatform,
    getBrowserResolution(): BrowserResolution,
    getBrowserSignature(): Promise<string>,
    isBrowserOutdated(): boolean,
    supportsBeacon(): boolean,
    getBrowserSummary(): BrowserSummary
}