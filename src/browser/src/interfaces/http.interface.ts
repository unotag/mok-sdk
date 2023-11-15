export interface AnalyticsData {
    visitorId: string;
    browserType: string;
    browserRes: string;
    os: string;
    requestType: string;
    domain: string;
    [metadata: string]: string;
}

export interface IHttp {
    sendData(data: AnalyticsData): void
}