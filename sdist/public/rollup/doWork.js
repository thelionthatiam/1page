var CACHE_NAME = 'my-web-app-cache';
var urlsToCache = [
    './bundle.js',
    './stylesheets/styles.css'

];


self.addEventListener('install', function (event) {
    // event.waitUntil takes a promise to know how
    // long the installation takes, and whether it 
    // succeeded or not.
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('push', function (event) {
    if (event.data) {
        console.log('This push event has data: ', event.data.text());
        console.log('General event object:', event)
        const title = 'Require Interaction Notification';
        const options = {
            body: 'With "requireInteraction: \'true\'".',
            requireInteraction: true
        };
        const promiseChain = self.registration.showNotification(title, options);

        event.waitUntil(promiseChain);
    } else {
        console.log('This push event has no data.');
    }
});