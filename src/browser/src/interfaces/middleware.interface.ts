import { IMok } from "../interfaces/mok.interface";
import { Express } from 'express';

export interface IMiddleware {
    useMokExpress(app: Express, mok: Promise<IMok>): void;
}