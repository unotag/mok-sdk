import React, { useEffect, createContext, useState } from 'react';
import * as core from '../../../browser/src/browser.main';
import { IMok } from '../../../browser/src/interfaces/mok.interface';
import { MokObjectContext } from '../contexts/MokObjectContext';

export interface MokProps {
    readKey: string;
    writeKey: string;
    [key: string]: any;
}

export const Mok = (props: MokProps) => {
    const { children } = props;
    const [mokObject, setMokObject] = useState<IMok>(core.default);

    useEffect(() => {
        if(props?.readKey && props?.writeKey) {
            mokObject.sdk = "react";
            mokObject.init({
                readKey: props.readKey,
                writeKey: props.writeKey
            }).then((m: IMok) => {
                //Adds object to a context so that it can be accessed by child components
                setMokObject({...m});
            });
        } else {
            throw {
                message: "Mok SDK could not be initialized. Missing read key and/or write key"
            }
        }
    },[]);

    return (
        <>
            { /* TODO: Resolve "Provider cannot be used as a JSX component" */}
            {/* @ts-ignore */} 
            <MokObjectContext.Provider value={mokObject}>{children}</MokObjectContext.Provider>
        </>
    );
}