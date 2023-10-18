export async function register(userId: string, readkey: string, writeKey?: string) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            await navigator.serviceWorker.register('/mok-service-worker.js')
                .then(async (registration: any) => {
                    if (await navigator.serviceWorker.ready) {
                        navigator.serviceWorker.controller?.postMessage({
                            type: 'mok_sync_popup',
                            userId: userId,
                            readKey: readkey,
                            writeKey: writeKey || ""
                        }, [messageChannel.port2]);
                    }
                })
                .catch(err => {
                    console.log(`ServiceWorker registration failed: ${err}`);
                });
        });
    }
};


const messageChannel = new MessageChannel();
// Listen to the response
messageChannel.port1.onmessage = (event) => {
    // Print the result
    console.log("result is coming back in the sdk =>>>>>", event.data.payload);
};
