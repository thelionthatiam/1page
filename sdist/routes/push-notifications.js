"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpush = require("web-push");
var express = require("express");
var pusher = express.Router();
var vapidKeys = {
    publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    privateKey: 'UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls'
};
webpush.setVapidDetails('mailto:web-push-book@gauntface.com', vapidKeys.publicKey, vapidKeys.privateKey);
pusher.post('/push-test', function (req, res) {
    function triggerPushMsg(subscription, dataToSend) {
        return webpush.sendNotification(subscription, dataToSend, null)
            .catch(function (err) {
            if (err.statusCode === 410) {
                return req.querySvc.deletePushSub(['58354c53-18cf-4f36-bdea-571d5e9d59df']);
            }
            else {
                console.log('Subscription is no longer valid: ', err);
            }
        });
    }
    ;
    req.querySvc.getPushSubscriptions([])
        .then(function (subs) {
        console.log('%%%%%%%% RETURN FROM GET PUSH SUBS');
        var subscription = {
            endpoint: subs[0].endpoint,
            keys: {
                p256dh: subs[0].p256dh,
                auth: subs[0].auth
            }
        };
        console.log(subscription);
        return triggerPushMsg(subscription, 'Hello world.');
    })
        .then(function (result) {
        console.log('result of triggering push message', result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ data: { success: true } }));
    })
        .catch(function (err) {
        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            error: {
                id: 'unable-to-send-messages',
                message: "We were unable to send messages to all subscriptions : " +
                    ("'" + err.message + "'")
            }
        }));
    });
});
exports.default = pusher;
// WEB PUSH API
// const pushSubscription = {
//     endpoint: '< Push Subscription URL >',
//     keys: {
//         p256dh: '< User Public Encryption Key >',
//         auth: '< User Auth Secret >'
//     }
// };
// const payload = '< Push Payload String >';
// const options = {
//     gcmAPIKey: '< GCM API Key >',
//     vapidDetails: {
//         subject: '< \'mailto\' Address or URL >',
//         publicKey: '< URL Safe Base64 Encoded Public Key >',
//         privateKey: '< URL Safe Base64 Encoded Private Key >'
//     },
//     TTL: <Number>,
//     headers: {
//         '< header name >': '< header value >'
//     },
//     contentEncoding: '< Encoding type, e.g.: aesgcm or aes128gcm >'
// }
// webpush.sendNotification(
//     pushSubscription,
//     payload,
//     options
// ); 
//# sourceMappingURL=push-notifications.js.map