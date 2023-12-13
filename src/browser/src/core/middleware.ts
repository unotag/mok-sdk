import { IMok } from "../interfaces/mok.interface";
import { Express, Request, Response, NextFunction } from 'express';

export const useMokExpress = (app: Express, mok: Promise<IMok>) => {
    app.set('trust proxy', true);
    app.use((req: Request, _res: Response, next: NextFunction) => {
        mok.then(async (m) => {
            m.visitorId = (m.setUserFn && await m.setUserFn()) || "undefined";
            m.browserClient.setUser(m.visitorId);
            let eventData = {
                sdk: m.sdk + "+" + "express",
                event_type: "visit",
                visitor_id: m.visitorId,
                domain: `${req.protocol}://${req.headers.host}`,
                ip: req.ip,
                method: req.method,
                currentPage: m.location.replaceTrailingSlash(`${req.protocol}://${req.headers.host}${req.path}`)
            };

            m.browserClient.addUserActivity("visit", eventData).then(_r => {
                m.callback && m.callback(eventData);
            }).catch((_e) => {
                console.log("User activity could not be added");
            });
            next();
        }).catch(_e => {
            console.log("Something went wrong while initializing the sdk");
            next();
        });
    });
}