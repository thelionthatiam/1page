"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var business_logic_1 = require("../functions/business-logic");
function doAuth(client, user, email, password, session, sessionID) {
    return new Promise(function (resolve, reject) {
        business_logic_1.checkEmail(client, email)
            .then(function (result) {
            user = result;
            return business_logic_1.checkPassword(password, user.password);
        })
            .then(function (boolean) {
            console.log('%%%%%%%%before regen', session.id);
            return business_logic_1.regenerateSession(session);
        })
            .then(function () {
            console.log('%%%%%%%%after regen', session.id);
            return business_logic_1.updateSession(client, session.id, user.user_uuid);
        })
            .then(function (result) {
            var userSession = business_logic_1.defineSession(user);
            console.log('final promise doauth', session.id);
            resolve(userSession);
        })
            .catch(function (err) { return reject(err); });
    });
}
exports.doAuth = doAuth;
//# sourceMappingURL=logic-authorization.js.map