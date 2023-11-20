import { LocationSummary } from "../interfaces/location.interface";

export const location = window.location

/*
    Returns the current visted page url
*/
export const getCurrentUrl = (): string => {
    return replaceTrailingSlash(location.href);
}

/*
    Returns the path name
    Eg: /test/1
*/
export const getPathName = (): string => {
    return location.pathname;
}

/*
    Returns the host without any protocol
*/
export const getHost = (): string => {
    return location.host;
}

/*
    Returns the protocol of the visited page 
    Eg: http, https
*/
export const getProtocol = (): string => {
    return location.protocol;
}

/*
    Get the domain name for user categorization
*/
export const getBaseUrl = (): string => {
    let url = getProtocol() + "//" + getHost();
    return url;
}

/*
    If site has an end slash (like: www.example.com/test/), 
    the following regex matches / at the end of the string ($) and replace it
*/
export const replaceTrailingSlash = (siteName: string): string => {
    return siteName.replace(/\/$/, '') 
}

/*
    Get a summary of the current webpage location
*/
export const getLocationSummary = (): LocationSummary => {
    return {
        domain: getBaseUrl(),
        currentPage: getCurrentUrl()
    }
}