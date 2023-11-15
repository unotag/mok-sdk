export interface LocationSummary {
    domain: string;
    currentPage: string;
}

export interface ILocation {
    location: Location;
    getCurrentUrl(): string;
    getPathName(): string;
    getHost(): string;
    getProtocol(): string;
    getBaseUrl(): string;
    replaceTrailingSlash(siteName: string): string;
    getLocationSummary(): LocationSummary;
}