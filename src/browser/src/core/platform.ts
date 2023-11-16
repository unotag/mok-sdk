import FingerprintJS, { Agent, GetResult } from '@fingerprintjs/fingerprintjs';
import { BrowserPlatform, BrowserResolution, BrowserSummary, BrowserType } from '../interfaces/platform.interface';

/*
    Returns user agent of the browser
*/
export const getBrowserAgent = () => {
    return navigator.userAgent;
}

/*
    Detects browser type using user-agent
*/
export const getBrowserType = (): BrowserType => {
    const userAgent = getBrowserAgent();
    let browserType: BrowserType;
    let offset: any; //Temporary variable to store offset to determine browser version
    let nameOffset: any; //Temporary variable to store offset for unknown browsers

    if ((offset = userAgent.indexOf("Opera")) != -1) {
        let version = userAgent.substring(offset + 6);
        if ((offset = userAgent.indexOf('Version')) != -1) {
            version = userAgent.substring(offset + 8);
        }
        browserType = {
            name: "Opera",
            version
        };
    } else if ((offset = userAgent.indexOf('OPR')) != -1) { // Fallback for Opera Next which uses a different user agent
        browserType = {
            name: "Opera",
            version: userAgent.substring(offset + 4)
        };
    }
    else if ((offset = userAgent.indexOf("Edg")) != -1) { // Only works for chromium based Edge iterations
        browserType = {
            name: "Edge",
            version: userAgent.substring(offset + 4)
        };
    } else if ((offset = userAgent.indexOf("Chrome")) != -1) {
        browserType = {
            name: "Chrome",
            version: userAgent.substring(offset + 7)
        };
    } else if ((offset = userAgent.indexOf("Safari")) != -1) {
        let version = userAgent.substring(offset + 7);
        if ((offset = userAgent.indexOf('Version')) != -1) {
            version = userAgent.substring(offset + 8);
        }
        browserType = {
            name: "Safari",
            version
        };
    } else if ((offset = userAgent.indexOf("Firefox")) != -1) {
        browserType = {
            name: "Firefox",
            version: userAgent.substring(offset + 8)
        };
    } else if ((offset = userAgent.indexOf('SamsungBrowser')) != -1) {
        browserType = {
            name: "Samsung",
            version: userAgent.substring(offset + 15)
        };
    } else if ((offset = userAgent.indexOf("MSIE")) != -1) {
        browserType = {
            name: "Internet Explorer",
            version: userAgent.substring(offset + 5)
        };
    } else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) < (offset = userAgent.lastIndexOf('/'))) {
        let name = userAgent.substring(nameOffset, offset);
        let version = userAgent.substring(offset + 1);
        if (name.toLowerCase() == name.toUpperCase()) {
            name = navigator.appName;
        }
        browserType = {
            name,
            version
        };
    } else {
        browserType = {
            name: "Unknown",
            version: "0.00"
        }
    }
    browserType.version = browserType.version.split(" ")[0];
    return browserType;
}

/*
    Detects Operating System in which the browser is run
*/
export const getBrowserPlatform = (): BrowserPlatform => {
    let browserAgent = getBrowserAgent();
    let os: null|string = '', osVersion:null|string = '';

    const possiblePlatforms = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Chrome OS', r: /CrOS/ },
        { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
    ];
    for (var id in possiblePlatforms) {
        var cs = possiblePlatforms[id];
        if (cs.r.test(browserAgent)) {
            os = cs.s;
            break;
        }
    }

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)![1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS':
        case 'Mac OS X':
        case 'Android':
            osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(browserAgent)![1];
            break;

        case 'iOS':
            let temp = /OS (\d+)_(\d+)_?(\d+)?/.exec(browserAgent);
            osVersion = temp![1] + '.' + temp![2] + '.' + (temp![3] || 0);
            break;
    }
    return {
        os,
        osVersion //TODO: User Agent doesn't have the version details, find alternate solution
    }
}

/*
    Returns Browser resolution
*/
export const getBrowserResolution = (): BrowserResolution => {
    const width = screen?.width || 0;
    const height = screen?.height || 0;
    return {
        width,
        height,
        resolution: width + "*" + height
    }
}

/*
    Returns signature based on browser features
*/
export const getBrowserSignature = (): Promise<string> => {
    //TODO: Implement Browser Signature without dependencies
    return FingerprintJS.load().then((r: Agent) => {
        return r.get().then((data: GetResult) => {
            return data.visitorId;
        });
    }).catch((e:any) => {
        console.log(e);
        return "";
    });
}

/*
    Returns a boolean and likely only false if it is IE8 or older
*/
export const isBrowserOutdated = (): boolean => {
    return document.all && !document.addEventListener;
}

/*
    Test whether the browser supports sending via Beacon
*/
export const supportsBeacon = (): boolean => {
    return !!navigator.sendBeacon;
}

/*
    Get a summary of the current browser
*/
export const getBrowserSummary = (): BrowserSummary => {
    return {
        browserType: getBrowserType().name,
        browserRes: getBrowserResolution().resolution,
        os: getBrowserPlatform().os
    }
}