import { useEffect } from 'react';
import * as core from '../../../browser/src/browser.main';

export const Mok = (props: any) => {
    const { children } = props;
    
    useEffect(() => {
        if(props?.readKey && props?.writeKey) {
            core.default.sdk = "react";
            core.default.init({
                readKey: props.readKey,
                writeKey: props.writeKey,
                callback: (data) => {
                    if(props?.callback) {
                        props.callback(data);
                    }
                }
            });
        } else {
            throw {
                message: "Mok SDK could not be initialized. Missing read key and/or write key"
            }
        }
    },[]);

    return <>{children}</>
}