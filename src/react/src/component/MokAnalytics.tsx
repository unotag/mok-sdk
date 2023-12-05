import React, { useEffect } from 'react';
import { useContext } from 'react';
import { MokObjectContext } from '../contexts/MokObjectContext';

export interface MokAnalyticsProps {
    callback?: (fn: Function) => any;
    [key: string]: any;
}

export const MokAnalytics = (props: MokAnalyticsProps) => {
    const { children } = props;
    const mok = useContext(MokObjectContext);
    
    if(!mok) {
        throw "Please initialize your SDK by adding <Mok ...></Mok> as the parent component with the required configuration";
    }

    useEffect(() => {
        if(mok?.visitorId) {
            mok.callback = props?.callback;
            mok.event.attachEventListenerToDocument(mok);
        }
    },[mok?.visitorId]);

    return <>{children}</>
}