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
        console.log('This push event has json: ', event.data.json());
        console.log('This push event has blob: ', event.data.blob());
        console.log('This push event has arrayBuffer: ', event.data.arrayBuffer()); 
        const promiseChain = self.registration.showNotification('Hello, World.');

        event.waitUntil(promiseChain);
    } else {
        console.log('This push event has no data.');
    }
});