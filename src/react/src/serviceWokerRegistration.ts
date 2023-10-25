export async function getPendingMessages({ userId, readKey, writeKey, BASE_URL, cb }: { userId: string, readKey: string, writeKey: string, BASE_URL: string, cb: Function }) {
    const serviceWorker = await getOrRegisterServiceWorker()
    
    const readyWorker = await checkServiceWorkerReady(serviceWorker)
   

    const messageChannel = new MessageChannel();
    readyWorker.active?.postMessage({
        type: 'mok_sync_popup',
        userId: userId,
        readKey: readKey,
        writeKey: writeKey,
        BASE_URL
    }, [messageChannel.port1])

    messageChannel.port2.onmessage = (event) => {
        cb(event.data.payload.data)
    };
}

const checkServiceWorkerReady = (sw: ServiceWorkerRegistration): Promise<ServiceWorkerRegistration> => {
    return new Promise((resolve, reject) => {
        if (sw.active) {
            resolve(sw)
        } else {
            sw.addEventListener('updatefound', () => {
                
                const newWorker: any = sw.installing;
                
                newWorker.addEventListener('statechange', () => {
                    
                    if (newWorker.state === "activated") {
                        
                        resolve(sw)
                    }
                })
            })
        }
    })
}


const getOrRegisterServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        return window.navigator.serviceWorker
            .getRegistration('/mok-sdk-popup-scope')
            .then((serviceWorker) => {
                if (serviceWorker) {
                    return serviceWorker
                };
                return window.navigator.serviceWorker.register('/mok-service-worker.js', {
                    scope: '/mok-sdk-popup-scope',
                });
            });
    }
    throw new Error('The browser doesn`t support service worker.');
};
