"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wp = require("web-push");
var vapidKeys = wp.generateVAPIDKeys();
wp.setVapidDetails('mailto:juliantheberge@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function registerServiceWorker() {
    return navigator.serviceWorker.register('/doWork.js')
        .then(function (registration) {
        console.log('Service worker successfully registered.');
        return registration;
    })
        .catch(function (err) {
        console.error('Unable to register service worker.', err);
    });
}
function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}
function subscribeUserToPush() {
    return navigator.serviceWorker.register('/doWork.js')
        .then(function (registration) {
        var subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey)
        };
        return registration.pushManager.subscribe(subscribeOptions);
    })
        .then(function (pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
    });
}
function allPushToSubscribe() {
    registerServiceWorker();
    askPermission();
    subscribeUserToPush();
}
exports.allPushToSubscribe = allPushToSubscribe;
//# sourceMappingURL=web-push.js.map