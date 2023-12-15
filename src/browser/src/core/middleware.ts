import { IMok } from "../interfaces/mok.interface";
import { Express, Request, Response, NextFunction } from 'express';

export const useMokExpress = (app: Express, mok: Promise<IMok>) => {
    app.set('trust proxy', true);
    app.use((req: Request, _res: Response, next: NextFunction) => {
        mok.then(async (m) => {
            m.visitorId = (m.setUserFn && await m.setUserFn(req)) || m.visitorId || "undefined";
            await m.browserClient.setUser(m.visitorId);
            transmitUserActivity({
                sdk: m.sdk + "+" + "express",
                event_type: "visit",
                visitor_id: m.visitorId,
                domain: `${req.protocol}://${req.headers.host}`,
                ip: req.ip || "",
                method: req.method,
                currentPage: m.location.replaceTrailingSlash(`${req.protocol}://${req.headers.host}${req.path}`)
            },m);
            
        }).catch(_e => {
            console.log("Something went wrong while initializing the sdk");
        });
        next();
    });
}

export const transmitUserActivity = async (data: {[key:string]: string}, mok: IMok) => {  
    try {
        await mok.browserClient.addUserActivity("visit", data);
        mok.callback && mok.callback(data)
    } catch(e) {
        console.log("User activity could not be added");
    }
}